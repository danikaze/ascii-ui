export interface SettingComponentOptions {
  name?: string;
  disabled?: boolean;
  style?: { [key: string]: string };
}

export abstract class SettingComponent<T extends HTMLElement = HTMLElement> {
  protected elem: T;
  private readonly name: string;
  private readonly disabled: boolean;
  private readonly style?: { [key: string]: string };
  private onChangeCallback: (setting: SettingComponent) => void;

  constructor(options: SettingComponentOptions) {
    this.name = options.name;
    this.disabled = options.disabled;
    this.style = options.style;
  }

  public getElem(): T {
    if (this.disabled) {
      this.elem.setAttribute('disabled', 'disabled');
    }
    if (this.style) {
      Object.keys(this.style)
        .forEach((key) => {
          (this.elem.style as any)[key] = this.style[key]; // tslint:disable-line:no-any
        });
    }
    this.elem.setAttribute('setting-name', this.name);

    return this.elem;
  }

  public getName(): string {
    return this.name;
  }

  public onChange(callback: (setting: SettingComponent) => void): void { // tslint:disable-line:no-any
    this.onChangeCallback = callback;
  }

  public abstract getValue(): any; // tslint:disable-line:no-any
  public abstract setValue(value: any): void; // tslint:disable-line:no-any

  protected triggerChange(): void { // tslint:disable-line:no-any
    if (this.onChangeCallback) {
      this.onChangeCallback(this);
    }
  }
}
