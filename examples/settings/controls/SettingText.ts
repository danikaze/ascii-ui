import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export interface SettingTextOptions extends SettingComponentOptions {
  maxLength?: number;
}

export class SettingText extends SettingComponent<HTMLInputElement> {
  constructor(options: SettingTextOptions) {
    super(options);
    const attrs = {
      maxlength: String(options.maxLength) || '',
    };
    this.elem = createElement<HTMLInputElement>('input', {
      class: 'setting-component-text',
      attrs,
    });

    if (options.maxLength) {
      this.elem.style.width = `${options.maxLength + 1}em`;
    }

    this.elem.addEventListener('input', () => {
      this.triggerChange();
    });
  }

  getValue() {
    return this.elem.value;
  }

  setValue(value: string) {
    this.elem.value = value;
  }
}
