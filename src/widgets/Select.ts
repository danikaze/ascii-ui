import { CharStyle, Terminal } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { coalesce } from '../util/coalesce';
import { deepAssign } from '../util/deepAssign';
import { splitText, TokenizerFunction } from '../util/tokenizer';

export const UNSELECTED_INDEX = -1;

export interface SelectOption<T> {
  /** Displayed text of the option */
  text: string;
  /** Value of the option. Will be available when selected */
  value?: T;
  /** If `true`, the option won't be selectable */
  disabled?: boolean;
}

export interface SelectOptions<T> extends WidgetOptions {
  /** List of options, in order, to display. Editing this value (via `setOptions` will reset the selected one) */
  options: Array<SelectOption<T>>;
  /** If `true`, the first option will be highlighted after the last one, and viceversa */
  loop?: boolean;
  /** Selected option index by default */
  selectedIndex?: number;
  /** If `true`, will unselect any selected option if try to select a non-existing one */
  allowUnselect?: boolean;
  /**
   * How to split the text (for new lines, etc.)
   * A custom TokenizerFunction can be provided. Leave undefined to use the default one
   */
  tokenizer?: TokenizerFunction;
  /** Character Style for base options */
  base?: CharStyle;
  /** Character Style for selected options */
  selected?: CharStyle;
  /** Character Style for disabled options */
  disabled?: CharStyle;
  /** Prefix to add to the selected options */
  selectedPrefix?: string;
  /** Prefix to add to the non selected options */
  unselectedPrefix? : string;
}

/**
 * Display a list of selectable options
 */
export class Select<T> extends Widget<SelectOptions<T>> {
  /** Default options for widget instances */
  public static defaultOptions: SelectOptions<any>; // tslint:disable-line:no-any

  /** Currently selected option index */
  private selectedIndex: number = UNSELECTED_INDEX;
  /** First line to draw (for scrolling) - note: one option can have more than one line */
  private firstLine: number = 0;
  /** Processed options text */
  private optionsText: string[][];
  /** Processed indentation text */
  private indentation: string;
  /** Processed selected prefix text  */
  private selectedPrefix: string;
  /** Processed unselected prefix text */
  private unselectedPrefix: string;

  constructor(terminal: Terminal, options: SelectOptions<T>, parent?: WidgetContainer) {
    super(
      terminal,
      deepAssign({}, Select.defaultOptions, options),
      parent,
    );

    let rendered = false;
    if (this.options.selectedIndex >= 0) {
      rendered = this.selectIndex(this.options.selectedIndex);
    }
    if (!rendered) {
      this.render();
    }
  }

  /**
   * Render the widget in the associated terminal
   */
  public render(): void {
    if (!this.optionsText) {
      return;
    }

    const lastLine = this.options.line + this.options.height;
    let terminalLine = this.options.line; // line of the terminal to output the text
    let option = 0; // option index
    let optionLine = 0; // text line inside the current option
    let line = 0; // accumulated internal option lines

    while (line < this.firstLine) {
      line++;
      optionLine++;
      if (optionLine >= this.optionsText[option].length) {
        option++;
        optionLine = 0;
      }
    }

    this.terminal.setTextStyle(this.getAspectOptions(option));
    const col = this.options.col;
    const indentedCol = col + (this.indentation.length);
    while (option < this.optionsText.length && terminalLine < lastLine) {
      if (col !== indentedCol) {
        if (optionLine > 0) {
          this.terminal.setText(this.indentation, col, terminalLine);
        } else if (this.selectedIndex === option) {
          this.terminal.setText(this.selectedPrefix, col, terminalLine);
        } else {
          this.terminal.setText(this.unselectedPrefix, col, terminalLine);
        }
      }
      this.terminal.setText(this.optionsText[option][optionLine], indentedCol, terminalLine);
      terminalLine++;
      optionLine++;
      if (optionLine >= this.optionsText[option].length) {
        option++;
        optionLine = 0;
        if (option < this.optionsText.length) {
          this.terminal.setTextStyle(this.getAspectOptions(option));
        }
      }
    }
  }

  /**
   * Retrieve a reference to the currently selected option.
   * Even if it's a reference, don't update it directly, but use `setOptions` to allow the widget to apply the changes
   *
   * @return Object specified in `options.options`.
   */
  public getSelectedOption(): SelectOption<T> {
    return this.options.options[this.selectedIndex];
  }

  /**
   * Retrieve the index of the currently selected option
   *
   * @return index of the selected option or `UNSELECTED_INDEX` if no one is selected
   */
  public getSelectedIndex(): number {
    return this.selectedIndex;
  }

  /**
   * Get the option at the specified terminal position (absolute)
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return option or `undefined` if not found
   */
  public getOptionAt(column: number, line: number): SelectOption<T> {
    if (column < this.options.col || column >= this.options.col + this.options.width) {
      return;
    }

    let terminalLine = this.options.line;
    let optionLine = 0;
    let option = 0;

    while (option < this.optionsText.length) {
      if (terminalLine === line) {
        return this.options.options[option];
      }

      terminalLine++;
      optionLine++;
      if (optionLine >= this.optionsText[option].length) {
        option++;
        optionLine = 0;
      }
    }

    return;
  }

  /**
   * Select the option with the specified index.
   * This will do nothing if the option is disabled or the index not found.
   *
   * @param index New index to set as selected (starting on 0)
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public selectIndex(index: number): boolean {
    const oldIndex = this.selectedIndex;

    if (this.optionsText[index]) {
      if (!this.options.options[index].disabled && this.selectedIndex !== index) {
        this.selectedIndex = index;

        // manage the scroll to make the selected option appear in the screen
        let startLine = 0;
        for (let i = 0; i < index; i++) {
          startLine += this.optionsText[i].length;
        }
        const endLine = startLine + this.optionsText[index].length;

        if (endLine >= this.firstLine + this.options.height) {
          this.firstLine += endLine - this.firstLine - this.options.height;
        }
        if (startLine < this.firstLine) {
          this.firstLine = startLine;
        }
      }
    } else if (this.options.allowUnselect && this.selectedIndex !== UNSELECTED_INDEX) {
      this.selectedIndex = UNSELECTED_INDEX;
    }

    if (oldIndex !== this.selectedIndex) {
      this.render();

      return true;
    }

    return false;
  }

  /**
   * Select the first option with the specified value.
   * This will do nothing if all the options with that value are disabled
   * there's no one with the specified value.
   *
   * @param value Value to search the option by
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public selectValue(value: T): boolean {
    let found = false;
    const options = this.options.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        found = true;
        const enabled = this.selectIndex(i);
        if (enabled) {
          return true;
        }
      }
    }

    return found ? false : this.selectIndex(UNSELECTED_INDEX);
  }

  /**
   * Select the specified option.
   * This will do nothing the option is disabled or not found
   *
   * @param option Explicit option to select
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public selectOption(option: SelectOption<T>): boolean {
    let found = false;
    const options = this.options.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i] === option) {
        found = true;
        const enabled = this.selectIndex(i);
        if (enabled) {
          return true;
        }
      }
    }

    return found ? false : this.selectIndex(UNSELECTED_INDEX);
  }

  /**
   * Select the previous option to the current one
   *
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public prev(): boolean {
    return this.moveSelection(-1);
  }

  /**
   * Select the next option to the current one
   *
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public next(): boolean {
    return this.moveSelection(+1);
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changes Object with only the changed options
   */
  protected updateOptions(changes: SelectOptions<T>): void {
    function fixString(str: string, length: number): string {
      if (str === undefined) {
        ' '.repeat(length);
      }
      if (str.length === length) {
        return str;
      }
      return str.substr(0, length) + ' '.repeat(length - str.length);
    }

    const dirtyText = coalesce(
      changes.options,
      changes.width,
      changes.selectedPrefix,
      changes.unselectedPrefix,
    ) !== undefined;
    const reDraw = coalesce(
      changes.col,
      changes.line,
      changes.height,
      changes.base,
      changes.selected,
      changes.disabled,
    ) !== undefined;
    let drawn = false;

    if (coalesce(changes.selectedPrefix, changes.unselectedPrefix) !== undefined) {
      const prefixLength = Math.max(
        this.options.selectedPrefix ? this.options.selectedPrefix.length : 0,
        this.options.unselectedPrefix ? this.options.unselectedPrefix.length : 0,
      );
      this.indentation = ' '.repeat(prefixLength);
      this.selectedPrefix = fixString(this.options.selectedPrefix, prefixLength);
      this.unselectedPrefix = fixString(this.options.unselectedPrefix, prefixLength);
    }

    if (dirtyText && this.options.options) {
      if (this.indentation === undefined) {
        this.indentation = '';
      }
      const width = this.options.width - this.indentation.length;
      this.optionsText = this.options.options.map((option) =>
        splitText(option.text, width, this.options.tokenizer));
      drawn = this.selectIndex(this.options.selectedIndex);
    }

    if (!drawn && (dirtyText || reDraw)) {
      this.render();
    }
  }

  /**
   * Move the current selection by an specified `delta`
   *
   * @param delta how many options to "move" (`-1`: previous one, `+1`: next one)
   * @return `true` if the selected option has changed, `false` otherwise
   */
  private moveSelection(delta: number): boolean {
    const options = this.options.options;
    let newIndex = this.selectedIndex;
    let tries = options.length; // to prevent infinite loop in case there's no available option

    do {
      newIndex = newIndex + delta;

      if (newIndex < 0) {
        if (this.options.loop) {
          newIndex = options.length - 1;
        } else {
          newIndex = 0;
          break;
        }
      } else if (newIndex >= options.length) {
        if (this.options.loop) {
          newIndex = 0;
        } else {
          newIndex = options.length - 1;
          break;
        }
      }

      if (!options[newIndex].disabled) {
        break;
      }
      tries--;
    } while (newIndex !== this.selectedIndex && tries > 0);

    return tries > 0 ? this.selectIndex(newIndex) : false;
  }

  /**
   * Get the options object depending on its state
   *
   * @return `CharStyle` object corresponding to the specified option index
   */
  private getAspectOptions(optionIndex: number): CharStyle {
    if (optionIndex === this.selectedIndex) {
      return this.options.selected;
    }

    if (this.options.options[optionIndex] && this.options.options[optionIndex].disabled) {
      return this.options.disabled;
    }

    return this.options.base;
  }
}

/*
 * Default options for new instances
 */
Select.defaultOptions = {
  options: undefined,
  loop: true,
  allowUnselect: true,
  base: { fg: '#00ff00', bg: '#000000' },
  selected: { fg: '#00ff00', bg: '#009900' },
  disabled: { fg: '#009900', bg: '#000000' },
  selectedIndex: UNSELECTED_INDEX,
  selectedPrefix: '',
  unselectedPrefix: '',
};
