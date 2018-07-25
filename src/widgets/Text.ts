import { CharStyle, Terminal, TileSize } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { clamp } from '../util/clamp';
import { coalesce } from '../util/coalesce';
import { deepAssign } from '../util/deepAssign';
import { TokenizerFunction, noWrap, splitText, tokenizer } from '../util/tokenizer';

export interface TextOptions extends WidgetOptions {
  /** Text to display */
  text?: string;
  /**
   * Basic style of the text
   * Further styles can be applied with the `commands` option of the Terminal
   */
  textStyle?: CharStyle;
  /**
   * How to split the text (for new lines, etc.)
   * If `undefined` or `null`, the text will not be splitted (no-wrap)
   */
  tokenizer?: TokenizerFunction;
  /**
   * If `tokenizer` is `false`, the `ellipsis` text will be appended when the text is too long
   */
  ellipsis?: string;
  /**
   * Number of characters to skip.
   * Useful to create a horizontal text scrolling effect
   */
  skip?: number;
  /**
   * If `true`, it won't allow empty lines at the end of a page and the text will
   * end at the last line of the widget.
   * Set to `false` to allow empty lines (so the first line is the right next one
   * to the last of the previous page)
   */
  fitPageEnd?: boolean;
  /**
   * Ms. to wait between each character when writting new text
   * Set to `0` (default) to disable it
   */
  typewritterDelay?: number;
  /**
   * Set to `false` to apply the typewritter to the text again when it appears even
   * if it was shown already before
   */
  persistentTypewritter?: boolean;
}

/**
 * Display formatted text in the terminal, allowing vertical scroll
 */
export class Text extends Widget<TextOptions> {
  /** Default options for widget instances */
  static defaultOptions: TextOptions;

  /** Text splitted into lines to fit this size */
  private splittedText: string[];
  /** Offset of what line to display first (for the scroll, relative to `splittedText`) */
  private startLine: number = 0;
  /** setTimeout handler to cancel the typewritter effect when the text is scrolled */
  private typewritterTimer;
  /** Line where to start applying the typewritter effect if enabled (relative to `splittedText`) */
  private typewritterLine = 0;
  /** Column where to start applying the typewritter effect if enabled (relative to `splittedText`) */
  private typewritterColumn = 0;

  constructor(terminal: Terminal, options: TextOptions, parent?: WidgetContainer) {
    super(
      terminal,
      deepAssign({}, Text.defaultOptions, options),
      parent,
    );
    this.render();
  }

  /**
   * Render the widget in the associated terminal
   */
  render(): void {
    if (!this.splittedText || this.startLine === undefined) {
      return;
    }

    // render is called from outside, so we reset the status of the previous rendering operation,
    // in case it hasn't finished yet
    clearTimeout(this.typewritterTimer);

    const typewritterEnabled = this.options.typewritterDelay > 0;

    const terminalColumn = this.options.col;
    let terminalLine = this.options.line;
    let lastLine = Math.min(this.startLine + this.options.height, this.splittedText.length);
    const completedLines = typewritterEnabled ? Math.min(this.typewritterLine, lastLine) : lastLine;
    let line = this.startLine;

    // draw complete lines
    while (line < completedLines) {
      this.terminal.setText(this.splittedText[line], terminalColumn, terminalLine);
      line++;
      terminalLine++;
    }

    lastLine = this.options.line + this.options.height;
    if (terminalLine >= lastLine) {
      return;
    }

    // draw in progress-line completed part
    if (this.typewritterColumn > 0) {
      const text = this.splittedText[line].substring(0, this.typewritterColumn)
        + ' '.repeat(this.options.width - this.typewritterColumn);
      this.terminal.setText(text, terminalColumn, terminalLine);
      terminalLine++;
    }

    // draw remaining lines as blank
    const emptyLine = ' '.repeat(this.options.width);
    while (terminalLine < lastLine) {
      this.terminal.setText(emptyLine, terminalColumn, terminalLine);
      terminalLine++;
    }

    if (typewritterEnabled && this.typewritterLine - this.startLine < this.options.height) {
      this.typewritterTimer = setTimeout(
        this.renderInProgressText.bind(this),
        this.options.typewritterDelay,
        terminalColumn,
        this.options.line,
      );
    }
  }

  /**
   * Get the size of the box if the text would be fully displayed
   *
   * @return Size of the full text
   */
  getTextSize(): TileSize {
    return {
      columns: this.options.tokenizer ? this.splittedText[0].length : this.options.text.length,
      rows: this.splittedText.length,
    };
  }

  /**
   * Set the starting line of the text
   *
   * @param line First line to draw
   * @return `true` if there is more content after `line`, or `false` if it was the end
   */
  setScrollLine(line: number): boolean {
    clearTimeout(this.typewritterTimer);
    const currentOffset = this.startLine;
    const maxLine = this.options.fitPageEnd
      ? this.splittedText.length - this.options.height
      : this.splittedText.length - 1;

    this.startLine = clamp(line, 0, maxLine);

    if (currentOffset !== this.startLine) {
      const oldTypewritterLine = this.typewritterLine;
      this.typewritterLine = clamp(
        this.typewritterLine,
        this.startLine,
        this.options.persistentTypewritter ? this.splittedText.length : maxLine,
      );
      if (oldTypewritterLine !== this.typewritterLine) {
        this.typewritterColumn = 0;
      }
    }
    this.render();

    return this.startLine < maxLine;
  }

  /**
   * Move the starting line of the text
   *
   * @param lines Number of lines to scroll the text
   * @return `true` if there is more content after `line`, or `false` if it was the last line
   */
  scrollLines(lines: number): boolean {
    return this.setScrollLine(this.startLine + lines);
  }

  /**
   * Move the starting line of the text by pages
   *
   * @param pages Number of pages to scroll
   * @return `true` if there is more pages or `false` if it was the last one
   */
  scrollPages(pages: number): boolean {
    return this.setScrollLine(this.startLine + pages * this.options.height);
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changes Object with only the changed options
   */
  protected updateOptions(changes: TextOptions): void {
    const dirtyText = coalesce(changes.tokenizer, changes.text, changes.width, changes.skip) !== undefined;
    const redraw = dirtyText || coalesce(changes.col, changes.line) !== undefined;

    if (changes.skip !== undefined) {
      this.options.skip = clamp(changes.skip, 0, this.options.text.length);
    }

    if (dirtyText) {
      this.splittedText = this.splitText(this.options.text);
    }
    if (redraw) {
      this.render();
    }
  }

  /**
   * Renders the next character when applying the typewritter effect
   * It will call itself again after `this.options.typewritterDelay` ms.
   * to draw the next character
   *
   * @param textCol column of the current line in `this.splittedText` to draw
   * @param textLine line of `this.splittedText` to draw
   */
  private renderInProgressText(textCol: number, textLine: number) {
    const line = this.splittedText[this.typewritterLine];
    if (!line) {
      return;
    }
    const partialText = line[this.typewritterColumn];
    const x = textCol + this.typewritterColumn;
    const y = textLine + this.typewritterLine - this.startLine;

    if (!this.isAt(x, y)) {
      return;
    }

    this.terminal.setText(
      partialText,
      x,
      y,
    );

    this.typewritterColumn++;
    if (this.typewritterColumn >= this.splittedText[this.typewritterLine].trim().length) {
      this.typewritterColumn = 0;
      this.typewritterLine++;
    }

    if (this.typewritterLine - this.startLine < this.options.height
      && this.typewritterLine < this.splittedText.length) {
      this.typewritterTimer = setTimeout(
        this.renderInProgressText.bind(this),
        this.options.typewritterDelay,
        textCol,
        textLine,
      );
    }
  }

  /**
   * Splits a text into different lines
   *
   * @param text Text to split
   * @return Splitted text for each line
   */
  private splitText(text: string): string[] {
    if (!this.allocated) {
      return undefined;
    }

    if (this.options.skip) {
      text = text.substr(this.options.skip);
    }

    if (!this.options.tokenizer) {
      const noWrappedText = noWrap(text, this.options.width, this.options.ellipsis);

      return [noWrappedText + ' '.repeat(this.options.width - noWrappedText.length)];
    }

    return splitText(text, this.options.width, this.options.tokenizer);
  }
}

/*
 * Default options for new instances
 */
Text.defaultOptions = {
  text: '',
  tokenizer,
  ellipsis: '...',
  skip: 0,
  fitPageEnd: false,
  typewritterDelay: 0,
  persistentTypewritter: true,
};
