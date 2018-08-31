import { Terminal } from '../../src/Terminal';
import { Box, BoxOptions } from '../../src/widgets/Box';
import { Select, SelectOptions } from '../../src/widgets/Select';
import { Widget, WidgetOptions } from '../../src/Widget';
import { LoadData, load } from '../util/load';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingButton } from './controls/SettingButton';
import { SettingNumber } from './controls/SettingNumber';
import { SettingText } from './controls/SettingText';
import { SettingsPage } from './controls/SettingsPage';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsRow, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

let boxWidget: Box;
let selectWidget: Select<string>;
let page: SettingsPage<SelectOptions<string>>;
let pageSettings: WidgetSettings;
let selectOptionsSettingRows: SettingsRow[] = [];
let selectOptionsSettingsRowId = 1;
let widgetSettings: WidgetSettings;

const visibleBox: BoxOptions = {
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  base: {
    boxBorders: { fg: '#00ff00' },
  },
  focus: {
    boxBorders: { fg: '#ffff00' },
  },
  disabled: {
    boxBorders: { fg: '#009900' },
  },
};

const hiddenBox: BoxOptions = {
  title: '',
  base: {
    boxBorders: { fg: '#000000' },
  },
  focus: {
    boxBorders: { fg: '#000000' },
  },
  disabled: {
    boxBorders: { fg: '#000000' },
  },
};

const pageSettingsLayout: SettingsLayout = {
  title: 'Options',
  sections: [
    {
      rows: [
        {
          cols: [
            {
              contents: [
                new SettingBoolean({ name: 'showBox' }),
                ' Show box',
              ],
            },
          ],
        },
        {
          cols: [
            {
              contents: [
                new SettingButton({
                  text: '↓',
                  callback: () => { selectWidget.next(); },
                }),
                ' ',
                new SettingButton({
                  text: '↑',
                  callback: () => { selectWidget.prev(); },
                }),
                ' ',
                new SettingButton({
                  text: 'Unselect',
                  callback: () => { selectWidget.selectIndex(-1); },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};

const selectSettingsSection: SettingsSection = {
  title: 'Options',
  rows: [
    {
      cols: [
        {
          title: 'Loop',
          contents: [
            new SettingBoolean({ name: 'loop' }),
          ],
        },
        {
          title: 'Allow unselect',
          contents: [
            new SettingBoolean({ name: 'allowUnselect' }),
          ],
        },
      ],
    },
  ],
};

/**
 *
 * @param name
 * @param title
 */
function getCharStyleSection(name: string, title: string): SettingsSection {
  return {
    title,
    closed: true,
    rows: [
      {
        cols: [
          {
            title: 'Font',
            contents: [
              new SettingText({ name: `${name}.font` }),
            ],
          },
          {
            title: 'Font Offset X',
            contents: [
              new SettingNumber({ name: `${name}.fontOffsetX` }),
            ],
          },
          {
            title: 'Font Offset Y',
            contents: [
              new SettingNumber({ name: `${name}.fontOffsetY` }),
            ],
          },
        ],
      },
      {
        cols: [
          {
            title: 'Character',
            contents: [
              new SettingText({ name: `${name}.char`, maxLength: 1 }),
            ],
          },
          {
            title: 'FG color',
            contents: [
              new SettingText({ name: `${name}.fg` }),
            ],
          },
          {
            title: 'BG color',
            contents: [
              new SettingText({ name: `${name}.bg` }),
            ],
          },
        ],
      },
    ],
  };
}

/**
 * Get a SettingRow for the Page Widget Settings box
 */
function getWidgetSettingsRow(): SettingsRow {
  function removeRow() {
    selectOptionsSettingRows = selectOptionsSettingRows.filter((item) => item.id !== id);
    widgetSettingsLayout.sections[1].rows = selectOptionsSettingRows;
    widgetSettings.setSections(widgetSettingsLayout.sections);
  }

  const n = selectOptionsSettingsRowId++;
  const id = `pageSettingsRow${n}`;
  const row: SettingsRow = {
    id,
    cols: [
      {
        contents: [
          'Text: ',
          new SettingText({ name: `text-${n}` }),
        ],
      },
      // {
      //   contents: [
      //     'Value: ',
      //     new SettingText({ name: `value-${n}` }),
      //   ],
      // },
      {
        contents: [
          new SettingBoolean({ name: `disabled-${n}` }),
          ' Disabled',
        ],
      },
      {
        contents: [
          new SettingButton({ text: `Remove ${n}`, callback: removeRow }),
        ],
      },
    ],
  };

  return row;
}

const widgetSettingsLayout: SettingsLayout = {
  title: 'Select options',
  sections: [
    basicSection,
    selectSettingsSection,
    getCharStyleSection('base', 'Base Style'),
    getCharStyleSection('selected', 'Selected Style'),
    getCharStyleSection('disabled', 'Disabled Style'),
  ],
};

/**
 *
 */
function addSelectOption(): void {
  const newRow = getWidgetSettingsRow();
  selectOptionsSettingRows.push(newRow);
  widgetSettingsLayout.sections[1].rows = [
    widgetSettingsLayout.sections[1].rows[0],
    ...selectOptionsSettingRows,
  ];
  widgetSettings.setSections(widgetSettingsLayout.sections);
}

/**
 *
 */
function postUpdateWidgetSettings(options) {
  boxWidget.setOptions({
    col: options.col - 1,
    line: options.line - 1,
    width: options.width + 2,   // tslint:disable-line:no-magic-numbers
    height: options.height + 2, // tslint:disable-line:no-magic-numbers
  });
  boxWidget.render();
}

/**
 * Create the widget to test
 */
function createWidget(terminal: Terminal, options: WidgetOptions): Widget {
  boxWidget = terminal.attachWidget(Box, {
    ...visibleBox,
    col: options.col - 1,
    line: options.line - 1,
    width: options.width + 2,   // tslint:disable-line:no-magic-numbers
    height: options.height + 2, // tslint:disable-line:no-magic-numbers
  });
  selectWidget = boxWidget.attachWidget(Select, options) as Select<string>;

  return selectWidget;
}

/**
 * Create the WidgetSettings object for the widget settings card
 */
function createWidgetSettings() {
  widgetSettings = new WidgetSettings(widgetSettingsLayout, {
    button: {
      text: 'Add new option',
      callback: addSelectOption,
    },
  });

  return widgetSettings;
}

/**
 * Listen to changes on the Demo settings and apply it to the widgets
 */
function updatePageSettings(pSettings: WidgetSettings) {
  interface DemoConfig {
    showBox: boolean;
  }

  if (!page) {
    return;
  }

  const config: DemoConfig = pSettings.getConfig(['']) as DemoConfig;
  boxWidget.setOptions(config.showBox ? visibleBox : hiddenBox);
}

/**
 * Transform the config object into an array of configs
 */
function transformOptions(config) {
  const input = {};
  const options = [];
  const MATCH_PROP = 1;
  const MATCH_ID = 2;

  Object.keys(config)
    .forEach((key) => {
      const match = /([^-]+)-([0-9]+)/.exec(key);
      if (match) {
        if (!input[match[MATCH_ID]]) {
          input[match[MATCH_ID]] = {};
        }
        input[match[MATCH_ID]][match[MATCH_PROP]] = config[key];
        delete config[key];
      }
    });
  Object.keys(input)
    .forEach((key) => {
      if (input[key].text) {
        options.push(input[key]);
      }
    });

  config.options = options;
  return config;
}

/**
 *
 */
function createPageSettings(): WidgetSettings {
  pageSettings = new WidgetSettings(pageSettingsLayout);
  pageSettings.setConfig({
    showBox: true,
  });

  pageSettings.onChange = updatePageSettings;
  updatePageSettings(pageSettings);

  return pageSettings;
}

function preUpdateWidgeSettings(): boolean {
  updatePageSettings(pageSettings);

  return true;
}

const widgetInitialSettings = {
  ...Widget.defaultOptions,
  ...Select.defaultOptions,
  col: 2,
  line: 2,
  width: 20,
  height: 3,
  options: [],
};

/*
 * Execution
 */
load()
  .then(({ terminal }: LoadData) => {
    page = new SettingsPage<SelectOptions<string>>({
      terminal,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...Select.defaultOptions },
      widgetInitialSettings,
      createPageSettings,
      createWidget,
      createWidgetSettings,
      transformOptions,
      preUpdateWidgeSettings,
      postUpdateWidgetSettings,
    });
  });
