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
      class: 'setting-component-number',
      attrs,
    });

    this.elem.addEventListener('input', () => {
      this.triggerChange();
    });
  }

  getValue() {
    const n = parseInt(this.elem.value, 10);

    return isNaN(n) ? '' : n;
  }

  setValue(value: number) {
    this.elem.value = String(value);
  }
}
