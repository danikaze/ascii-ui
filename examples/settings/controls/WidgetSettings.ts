import { createElement } from '../../util/createElement';
import { ReferencedObject, traverseObject } from '../../util/traverseObject';

import { SettingComponent } from './SettingComponent';

export interface WidgetConfig {
  // tslint:disable-next-line:no-any
  [key: string]: any;
}

export interface SettingsCol {
  id?: string;
  title?: string;
  contents: Array<SettingComponent | string>;
}

export interface SettingsRow {
  id?: string;
  title?: string;
  cols: SettingsCol[];
}

export interface SettingsSection {
  id?: string;
  title?: string;
  rows: SettingsRow[];
  closed?: boolean;
}

export interface SettingsLayout {
  title: string;
  sections: SettingsSection[];
}

export interface WidgetSettingsOptions {
  button?: {
    text: string;
    callback(settings: WidgetSettings, event: MouseEvent): void;
  };
}

/**
 *
 */
export class WidgetSettings {
  public onChange?: (settings: WidgetSettings, setting: SettingComponent) => void;

  private components: { [key: string]: SettingComponent } = {};
  private readonly card: HTMLDivElement;
  private readonly options: WidgetSettingsOptions;

  constructor(layout: SettingsLayout, options: WidgetSettingsOptions = {}) {
    this.options = options;
    this.card = this.createCard(layout);
  }

  /**
   *
   */
  public getCard(): HTMLDivElement {
    return this.card;
  }

  /**
   *
   */
  // tslint:disable-next-line:no-any
  public getConfig(ignoredValues: any[] = []) {
    const config = {};

    Object.keys(this.components)
      .forEach((name) => {
        if (name && name[0] !== '_') {
          const value = this.components[name].getValue();
          if (ignoredValues.indexOf(value) === -1) {
            const ref = traverseObject(config, name, { reference: true, create: true }) as ReferencedObject;
            ref.parent[ref.name] = value;
          }
        }
      });

    return config;
  }

  /**
   *
   */
  public setConfig(config: WidgetConfig) {
    Object.keys(this.components)
      .forEach((name) => {
        let value = config[name];
        if (value === undefined) {
          value = traverseObject(config, name);
        }
        if (value !== undefined) {
          this.components[name].setValue(value);
        }
      });
  }

  /**
   *
   */
  public setSections(sections: SettingsSection[]): void {
    const config = this.getConfig();
    this.card.querySelector('.card-body').innerHTML = '';
    this.components = {};
    this.createSections(sections, this.card);
    this.setConfig(config);
  }

  /**
   *
   */
  private createCard(layout: SettingsLayout): HTMLDivElement {
    const cardElem = createElement<HTMLDivElement>('div', {
      html: `
        <div class="card shadow demo-controls">
          <h3 class="card-header">${layout.title}</h3>
          <div class="card-body">
          </div>
        </div>
      `,
    });

    this.createSections(layout.sections, cardElem);

    if (this.options.button) {
      const buttonElem = createElement<HTMLButtonElement>('button', {
        html: this.options.button.text,
        class: 'card-header-button',
      });
      buttonElem.addEventListener('click', (event) => {
        this.options.button.callback(this, event);
      });
      cardElem.querySelector('.card-header')
        .appendChild(buttonElem);
    }

    return cardElem;
  }

  /**
   *
   */
  private createSections(sections: SettingsSection[], cardElem: HTMLDivElement): void {
    const cardBody = cardElem.querySelector('.card-body');
    sections.forEach((section) => {
      const sectionElem = this.createSection(section);
      cardBody.appendChild(sectionElem);
    });
  }

  /**
   *
   */
  private createSection(section: SettingsSection): HTMLDivElement {
    let sectionTitle;

    const sectionContents = createElement<HTMLDivElement>('div', {
      class: 'settings-section-contents',
    });

    if (section.title) {
      if (section.closed) {
        sectionContents.hidden = true;
      }

      sectionTitle = createElement<HTMLTitleElement>('h4', {
        class: 'settings-section-title',
        html: `<span class="settings-section-arrow">▶︎</span> ${section.title}`,
        attrs: {
          id: section.id,
        },
      });

      sectionTitle.addEventListener('click', () => {
        sectionContents.hidden = !sectionContents.hidden;
      });
    }

    section.rows.forEach((row) => {
      const rowElem = createElement<HTMLDivElement>('div', {
        class: 'row',
        html: row.title ? `<h5>${row.title}</h5>` : '',
        attrs: {
          id: row.id,
        },
      });
      sectionContents.appendChild(rowElem);

      row.cols.forEach((col) => {
        const colElem = this.createColumn(col);
        rowElem.appendChild(colElem);
      });
    });

    const sectionElem = createElement<HTMLDivElement>('div', {
      class: 'settings-section',
      html: sectionTitle ? [sectionTitle, sectionContents] : [sectionContents],
    });

    return sectionElem;
  }

  /**
   *
   */
  private createColumn(col: SettingsCol): HTMLDivElement {
    const colElem = createElement<HTMLDivElement>('div', {
      class: 'col',
      html: col.title ? `<h6>${col.title}</h6>` : '',
      attrs: {
        id: col.id,
      },
    });

    col.contents.forEach((cell) => {
      let elem;
      if (typeof cell === 'string') {
        elem = createElement<HTMLSpanElement>('span', { html: cell });
      } else {
        elem = cell.getElem();
        const name = cell.getName();
        if (name) {
          this.components[name] = cell;
          cell.onChange(() => {
            if (this.onChange) {
              this.onChange(this, cell);
            }
          });
        }
      }

      colElem.appendChild(elem);
    });

    return colElem;
  }
}
