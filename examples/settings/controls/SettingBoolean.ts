import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export class SettingBoolean extends SettingComponent<HTMLInputElement> {
  constructor(options: SettingComponentOptions) {
    super(options);
    this.elem = createElement<HTMLInputElement>('input', {
      attrs: {
        class: 'setting-component-checkbox',
        type: 'checkbox',
      },
    });

    this.elem.addEventListener('change', () => {
      this.triggerChange();
    });
  }

  getValue() {
    return this.elem.checked;
  }

  setValue(value: boolean): void {
    this.elem.checked = !!value;
  }
}
