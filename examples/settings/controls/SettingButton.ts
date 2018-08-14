import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export interface SettingButtonOptions extends SettingComponentOptions {
  text: string;
  callback(): void;
}

export class SettingButton extends SettingComponent<HTMLButtonElement> {
  constructor(options: SettingButtonOptions) {
    super(options);
    this.elem = createElement<HTMLButtonElement>('button', {
      class: 'setting-component-button',
      html: options.text,
    });

    this.elem.addEventListener('click', options.callback);
  }

  // tslint:disable-next-line:prefer-function-over-method
  getValue() {
    return undefined;
  }

  // tslint:disable-next-line:prefer-function-over-method
  setValue(value: boolean): void {
    // nothing to do
  }
}
