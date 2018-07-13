import { Terminal } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { deepAssign } from '../util/deepAssign';

export interface InputOptions extends WidgetOptions {
  /** If `true`, it won't display the real value but `passwordCharacter` */
  password?: boolean;
  /** If `password` is `true`, it will display this character instead of the real value */
  passwordCharacter?: string;
  /** If `> 0`, only will allow the specified number of characters */
  maxLength?: number;
}

/**
 * One line text input widget
 */
export class Input extends Widget {
  /** Default options for widget instances */
  static defaultOptions: InputOptions;
  /** Options of the Input Widget */
  protected readonly options: InputOptions;
  /** Current value of the widget */
  private value: string = '';
  /** First character to show, for the scroll */
  private offset: number = 0;
  /** Allows to control the `showCursor` settings */
  private terminalCursor: boolean;

  constructor(terminal: Terminal, options: InputOptions, parent?: WidgetContainer) {
    super(
      terminal,
      deepAssign({}, Input.defaultOptions, options),
      parent,
    );
  }

  /**
   * Render the widget in the associated terminal
   */
  render(): void {
    if (typeof this.value === 'undefined') {
      return;
    }

    const length = Math.min(this.options.width, this.value.length);
    const displayedText = (this.options.password
      ? this.options.passwordCharacter.repeat(length)
      : this.value.substr(this.offset, length))
      + ' '.repeat(this.options.width - length);

    this.terminal.setText(displayedText, this.options.col, this.options.line);
    this.terminal.setCursor(this.options.col + length - (this.offset > 0 ? 1 : 0), this.options.line);
  }

  /**
   * Get the current value of the input text
   *
   * @param showPassword if this is not `true` when the input is set as password, the returned value will be hidden
   * @return current value
   */
  getValue(showPassword?: boolean): string {
    return !this.options.password || showPassword
      ? this.value
      : this.options.passwordCharacter.repeat(this.value.length);
  }

  /**
   * Set the new value of the input text
   *
   * @param value new value to be set
   */
  setValue(value: string): void {
    this.value = this.options.maxLength > 0 ? value.substr(0, this.options.maxLength) : value;
    this.offset = Math.max(0, this.value.length - this.options.width + 1);
    this.render();
  }

  /**
   * Set this Widget as focused. Usually done by a upper level that controls other widgets
   * (so the previously focused widget is blurred)
   */
  focus(): void {
    super.focus();
    this.terminalCursor = this.terminal.isCursorEnabled();
    this.terminal.setOptions({ cursor: true });
  }

  /**
   * Remove the focus from this widget.
   * Usually done by a upper level that controls other widgets.
   */
  blur(): void {
    super.blur();
    this.terminal.setOptions({ cursor: this.terminalCursor });
  }

  /**
   * `setOptions` will assign the options to `this.options`,
   * but any derivated calculation should be done here.
   *
   * @param changedOptions Object with only the changed options
   */
  protected updateOptions(changedOptions: InputOptions): void {
    if (this.options.height !== 1) {
      this.options.height = 1;
    }

    if (changedOptions.passwordCharacter) {
      this.options.passwordCharacter = changedOptions.passwordCharacter.charAt(0);
    }

    for (const key of ['password', 'passwordCharacter', 'maxLength']) {
      if (typeof changedOptions[key] !== 'undefined') {
        this.render();

        return;
      }
    }
  }
}

/*
 * Default options for new instances
 */
Input.defaultOptions = {
  maxLength: 0,
  password: false,
  passwordCharacter: '*',
};
