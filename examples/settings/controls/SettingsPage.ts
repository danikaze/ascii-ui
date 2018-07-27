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
  presets: Array<Preset<OptionsType>>;
  /** Default settings of the widget to calculate the partial settings code */
  widgetDefaultSettings?: OptionsType;
  /** Function that creates the widget to test in the specified terminal with the passed options (the first preset) */
  createWidget(terminal: Terminal, options: OptionsType): Widget;
  /** Function that creates the settings card for the widget to test */
  createPageSettings?(): WidgetSettings;
  /** Funtion that creates the settings card for the optional page settings */
  createWidgetSettings(): WidgetSettings;
}

export class SettingsPage<OptionsType extends WidgetOptions> {
  private readonly options: SettingsPageOptions<OptionsType>;
  private readonly widget: Widget;
  private readonly widgetSettings: WidgetSettings;
  private readonly pageSettings: WidgetSettings;
  private readonly codeCard: JsonCard;

  /**
   * Create all the cards and dynamic behavior for a settings page
   */
  constructor(options: SettingsPageOptions<OptionsType>) {
    const initialSettings = options.presets[0].options;
    const settingsColumn = document.getElementById('widgetSettingsContainer');
    const codeColumn = document.getElementById('settingsCodeContainer');

    this.options = options;
    this.widget = options.createWidget(options.terminal, initialSettings);

    if (options.createPageSettings) {
      this.pageSettings = options.createPageSettings();
      settingsColumn.appendChild(this.pageSettings.getCard());
    }

    this.widgetSettings = options.createWidgetSettings();
    this.widgetSettings.setConfig(initialSettings);
    this.widgetSettings.onChange = this.updateWidgetSettings.bind(this);

    settingsColumn.appendChild(this.widgetSettings.getCard());

    this.createPresetConfig();

    this.codeCard = new JsonCard(this.options.widgetDefaultSettings);
    codeColumn.appendChild(this.codeCard.getCard());
    this.codeCard.setConfig(initialSettings);
  }

  /**
   * Update the widget options when the settings card changes
   */
  updateWidgetSettings(): void {
    const options = this.widgetSettings.getConfig(['']);
    this.options.terminal.clear();
    this.widget.setOptions(options);
    this.codeCard.setConfig(options);
  }

  /**
   * Create the `<select>` tag with the passed options
   */
  createPresetConfig() {
    const selectElem = document.getElementById('presets') as HTMLSelectElement;

    this.options.presets.forEach(({ text }) => {
      const option = createElement<HTMLOptionElement>('option', { html: text });
      selectElem.appendChild(option);
    });

    selectElem.addEventListener('change', () => {
      const config = this.options.presets[selectElem.selectedIndex].options;
      this.widgetSettings.setConfig(config);
      this.updateWidgetSettings();
    });
  }
}
