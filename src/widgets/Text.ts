import { clamp } from '../util/clamp';
import { deepAssign } from '../util/deepAssign';

import { CharStyle, Terminal } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';

import { textDefaultOptions } from './defaultOptions';

export type TokenizerFunction = (text: string) => TextToken[];

export interface TextToken {
  /** Matched text. It shouldn't contain non-renderizable characters */
  text: string;
  /** If the matched text is a separator or not. It should alternate between true/false */
  isSeparator: boolean;
  /** Index of the string where it starts */
  index: number;
}

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
   * If `true`, the default function will be used
   * A custom TokenizerFunction can be provided
   * If `false` text will be splitted even in the middle of the words
   */
  tokenizer?: boolean | TokenizerFunction;
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
}

/**
 * Display formatted text in the terminal
 */
export class Text extends Widget {
  /** Options of the Text widget */
  protected readonly options: TextOptions;
  /** Function to use to tokenize the text */
  private tokenizer: TokenizerFunction = tokenizer;
  /** Text splitted into lines to fit this size */
  private splittedText: string[];
  /** Offset of what line to display first */
  private startLine: number = 0;
  /** setTimeout handler to cancel the typewritter effect when the text is scrolled */
  private typewritterTimer;
  /** Line where to start applying the typewritter effect if enabled */
  private typewritterLine = 0;

  constructor(terminal: Terminal, options: TextOptions) {
    super(terminal, options);
    this.setOptions(deepAssign({}, textDefaultOptions, options));
  }

  /**
   * Render the widget in the associated terminal
   */
  render(): void {
    if (!this.splittedText) {
      return;
    }
    const typewritterEnabled = this.options.typewritterDelay > 0;

    const terminalColumn = this.options.col;
    let terminalLine = this.options.line;
    let lastLine = Math.min(this.startLine + this.options.height, this.splittedText.length);
    const completedLines = typewritterEnabled ? Math.min(lastLine, this.startLine + this.typewritterLine) : lastLine;
    let line = this.startLine;

    // draw complete lines
    while (line < completedLines) {
      this.terminal.setText(this.splittedText[line], terminalColumn, terminalLine);
      line++;
      terminalLine++;
    }

    // draw remaining lines as blank
    lastLine = this.options.line + this.options.height;
    const emptyLine = ' '.repeat(this.options.width);
    while (terminalLine < lastLine) {
      this.terminal.setText(emptyLine, terminalColumn, terminalLine);
      terminalLine++;
    }

    if (typewritterEnabled && this.typewritterLine < this.options.height && completedLines < this.splittedText.length) {
      this.typewritterTimer = setTimeout(
        this.renderInProgressText.bind(this),
        this.options.typewritterDelay,
        0,
        completedLines,
        terminalColumn,
        this.options.line,
      );
    }
  }

  /**
   * Set the starting line of the text
   *
   * @param line First line to draw
   * @return `true` if there is more content after `line`, or `false` if it was the end
   */
  setScroll(line: number): boolean {
    clearTimeout(this.typewritterTimer);
    const currentOffset = this.startLine;
    const maxLine = this.options.fitPageEnd
      ? this.splittedText.length - this.options.height
      : this.splittedText.length - 1;

    this.startLine = clamp(line, 0, maxLine);
    this.typewritterLine = this.options.height - this.startLine + currentOffset;

    if (currentOffset !== this.startLine) {
      this.render();
    }

    return this.startLine < maxLine;
  }

  /**
   * Move the starting line of the text
   *
   * @param lines Number of lines to scroll the text
   * @return `true` if there is more content after `line`, or `false` if it was the last line
   */
  scrollLines(lines: number): boolean {
    return this.setScroll(this.startLine + lines);
  }

  /**
   * Move the starting line of the text by pages
   *
   * @param pages Number of pages to scroll
   * @return `true` if there is more pages or `false` if it was the last one
   */
  scrollPages(pages: number): boolean {
    return this.setScroll(this.startLine + pages * this.options.height);
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changedOptions Object with only the changed options
   */
  protected updateOptions(options: TextOptions): void {
    const dirtyText = options.tokenizer !== undefined || options.text !== undefined;

    if (options.tokenizer !== undefined) {
      if (!options.tokenizer) {
        this.tokenizer = undefined;
        this.splittedText = [this.options.text];
      } else {
        this.tokenizer = options.tokenizer === true
          ? tokenizer
          : this.options.tokenizer as TokenizerFunction;
      }
    }

    if (!this.splittedText || dirtyText) {
      this.splittedText = this.splitText(this.options.text);
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
   * @param outputCol initial column of the terminal
   * @param outputLine initial line of the terminal
   */
  private renderInProgressText(textCol: number, textLine: number, outputCol: number, outputLine: number) {
    const partialText = this.splittedText[textLine][textCol];
    this.terminal.setText(partialText, outputCol + textCol, outputLine + textLine - this.startLine);

    textCol++;
    if (textCol >= this.splittedText[textLine].trim().length) {
      textCol = 0;
      textLine++;
    }

    if (textLine - this.startLine < this.options.height && textLine < this.splittedText.length) {
      this.typewritterTimer = setTimeout(
        this.renderInProgressText.bind(this),
        this.options.typewritterDelay,
        textCol,
        textLine,
        outputCol,
        outputLine,
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
    if (!this.allocated || !this.tokenizer) {
      return undefined;
    }

    const res = [];
    const tokenizedText = this.tokenizer(text);
    const lineWidth = this.options.width;
    let line = '';

    tokenizedText.forEach((token) => {
      if (!token || (line.length === 0 && token.isSeparator)) {
        return;
      }

      if (line.length + token.text.length <= lineWidth) {
        line += token.text;
      } else {
        res.push(line + ' '.repeat(lineWidth - line.length));
        line = token.isSeparator ? '' : token.text;
      }
    });

    if (line.length > 0) {
      res.push(line + ' '.repeat(lineWidth - line.length));
    }

    return res;
  }
}

/**
 * Given a text, it will split it into words
 *
 * @param text Text to split
 * @return text splitted into tokens
 */
function tokenizer(text: string): TextToken[] {
  const re = /(\s+)|(\S+)/g;
  const res: TextToken[] = [];
  let match = re.exec(text);

  while (match) {
    res.push({
      isSeparator: match[1] !== undefined,
      text: match[0],
      index: match.index,
    });
    match = re.exec(text);
  }

  return res;
}
