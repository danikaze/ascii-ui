import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export interface SettingNumberOptions extends SettingComponentOptions {
  min?: number;
  max?: number;
  step?: number;
}

export class SettingNumber extends SettingComponent<HTMLInputElement> {
  constructor(options: SettingNumberOptions) {
    super(options);
    const attrs = {
      type: 'number',
      min: options.min !== undefined ? String(options.min) : '',
      max: options.max !== undefined ? String(options.max) : '',
      step: options.step !== undefined ? String(options.step) : '',
    };
    this.elem = createElement<HTMLInputElement>('input', {
      attrs,
      class: 'setting-component-number',
    });

    this.elem.addEventListener('input', () => {
      this.triggerChange();
    });
  }

  public getValue() {
    // tslint:disable-next-line:ban
    const n = parseFloat(this.elem.value);

    return isNaN(n) ? '' : n;
  }

  public setValue(value: number) {
    this.elem.value = String(value);
  }
}
