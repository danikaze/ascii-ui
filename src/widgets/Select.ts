import { isEmpty } from 'vanilla-type-check/isEmpty';

import { CharStyle, Terminal } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { deepAssign } from '../util/deepAssign';
import { splitText, TokenizerFunction } from '../util/tokenizer';

/** Value used for an option index when no option is selected or found */
export const SELECT_INDEX_NONE = -1;

export interface SelectOption<T> {
  /** Displayed text of the option */
  text: string;
  /** Value of the option. Will be available when selected */
  value?: T;
  /** If `true`, the option won't be selectable */
  disabled?: boolean;
}

export interface SelectOptionStyle extends CharStyle {
  /** Text to add to the option at the beginning */
  prefix?: string;
  /** Text to add to the option at the end */
  suffix?: string;
}

export interface SelectOptions<T> extends WidgetOptions {
  /** List of options, in order, to display. Editing this value (via `setOptions` will reset the selected one) */
  options: Array<SelectOption<T>>;
  /** If `true`, the first option will be highlighted after the last one, and viceversa */
  loop?: boolean;
  /** When `false`, it will be only one option selected at most */
  multiple?: boolean;
  /** If `true`, will unselect any selected option if try to select a non-existing one */
  allowUnselect?: boolean;

  /** Character Style for base options */
  baseStyle?: SelectOptionStyle;
  /** Character Style for base options when focused */
  baseFocusedStyle?: SelectOptionStyle;
  /** Character Style for selected options */
  selectedStyle?: SelectOptionStyle;
  /** Character Style for selected options when focused */
  selectedFocusedStyle?: SelectOptionStyle;
  /** Character Style for disabled options */
  disabledStyle?: SelectOptionStyle;
  /** Character Style for disabled options when selected */
  disabledSelectedStyle?: SelectOptionStyle;

  /**
   * How to split the text (for new lines, etc.)
   * A custom TokenizerFunction can be provided. Leave undefined to use the default one
   */
  tokenizer?: TokenizerFunction;
}

type StyleStates = 'baseStyle'
                 | 'baseFocusedStyle'
                 | 'selectedStyle'
                 | 'selectedFocusedStyle'
                 | 'disabledStyle'
                 | 'disabledSelectedStyle';

interface InternalOption<T> {
  /** Copy of the provided option */
  option: SelectOption<T>;
  /** Will be true if selected */
  selected: boolean;
  /** Preprocessed text to draw (one string per line) */
  processedText: string[];
  /** Line where this option should start (accumulated number of lines of the previous options) */
  startLine: number;
  /** Line where the next option should start (start + processedText.length) */
  endLine: number;
}

/**
 * Display a list of selectable options.
 * The focused option is where the cursor is. It can be none or one at most.
 * Selected options can be none, one or, if the `multiple` option is `true`, more than one at the same time
 */
export class Select<T> extends Widget<SelectOptions<T>> {
  /** Default options for widget instances */
  public static defaultOptions: SelectOptions<any>; // tslint:disable-line:no-any

  /** Currently active option index */
  private focusedIndex: number = SELECT_INDEX_NONE;
  /** Lits of the options used internally */
  private selectOptions: InternalOption<T>[];
  /** First line to draw (for scrolling) - note: one option can have more than one line */
  private firstLine: number = 0;

  constructor(terminal: Terminal, options: SelectOptions<T>, parent?: WidgetContainer) {
    super(
      terminal,
      deepAssign({}, Select.defaultOptions, options),
      parent,
    );

    this.render();
  }

  /**
   * Render the widget in the associated terminal
   */
  public render(): void {
    if (!this.selectOptions) {
      return;
    }

    const lastTerminalLine = this.options.line + this.options.height;
    let terminalLine = this.options.line; // line of the terminal to output the text
    let optionIndex = 0;

    // skip first hidden lines
    while (this.selectOptions[optionIndex].endLine <= this.firstLine) {
      optionIndex++;
    }
    let skipLines = this.firstLine - this.selectOptions[optionIndex].startLine;

    // write visible lines
    while (optionIndex < this.selectOptions.length && terminalLine < lastTerminalLine) {
      this.terminal.setTextStyle(this.getOptionStyle(optionIndex));
      const text = this.getOptionText(optionIndex);

      for (const textLine of text) {
        if (terminalLine >= lastTerminalLine) {
          break;
        }
        if (skipLines > 0) {
          skipLines--;
          continue;
        }
        this.terminal.setText(textLine, this.options.col, terminalLine);
        terminalLine++;
      }

      optionIndex++;
    }

    // write blank lines if any
    this.terminal.clear(this.options.col, terminalLine, this.options.width, lastTerminalLine - terminalLine);
  }

  /**
   * Get the provided option from the specified index
   *
   * @param index index of the desired option
   * @return Reference to a copy of the provided option
   */
  public getOptionFromIndex(index: number): SelectOption<T> {
    const opt = this.selectOptions[index];

    return opt ? opt.option : undefined;
  }

  /**
   * Get the provided value from the specified index
   *
   * @param index index of the desired option
   * @return Reference to a copy of the provided value
   */
  public getValueFromIndex(index: number): T {
    const opt = this.selectOptions[index];

    return opt ? opt.option.value : undefined;
  }

  /**
   * Get the index of the desired option
   *
   * @param option option to search
   * @return Index of the option in the select list or `INDEX_NONE` if not found
   */
  public getIndexFromOption(option: SelectOption<T>): number {
    for (let i = 0; i < this.options.options.length; i++) {
      if (this.options.options[i] === option) {
        return i;
      }
    }

    return SELECT_INDEX_NONE;
  }

  /**
   * Get the index of the desired value
   *
   * @param value value to search
   * @return Index of the option in the select list or `INDEX_NONE` if not found
   */
  public getIndexFromValue(value: T): number {
    for (let i = 0; i < this.selectOptions.length; i++) {
      if (this.selectOptions[i].option.value === value) {
        return i;
      }
    }

    return SELECT_INDEX_NONE;
  }

  /**
   * Retrieve a list of indexes of the selected options.
   *
   * @return Indexes of the selected options
   */
  public getSelectedIndexes(): number[] {
    const res: number[] = [];

    this.selectOptions.forEach((option, i) => {
      if (option.selected) {
        res.push(i);
      }
    });

    return res;
  }

  /**
   * Retrieve a list of selected options.
   * Even if this is a list of references to the given options, refrain of modifying them directly.
   * Use `setOptions` instead.
   *
   * @return List of selected options
   */
  public getSelectedOptions(): SelectOption<T>[] {
    return this.getSelectedIndexes().map((index) => this.selectOptions[index].option);
  }

  /**
   * Retrieve a list of selected values.
   *
   * @return List of selected values
   */
  public getSelectedValues(): T[] {
    return this.getSelectedIndexes().map((index) => this.selectOptions[index].option.value);
  }

  /**
   * Retrieve the index of the focused option
   *
   * @return index of the selected option or `UNSELECTED_INDEX` if no one is selected
   */
  public getFocusedIndex(): number {
    return this.focusedIndex;
  }

  /**
   * Retrieve the focused option
   *
   * @return Reference to the given focused option, or `undefined` if nothing is selected
   */
  public getFocusedOption(): SelectOption<T> {
    return this.getOptionFromIndex(this.focusedIndex);
  }

  /**
   * Retrieve the value of the focused option
   *
   * @return Reference to the given focused option value, or `undefined` if nothing is selected
   */
  public getFocusedValue(): T {
    return this.getValueFromIndex(this.focusedIndex);
  }

  /**
   * Get the index of the option at the specified terminal position (absolute)
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return index of the option or `INDEX_NONE` if not found
   */
  public getIndexAt(column: number, line: number): number {
    const maxHeight = this.options.line + this.options.height;

    if (column < this.options.col || column >= this.options.col + this.options.width
      || line < this.options.line || line >= maxHeight) {
      return SELECT_INDEX_NONE;
    }

    let terminalLine = this.options.line;
    let optionLine = 0;
    let optionIndex = 0;

    while (optionIndex < this.selectOptions.length && terminalLine < maxHeight) {
      if (terminalLine === line) {
        return optionIndex;
      }

      terminalLine++;
      optionLine++;
      if (optionLine >= this.selectOptions[optionIndex].processedText.length) {
        optionIndex++;
        optionLine = 0;
      }
    }

    return SELECT_INDEX_NONE;
  }

  /**
   * Get the option at the specified terminal position (absolute)
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return option or `undefined` if not found
   */
  public getOptionAt(column: number, line: number): SelectOption<T> {
    return this.getOptionFromIndex(this.getIndexAt(column, line));
  }

  /**
   * Get the value of the option at the specified terminal position (absolute)
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return option value or `undefined` if not found
   */
  public getValueAt(column: number, line: number): T {
    return this.getValueFromIndex(this.getIndexAt(column, line));
  }

  /**
   * Select the option with the specified index.
   * This will do nothing if the option is disabled or the index is invalid.
   * If `options.multiple` is `false`, then it will unselect any previously selected option.
   * The list won't focus the option and therefore, the scroll won't change.
   *
   * @param index New index to set as selected (starting on 0)
   * @param selected If `true` the option will be set as selected.
   *                 If `false`, the option will be set as unselected.
   *                 If `undefined`, the option will be negated (selected -> unselected / unselected -> selected)
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public toggleIndex(index: number, selected?: boolean): boolean {
    const item = this.selectOptions[index];
    const newState = selected === undefined ? !item.selected : selected;
    let change = item.selected !== newState;
    item.selected = newState;

    if (!this.options.multiple && item.selected) {
      for (let i = 0; i < this.selectOptions.length; i++) {
        const unselectedItem = this.selectOptions[i];
        if (i !== index) {
          change = change || unselectedItem.selected;
          unselectedItem.selected = false;
        }
      }
    }

    if (change) {
      this.render();
      return true;
    }

    return true;
  }

  /**
   * Select the first option with the specified.
   * This will do nothing if all the options with that value are disabled
   *
   * @param option Value to search the option by
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public selectOption(option: SelectOption<T>): boolean {
    return this.toggleIndex(this.getIndexFromOption(option));
  }

  /**
   * Select the first option with the specified value.
   * This will do nothing if all the options with that value are disabled
   *
   * @param value Value to search the option by
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public selectValue(value: T): boolean {
    return this.toggleIndex(this.getIndexFromValue(value));
  }

  /**
   * Focus the option with the specified index.
   * This will do nothing if the option is already focused or the index is invalid.
   * The list will scroll to show the focused option if needed.
   *
   * @param index New index to set as selected (starting on 0)
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public focusIndex(index: number): boolean {
    const oldIndex = this.focusedIndex;
    const selectedOption = this.selectOptions[index];

    if (selectedOption) {
      if (!selectedOption.option.disabled && this.focusedIndex !== index) {
        this.focusedIndex = index;

        // manage the scroll to make the selected option appear in the screen
        if (selectedOption.endLine > this.firstLine + this.options.height) {
          this.firstLine = selectedOption.endLine - selectedOption.processedText.length + 1;
        }
        if (selectedOption.startLine < this.firstLine) {
          this.firstLine = selectedOption.startLine;
        }
      }
    } else if (this.options.allowUnselect) {
      this.focusedIndex = SELECT_INDEX_NONE;
    }

    if (oldIndex !== this.focusedIndex) {
      this.render();

      return true;
    }

    return false;
  }

  /**
   * Focus the the specified option
   * This will do nothing if the option is already focused or not found
   * The list will scroll to show the focused option if needed.
   *
   * @param option Option to focus
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public focusOption(option: SelectOption<T>): boolean {
    return this.focusIndex(this.getIndexFromOption(option));
  }

  /**
   * Focus the option with the specified value
   * This will do nothing if the option is already focused or not found
   * The list will scroll to show the focused option if needed.
   *
   * @param value Value to set as selected
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public focusValue(value: T): boolean {
    return this.focusIndex(this.getIndexFromValue(value));
  }

  /**
   * Focus the previous option to the current one
   *
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public focusPrev(): boolean {
    return this.moveFocus(-1);
  }

  /**
   * Select the next option to the current one
   *
   * @return `true` if the selected option has changed, `false` otherwise
   */
  public focusNext(): boolean {
    return this.moveFocus(+1);
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changes Object with only the changed options
   */
  protected updateOptions(changes: SelectOptions<T>): void {
    // const updateStyle = (state: StyleStates): void => {
    //   if (changes[state]) {
    //     this.options[state] = {
    //       ...Select.defaultOptions[state],
    //       ...this.options[state],
    //       ...changes[state],
    //     };
    //   }
    // };

    if (isEmpty(changes)) {
      return;
    }

    // updateStyle('baseStyle');
    // updateStyle('baseFocusedStyle');
    // updateStyle('selectedStyle');
    // updateStyle('selectedFocusedStyle');
    // updateStyle('disabledStyle');
    // updateStyle('disabledSelectedStyle');

    let startLine = 0;
    this.selectOptions = this.options.options.map((option) => {
      const processedText = splitText(option.text, this.options.width, this.options.tokenizer);
      const opt = {
        startLine,
        processedText,
        endLine: startLine + processedText.length,
        option: { ...option },
        selected: false,
      };
      startLine = opt.endLine;

      return opt;
    });
  }

  /**
   * Move the current selection by an specified `delta`
   *
   * @param delta how many options to "move" (`-1`: previous one, `+1`: next one)
   * @return `true` if the selected option has changed, `false` otherwise
   */
  private moveFocus(delta: number): boolean {
    const selectOptions = this.selectOptions;
    let newIndex = this.focusedIndex;
    let tries = selectOptions.length; // to prevent infinite loop in case there's no available option

    do {
      newIndex = newIndex + delta;

      if (newIndex < 0) {
        if (this.options.loop) {
          newIndex = selectOptions.length - 1;
        } else {
          newIndex = 0;
          break;
        }
      } else if (newIndex >= selectOptions.length) {
        if (this.options.loop) {
          newIndex = 0;
        } else {
          newIndex = selectOptions.length - 1;
          break;
        }
      }

      if (!selectOptions[newIndex].option.disabled) {
        break;
      }
      tries--;
    } while (newIndex !== this.focusedIndex && tries > 0);

    return tries > 0 ? this.focusIndex(newIndex) : false;
  }

  /**
   * Get the options object depending on its state
   *
   * @return `CharStyle` object corresponding to the specified option index
   */
  private getOptionStyle(optionIndex: number): SelectOptionStyle {
    const item = this.selectOptions[optionIndex];
    const status = ((isSelected, isFocused, isDisabled): StyleStates => {
      if (isSelected) {
        if (isDisabled) {
          return 'disabledSelectedStyle';
        }
        if (isFocused) {
          return 'selectedFocusedStyle';
        }
        return 'selectedStyle';
      }

      if (isDisabled) {
        return 'disabledStyle';
      }

      if (isFocused) {
        return 'baseFocusedStyle';
      }

      return 'baseStyle';
    })(item.selected, this.focusedIndex === optionIndex, item.option.disabled);

    return this.options[status];
  }

  /**
   * Get the text of an option based in its state
   *
   * @param optionIndex
   */
  private getOptionText(optionIndex: number): string[] {
    const item = this.selectOptions[optionIndex];
    const style = this.getOptionStyle(optionIndex);
    let width = this.options.width;

    if (style.prefix) {
      width -= style.prefix.length;
    }
    if (style.suffix) {
      width -= style.suffix.length;
    }

    const splittedText = splitText(item.option.text, width, this.options.tokenizer);
    if (!style.prefix && !style.suffix) {
      return splittedText;
    }

    const prefixIndentation = style.prefix ? ' '.repeat(style.prefix.length) : '';
    const suffixIndentation = style.suffix ? ' '.repeat(style.suffix.length) : '';

    return splittedText.map((line, i) => {
      const prefix = !style.prefix || i !== 0 ? prefixIndentation : style.prefix;
      const suffix = !style.suffix || i !== splittedText.length - 1 ? suffixIndentation : style.suffix;

      return prefix + line + suffix;
    });
  }
}

/*
 * Default options for new instances
 */
Select.defaultOptions = {
  options: undefined,
  loop: true,
  multiple: false,
  allowUnselect: true,
  baseStyle: { fg: '#00ff00', bg: '#000000', prefix: ' ' },
  baseFocusedStyle: { fg: '#ffffff', bg: '#000000', prefix: ' ' },
  selectedStyle: { fg: '#00ff00', bg: '#000000', prefix: '*' },
  selectedFocusedStyle: { fg: '#ffffff', bg: '#000000', prefix: '*' },
  disabledStyle: { fg: '#009900', bg: '#000000', prefix: ' ' },
  disabledSelectedStyle: { fg: '#009900', bg: '#000000', prefix: '*' },
};
