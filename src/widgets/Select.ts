import { CharStyle, Terminal } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { deepAssign } from '../util/deepAssign';
import { TokenizerFunction, splitText } from '../util/tokenizer';

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
}

/**
 * Display a list of selectable options
 */
export class Select<T> extends Widget {
  /** Default options for widget instances */
  static defaultOptions: SelectOptions<any>;  // tslint:disable-line:no-any
  /** Options of the Text widget */
  protected readonly options: SelectOptions<T>;
  /** Currently selected option index */
  private selectedIndex: number = UNSELECTED_INDEX;
  /** First line to draw (for scrolling) - note: one option can have more than one line */
  private firstLine: number = 0;
  /** Processed options text */
  private optionsText: string[][];

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
  render(): void {
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
    while (option < this.optionsText.length && terminalLine < lastLine) {
      this.terminal.setText(this.optionsText[option][optionLine], this.options.col, terminalLine);
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
  getSelected(): SelectOption<T> {
    return this.options.options[this.selectedIndex];
  }

  /**
   * Retrieve the index of the currently selected option
   *
   * @return index of the selected option or `UNSELECTED_INDEX` if no one is selected
   */
  getSelectedIndex(): number {
    return this.selectedIndex;
  }

  /**
   * Get the option at the specified terminal position (absolute)
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return option or `undefined` if not found
   */
  getOptionAt(column: number, line: number): SelectOption<T> {
    if (column < this.options.col || column >= this.options.col + this.options.width) {
      return undefined;
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

    return undefined;
  }

  /**
   * Select the option with the specified index.
   * This will do nothing if the option is disabled or the index not found.
   *
   * @param index
   * @return `true` if the selected option has changed, `false` otherwise
   */
  selectIndex(index: number): boolean {
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
   * @param value
   * @return `true` if the selected option has changed, `false` otherwise
   */
  selectValue(value: T): boolean {
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
   * @param option
   * @return `true` if the selected option has changed, `false` otherwise
   */
  selectOption(option: SelectOption<T>): boolean {
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
  prev(): boolean {
    return this.moveSelection(-1);
  }

  /**
   * Select the next option to the current one
   *
   * @return `true` if the selected option has changed, `false` otherwise
   */
  next(): boolean {
    return this.moveSelection(+1);
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changedOptions Object with only the changed options
   */
  protected updateOptions(options: SelectOptions<T>): void {
    const dirtyText = options.options !== undefined || options.width !== undefined;
    const reDraw = options.col !== undefined || options.line !== undefined || options.height !== undefined;
    let drawn = false;

    if (dirtyText && this.options.options) {
      this.optionsText = this.options.options.map((option) =>
      splitText(option.text, this.options.width, this.options.tokenizer));
      drawn = this.selectIndex(0);
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
    } while (newIndex !== this.selectedIndex);

    return this.selectIndex(newIndex);
  }

  /**
   * Get the options object depending on its state
   *
   * @return `CharStyle` object corresponding to the specified option index
   */
  private getAspectOptions(optionIndex: number): CharStyle {
    if (optionIndex === this.selectedIndex) {
      return this.options.selected;
    } else if (this.options.options[optionIndex].disabled) {
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
};
