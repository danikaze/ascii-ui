import { diff } from 'deep-object-diff';

import { createElement } from '../../util/createElement';

const JSON_INDENT_SPACES = 2;

/**
 * Manages a HTML Card to show the desired Json object
 */
export class JsonCard {
  private readonly defaultSettings: object;
  private readonly cardElem: HTMLDivElement;
  private readonly codeContainer: HTMLPreElement;
  private showFullCode: boolean = false;
  private settings: object;

  constructor(defaultSettings: object) {
    this.defaultSettings = defaultSettings;
    this.cardElem = this.createCard();
    this.codeContainer = this.cardElem.getElementsByTagName('pre')[0];
  }

  /**
   *
   */
  getCard(): HTMLDivElement {
    return this.cardElem;
  }

  /**
   *
   */
  setConfig(obj: object): void {
    this.settings = obj;
    this.updateCode();
  }

  /**
   *
   */
  private createCard(): HTMLDivElement {
    const cardElem = createElement<HTMLDivElement>('div', {
      html: `
        <div class="card shadow settings-code bg-dark text-white">
          <h3 class="card-header">
            Settings code
            ${this.defaultSettings === undefined ? '' : `<label>
              <input type="checkbox">
              View full settings
            </label>`}
          </h3>
          <div class="card-body">
            <code><pre id="settings-code" class="text-white"></pre></code>
          </div>
        </div>
      `,
    });

    const checkbox = cardElem.getElementsByTagName('input')[0];
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        this.showFullCode = checkbox.checked;
        this.updateCode();
      });
    }

    return cardElem;
  }

  /**
   *
   */
  private updateCode(): void {
    const config = this.showFullCode ? this.settings : diff(this.defaultSettings, this.settings);
    this.codeContainer.innerHTML = JSON.stringify(config, undefined, JSON_INDENT_SPACES);
  }
}
