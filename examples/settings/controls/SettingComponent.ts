export interface SettingComponentOptions {
  name?: string;
  disabled?: boolean;
  style?: { [key: string]: string };
}

export abstract class SettingComponent<T extends HTMLElement = HTMLElement> {
  protected elem: T;
  private name: string;
  private disabled: boolean;
  private style?: { [key: string]: string };
  private onChangeCallback: (setting: SettingComponent) => void; // tslint:disable-line:no-any

  constructor(options: SettingComponentOptions) {
    this.name = options.name;
    this.disabled = options.disabled;
    this.style = options.style;
  }

  getElem(): T {
    if (this.disabled) {
      this.elem.setAttribute('disabled', 'disabled');
    }
    if (this.style) {
      Object.keys(this.style)
        .forEach((key) => {
          this.elem.style[key] = this.style[key];
        });
    }
    this.elem.setAttribute('setting-name', name);

    return this.elem;
  }

  getName(): string {
    return this.name;
  }

  onChange(callback: (setting: SettingComponent) => void): void { // tslint:disable-line:no-any
    this.onChangeCallback = callback;
  }

  abstract getValue(): any; // tslint:disable-line:no-any
  abstract setValue(value: any): void; // tslint:disable-line:no-any

  protected triggerChange(): void { // tslint:disable-line:no-any
    if (this.onChangeCallback) {
      this.onChangeCallback(this);
    }
  }
}
