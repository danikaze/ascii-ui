import { createElement } from '../../util/createElement';

import { SettingComponent, SettingComponentOptions } from './SettingComponent';

export interface SettingEnumOptions extends SettingComponentOptions {
  map: { [key: string]: string | number };
}

export class SettingEnum extends SettingComponent<HTMLSelectElement> {
  private readonly map: { [key: string]: string | number };

  constructor(options: SettingEnumOptions) {
    super(options);
    this.map = options.map;
    this.elem = createElement<HTMLSelectElement>('select', {
      class: 'setting-component-enum',
    });

    Object.keys(options.map)
      .forEach((key) => {
        const optionElem = createElement<HTMLOptionElement>('option', {
          html: key,
          attrs: {
            value: String(options.map[key]),
          },
        });
        this.elem.appendChild(optionElem);
      });

    this.elem.addEventListener('change', () => {
      this.triggerChange();
    });
  }

  public getValue() {
    const key = this.elem.options[this.elem.selectedIndex].label;

    return this.map[key];
  }

  public setValue(value: string | number): void {
    this.elem.value = String(value);
  }
}
