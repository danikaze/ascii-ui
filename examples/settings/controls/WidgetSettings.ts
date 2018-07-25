import { createElement } from '../../util/createElement';
import { ReferencedObject, traverseObject } from '../../util/traverseObject';

import { SettingComponent } from './SettingComponent';

export interface SettingsCol {
  title?: string;
  contents: Array<SettingComponent | string>;
}

export interface SettingsRow {
  title?: string;
  cols: SettingsCol[];
}

export interface SettingsSection {
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
    callback(settings: WidgetSettings, event): void;
  };
  onChange?(setting: SettingComponent, settings: WidgetSettings): void;
}

/**
 *
 */
export class WidgetSettings {
  private readonly components: { [key: string]: SettingComponent } = {};
  private readonly card: HTMLDivElement;
  private readonly options: WidgetSettingsOptions;

  constructor(layout: SettingsLayout, options: WidgetSettingsOptions = {}) {
    this.options = options;
    this.card = this.createCard(layout);
  }

  /**
   *
   */
  getCard(): HTMLDivElement {
    return this.card;
  }

  /**
   *
   */
  getConfig(ignoredValues = []) {
    const config = {};

    Object.keys(this.components)
      .forEach((name) => {
        const value = this.components[name].getValue();
        if (ignoredValues.indexOf(value) === -1) {
          const ref = traverseObject(config, name, { reference: true, create: true }) as ReferencedObject;
          ref.parent[ref.name] = value;
        }
      });

    return config;
  }

  /**
   *
   */
  setConfig(config: object) {
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
   * @param layout
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

    const cardBody = cardElem.querySelector('.card-body');
    layout.sections.forEach((section) => {
      const sectionElem = this.createSection(section);
      cardBody.appendChild(sectionElem);
    });

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
   * @param section
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

      sectionTitle = createElement('h4', {
        class: 'settings-section-title',
        html: `<span class="settings-section-arrow">▶︎</span> ${section.title}`,
      });

      sectionTitle.addEventListener('click', () => {
        sectionContents.hidden = !sectionContents.hidden;
      });
    }

    section.rows.forEach((row) => {
      const rowElem = createElement<HTMLDivElement>('div', {
        class: 'row',
        html: row.title ? `<h5>${row.title}</h5>` : '',
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
   * @param col
   */
  private createColumn(col: SettingsCol): HTMLDivElement {
    const colElem = createElement<HTMLDivElement>('div', {
      class: 'col',
      html: col.title ? `<h6>${col.title}</h6>` : '',
    });

    col.contents.forEach((cell) => {
      let elem;
      if (typeof cell === 'string') {
        elem = createElement<HTMLSpanElement>('span', { html: cell });
      } else {
        elem = cell.getElem();
        this.components[cell.getName()] = cell;
        if (this.options.onChange) {
          cell.onChange(() => this.options.onChange(cell, this));
        }
      }

      colElem.appendChild(elem);
    });

    return colElem;
  }
}
