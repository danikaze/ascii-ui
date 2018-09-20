import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export interface SettingTextOptions extends SettingComponentOptions {
  maxLength?: number;
}

export class SettingText extends SettingComponent<HTMLInputElement> {
  constructor(options: SettingTextOptions) {
    super(options);
    const attrs = {
      maxlength: options.maxLength ? String(options.maxLength) : undefined,
    };
    this.elem = createElement<HTMLInputElement>('input', {
      attrs,
      class: 'setting-component-text',
    });

    if (options.maxLength) {
      this.elem.style.width = `${options.maxLength + 1}em`;
    }

    this.elem.addEventListener('input', () => {
      this.triggerChange();
    });
  }

  public getValue() {
    return this.elem.value;
  }

  public setValue(value: string) {
    this.elem.value = value;
  }
}
