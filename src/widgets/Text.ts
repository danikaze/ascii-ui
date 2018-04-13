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

  constructor(terminal: Terminal, options: TextOptions) {
    super(terminal, options);
    this.setOptions(deepAssign({}, textDefaultOptions, options));
  }

  /**
   * Render the widget in the associated terminal
   */
  render(): void {
    // const viewport = this.terminal.getViewport();
    // this.terminal.setTextStyle(this.options.textStyle);
    // this.terminal.setOptions({
    //   viewport: {
    //     top: this.options.line,
    //     right: this.options.col + this.options.width - 1,
    //     bottom: this.options.line + this.options.height - 1,
    //     left: this.options.col,
    //   },
    // });
    // this.terminal.setText(this.options.text, this.options.col, this.options.line);
    // this.terminal.setOptions({ viewport });
    const terminalColumn = this.options.col;
    let lastLine = Math.min(this.startLine + this.options.height, this.splittedText.length);
    let terminalLine = this.options.line;
    let line = this.startLine;

    while (line < lastLine) {
      this.terminal.setText(this.splittedText[line], terminalColumn, terminalLine);
      line++;
      terminalLine++;
    }

    lastLine = this.options.line + this.options.height;
    const emptyLine = ' '.repeat(this.options.width);
    while (terminalLine < lastLine) {
      this.terminal.setText(emptyLine, terminalColumn, terminalLine);
      terminalLine++;
    }
  }

  /**
   * Update the options. Always use this setter so the widget knows about the change
   * instead of changing the (protected) variable directly.
   * The widget might do some internal calcs when this method is called.
   *
   * @param options Options to change.
   */
  setOptions(options: TextOptions): void {
    const wasAllocated = this.allocated;
    const dirtyText = options.tokenizer !== undefined || options.text !== undefined;
    super.setOptions(options);

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

    if (this.allocated) {
      if (!wasAllocated || (this.tokenizer && dirtyText)) {
        this.splittedText = this.splitText(this.options.text);
        this.render();
      }
    }
  }

  /**
   * Set the starting line of the text
   *
   * @param line First line to draw
   */
  setOffset(line: number): void {
    const currentOffset = this.startLine;
    const maxLine = this.options.fitPageEnd
      ? this.splittedText.length - this.options.height
      : this.splittedText.length - 1;

    this.startLine = clamp(line, 0, maxLine);

    if (currentOffset !== this.startLine) {
      this.render();
    }
  }

  /**
   * Move the starting line of the text
   *
   * @param lines Number of lines to scroll the text
   */
  moveOffset(lines: number): void {
    this.setOffset(this.startLine + lines);
  }

  /**
   * Move the starting line of the text by pages
   *
   * @param pages Number of pages to scroll
   */
  movePages(pages: number): void {
    this.setOffset(this.startLine + pages * this.options.height);
  }

  /**
   * Splits a text into different lines
   *
   * @param text Text to split
   * @return Splitted text for each line
   */
  private splitText(text: string): string[] {
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
