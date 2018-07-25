export interface SettingComponentOptions {
  name: string;
}

export abstract class SettingComponent<T extends HTMLElement = HTMLElement> {
  protected elem: T;
  private name: string;
  private onChangeCallback: (setting: SettingComponent) => void; // tslint:disable-line:no-any

  constructor(options: SettingComponentOptions) {
    this.name = options.name;
  }

  getElem(): T {
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
