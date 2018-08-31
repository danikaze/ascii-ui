import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export class SettingTextArea extends SettingComponent<HTMLTextAreaElement> {
  constructor(options: SettingComponentOptions) {
    super(options);

    this.elem = createElement<HTMLTextAreaElement>('textarea', {
      class: 'setting-component-text',
    });

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
