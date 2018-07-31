import { Terminal } from '../../../src/Terminal';
import { Widget, WidgetOptions } from '../../../src/Widget';
import { createElement } from '../../util/createElement';

import { JsonCard } from './JsonCard';
import { WidgetSettings } from './WidgetSettings';

export interface Preset<OptionsType extends WidgetOptions> {
  /** Text to show in the `<select>` `<option>` */
  text: string;
  /** Options to apply to the `WidgetSettings` card */
  options: OptionsType;
}

export interface SettingsPageOptions<OptionsType> {
  /** Terminal to render the widget to */
  terminal: Terminal;
  /** List of preset settings to show as options. The first one will be used to create the widget */
  presets?: Array<Preset<OptionsType>>;
  /** Default settings of the widget to calculate the partial settings code */
  widgetDefaultSettings?: OptionsType;
  /** Default settings for the widget */
  widgetInitialSettings: OptionsType;
  /** Function that creates the widget to test in the specified terminal with the `widgetInitialSettings` */
  createWidget(terminal: Terminal, options: OptionsType): Widget;
  /** Function that creates the settings card for the widget to test */
  createPageSettings?(): WidgetSettings;
  /** Funtion that creates the settings card for the optional page settings */
  createWidgetSettings(): WidgetSettings;
  /** Function called before displaying the code, in case any modification is needed */
  filterCode?(code: object): object;
  /** Function called before updating the widget options */
  preUpdateWidgeSettings?(options: object): boolean;
  /** Function called after updating the widget options */
  postUpdateWidgeSettings?(options: object): void;
}

export class SettingsPage<OptionsType extends WidgetOptions> {
  private readonly options: SettingsPageOptions<OptionsType>;
  private readonly widgetSettings: WidgetSettings;
  private readonly pageSettings: WidgetSettings;
  private readonly codeCard: JsonCard;
  private widget: Widget;

  /**
   * Create all the cards and dynamic behavior for a settings page
   */
  constructor(options: SettingsPageOptions<OptionsType>) {
    const settingsColumn = document.getElementById('widgetSettingsContainer');
    const codeColumn = document.getElementById('settingsCodeContainer');

    this.options = options;
    this.widget = options.createWidget(options.terminal, options.widgetInitialSettings);

    if (options.createPageSettings) {
      this.pageSettings = options.createPageSettings();
      settingsColumn.appendChild(this.pageSettings.getCard());
    }

    this.widgetSettings = options.createWidgetSettings();
    this.widgetSettings.setConfig(options.widgetInitialSettings);
    this.widgetSettings.onChange = this.updateWidgetSettings.bind(this);

    settingsColumn.appendChild(this.widgetSettings.getCard());

    this.createPresetConfig();

    this.codeCard = new JsonCard(this.options.widgetDefaultSettings, this.options.filterCode);
    codeColumn.appendChild(this.codeCard.getCard());
    this.codeCard.setConfig(options.widgetInitialSettings);
  }

  updateWidget(widget: Widget, settings: OptionsType): void {
    this.options.terminal.dettachWidget(this.widget);
    this.options.terminal.clear();
    this.widget = widget;
    this.options.widgetInitialSettings = settings;
    this.widgetSettings.setConfig(this.options.widgetInitialSettings);
  }

  /**
   * Update the widget options when the settings card changes
   */
  private updateWidgetSettings(): void {
    let options = this.widgetSettings.getConfig(['']);
    let cancel;

    if (this.options.preUpdateWidgeSettings) {
      cancel = this.options.preUpdateWidgeSettings(options) === false;
    }

    if (!cancel) {
      this.options.terminal.clear();
      this.widget.setOptions(options);
      this.codeCard.setConfig(options);
    } else {
      options = this.widgetSettings.getConfig(['']);
      this.codeCard.setConfig(options);
    }

    if (this.options.postUpdateWidgeSettings) {
      this.options.postUpdateWidgeSettings(options);
    }
  }

  /**
   * Create the `<select>` tag with the passed options
   */
  private createPresetConfig() {
    const container = document.getElementById('widgetSettingsPresetsContainer');

    if (!container || !this.options.presets || this.options.presets.length === 0) {
      return;
    }

    const selectElem = createElement<HTMLSelectElement>('select');

    this.options.presets.forEach(({ text }) => {
      const option = createElement<HTMLOptionElement>('option', { html: text });
      selectElem.appendChild(option);
    });

    selectElem.addEventListener('change', () => {
      const config = this.options.presets[selectElem.selectedIndex].options;
      this.widgetSettings.setConfig(config);
      this.updateWidgetSettings();
    });

    container.appendChild(selectElem);
  }
}
