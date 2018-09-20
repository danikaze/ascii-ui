import { Terminal } from '../../src/Terminal';
import { Widget, WidgetOptions } from '../../src/Widget';
import { ProgressBar, ProgressBarOptions } from '../../src/widgets/ProgressBar';
import { load, LoadData } from '../util/load';

import { SettingEnum } from './controls/SettingEnum';
import { SettingNumber } from './controls/SettingNumber';
import { Preset, SettingsPage } from './controls/SettingsPage';
import { SettingText } from './controls/SettingText';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

const widgetSettingsSection: SettingsSection = {
  title: 'Basic ProgressBar settings',
  rows: [
    {
      cols: [
        {
          title: 'Direction',
          contents: [
            new SettingEnum({
              name: 'direction', map: {
                HORIZONTAL: 'horizontal',
                VERTICAL: 'vertical',
              },
            }),
          ],
        },
        {
          title: 'Progress %',
          contents: [
            new SettingNumber({ name: 'progress', min: 0, max: 1, step: 0.01 }),
          ],
        },
      ],
    },
  ],
};

function getTileSection(name: string, title: string): SettingsSection {
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
            title: 'Offset X',
            contents: [
              new SettingNumber({ name: `${name}.offsetX` }),
            ],
          },
          {
            title: 'Offset Y',
            contents: [
              new SettingNumber({ name: `${name}.offsetY` }),
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
 * Create the widget to test
 */
function createWidget(terminal: Terminal, options: WidgetOptions): Widget {
  const progressBar = terminal.attachWidget(ProgressBar, options);

  return progressBar;
}

/**
 * Create the WidgetSettings object for the widget settings card
 */
function createWidgetSettings() {
  const boxSettingsLayout: SettingsLayout = {
    title: 'Input options',
    sections: [
      basicSection,
      widgetSettingsSection,
      getTileSection('completedStyle', 'completedStyle'),
      getTileSection('pendingStyle', 'pendingStyle'),
      getTileSection('currentStyle', 'currentStyle'),
      getTileSection('startStyle', 'startStyle'),
      getTileSection('endStyle', 'endStyle'),
    ],
  };

  return new WidgetSettings(boxSettingsLayout);
}

/**
 * List of settings presets to display
 */
const presets = (() => {
  const horizontal = {
    col: 1,
    line: 1,
    width: 25,
    height: 1,
    direction: 'horizontal',
  } as ProgressBarOptions;

  const vertical = {
    col: 1,
    line: 1,
    width: 1,
    height: 15,
    direction: 'vertical',
  } as ProgressBarOptions;

  const baseStyle = {
    completedStyle: ProgressBar.defaultOptions.completedStyle,
    pendingStyle: ProgressBar.defaultOptions.pendingStyle,
    currentStyle: ProgressBar.defaultOptions.currentStyle,
    startStyle: ProgressBar.defaultOptions.startStyle,
    endStyle: ProgressBar.defaultOptions.endStyle,
  };

  const res: Array<Preset<ProgressBarOptions>> = [
    {
      text: 'Default horizontal',
      options: {
        ...horizontal,
        ...baseStyle,
      },
    },
    {
      text: 'Ascii horizontal',
      options: {
        ...horizontal,
        completedStyle: { char: '#', fg: '#00ff00', bg: '#000000' },
        pendingStyle: { char: '=', fg: '#00ff00', bg: '#000000' },
        currentStyle: { char: '>', fg: '#00ff00', bg: '#000000' },
        startStyle: { char: '[', fg: '#00ff00', bg: '#000000' },
        endStyle: { char: ']', fg: '#00ff00', bg: '#000000' },
      },
    },
    {
      text: 'Default vertical',
      options: {
        ...vertical,
        ...baseStyle,
      },
    },
  ];

  return res;
})();

/*
 * Execution
 */
load()
  .then(({ terminal }: LoadData) => {
    // tslint:disable-next-line:no-unused-expression
    new SettingsPage<ProgressBarOptions>({
      terminal,
      presets,
      createWidget,
      createWidgetSettings,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...ProgressBar.defaultOptions },
      widgetInitialSettings: presets[0].options,
    });
  });
