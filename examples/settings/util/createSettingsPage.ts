import { diff } from 'deep-object-diff';

import { Terminal } from '../../../src/Terminal';
import { Widget, WidgetOptions } from '../../../src/Widget';
import { createElement } from '../../util/createElement';
import { WidgetSettings } from '../controls/WidgetSettings';

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

const JSON_INDENT_SPACES = 2;

/**
 * Update the HTML card with the code for the options of the widget
 */
function updateCode(defaultSettings: object, settings: WidgetSettings) {
  const elem = document.getElementById('settings-code');
  const fullChecked = (document.getElementById('settings-code-full') as HTMLInputElement).checked;
  const fullConfig = settings.getConfig(['']);
  const config = fullChecked ? fullConfig : diff(defaultSettings, fullConfig);
  elem.innerHTML = JSON.stringify(config, undefined, JSON_INDENT_SPACES);
}

/**
 * Update the widget options when the settings card changes
 */
function updateWidgetSettings<OptionsType extends WidgetOptions>(
  defaultSettings: OptionsType, terminal: Terminal,
  widget: Widget, widgetSettings: WidgetSettings) {
  const options = widgetSettings.getConfig(['']);
  terminal.clear();
  widget.setOptions(options);
  updateCode(defaultSettings, widgetSettings);
}

/**
 * Create the `<select>` tag with the passed options
 */
function createPresetConfig<OptionsType extends WidgetOptions>(
  terminal: Terminal, widget: Widget, settings: WidgetSettings,
  presets: Array<Preset<OptionsType>>, defaultSettings: OptionsType) {
  const select = document.getElementById('presets') as HTMLSelectElement;

  presets.forEach(({ text }) => {
    const option = createElement<HTMLOptionElement>('option', { html: text });
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    const config = presets[select.selectedIndex].options;
    settings.setConfig(config);
    updateWidgetSettings(defaultSettings, terminal, widget, settings);
  });
}

/**
 * Create all the cards and dynamic behavior for a settings page
 */
export function createSettingsPage<O extends WidgetOptions>(
    options: SettingsPageOptions<O>): void {
  const widget = options.createWidget(options.terminal, options.presets[0].options);
  const settingsColumn = document.getElementById('widgetSettings');

  if (options.createPageSettings) {
    const pageSettings = options.createPageSettings();
    settingsColumn.appendChild(pageSettings.getCard());
  }

  const widgetSettings = options.createWidgetSettings();
  widgetSettings.setConfig(options.presets[0].options);
  widgetSettings.onChange = updateWidgetSettings.bind(
    undefined,
    options.widgetDefaultSettings,
    options.terminal,
    widget,
    widgetSettings,
  );

  settingsColumn.appendChild(widgetSettings.getCard());

  createPresetConfig(
    options.terminal,
    widget,
    widgetSettings,
    options.presets,
    options.widgetDefaultSettings,
  );

  updateCode(options.widgetDefaultSettings, widgetSettings);
  document
    .getElementById('settings-code-full')
    .addEventListener('change', () => updateCode(options.widgetDefaultSettings, widgetSettings));
}
