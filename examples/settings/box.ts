import { Terminal } from '../../src/Terminal';
import { deepAssign } from '../../src/util/deepAssign';
import { Widget, WidgetOptions } from '../../src/Widget';
import { Box, BoxOptions } from '../../src/widgets/Box';
import { Text } from '../../src/widgets/Text';
import { LoadData, load } from '../util/load';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingNumber } from './controls/SettingNumber';
import { Preset, SettingsPage } from './controls/SettingsPage';
import { SettingText } from './controls/SettingText';
import { SettingTextArea } from './controls/SettingTextArea';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

let textWidget: Text;

const pageSettingsSection: SettingsSection = {
  rows: [
    {
      cols: [
        {
          contents: [
            new SettingBoolean({ name: 'show' }),
            ' Show test text',
          ],
        },
      ],
    },
    {
      cols: [
        {
          contents: [
            new SettingTextArea({ name: 'text' }),
          ],
        },
      ],
    },
  ],
};

const boxPaddingSection: SettingsSection = {
  title: 'Basic Box options',
  rows: [
    {
      title: 'Title',
      cols: [
        {
          contents: [
            new SettingText({ name: 'title' }),
          ],
        },
      ],
    },
    {
      title: 'Padding',
      cols: [
        {
          title: 'Top',
          contents: [
            new SettingNumber({
              name: 'padding.top',
              min: 0,
              step: 1,
            }),
          ],
        },
        {
          title: 'Right',
          contents: [
            new SettingNumber({ name: 'padding.right', min: 0, step: 1 }),
          ],
        },
        {
          title: 'Bottom',
          contents: [
            new SettingNumber({ name: 'padding.bottom', min: 0, step: 1 }),
          ],
        },
        {
          title: 'Left',
          contents: [
            new SettingNumber({ name: 'padding.left', min: 0, step: 1 }),
          ],
        },
      ],
    },
  ],
};

/**
 * Get a SettingsSection for the BoxAspectOptions based on its name (prefix)
 */
function getBoxAspectLayoutSection(name: string, title: string): SettingsSection {
  return {
    title,
    closed: true,
    rows: [
      {
        title: 'Title options',
        cols: [
          {
            title: 'Font',
            contents: [
              new SettingText({ name: `${name}.boxTitle.font` }),
            ],
          },
          {
            title: 'Font Offset X',
            contents: [
              new SettingNumber({ name: `${name}.boxTitle.fontOffsetX` }),
            ],
          },
          {
            title: 'Font Offset Y',
            contents: [
              new SettingNumber({ name: `${name}.boxTitle.fontOffsetY` }),
            ],
          },
        ],
      },
      {
        cols: [
          {
            title: 'FG color',
            contents: [
              new SettingText({ name: `${name}.boxTitle.fg` }),
            ],
          },
          {
            title: 'BG color',
            contents: [
              new SettingText({ name: `${name}.boxTitle.bg` }),
            ],
          },
        ],
      },
      {
        cols: [
          {
            title: 'Margin left',
            contents: [
              new SettingNumber({ name: `${name}.boxTitle.marginLeft` }),
            ],
          },
          {
            title: 'Margin right',
            contents: [
              new SettingNumber({ name: `${name}.boxTitle.marginRight` }),
            ],
          },
          {
            title: 'Ellipsis',
            contents: [
              new SettingText({ name: `${name}.boxTitle.ellipsis` }),
            ],
          },
        ],
      },
      {
        title: 'Borders Char Style',
        cols: [
          {
            title: 'Font',
            contents: [
              new SettingText({ name: `${name}.boxBorders.font` }),
            ],
          },
          {
            title: 'Font Offset X',
            contents: [
              new SettingNumber({ name: `${name}.boxBorders.fontOffsetX` }),
            ],
          },
          {
            title: 'Font Offset Y',
            contents: [
              new SettingNumber({ name: `${name}.boxBorders.fontOffsetY` }),
            ],
          },
        ],
      },
      {
        cols: [
          {
            title: 'FG color',
            contents: [
              new SettingText({ name: `${name}.boxBorders.fg` }),
            ],
          },
          {
            title: 'BG color',
            contents: [
              new SettingText({ name: `${name}.boxBorders.bg` }),
            ],
          },
        ],
      },
      {
        title: 'Borders Characters',
        cols: [
          {
            contents: [
              new SettingText({ name: `${name}.boxBorders.topLeft`, maxLength: 1 }),
              new SettingText({ name: `${name}.boxBorders.top`, maxLength: 1 }),
              new SettingText({ name: `${name}.boxBorders.topRight`, maxLength: 1 }),
            ],
          },
        ],
      },
      {
        cols: [
          {
            contents: [
              new SettingText({ name: `${name}.boxBorders.left`, maxLength: 1 }),
              new SettingText({ name: `${name}.boxBorders.center`, maxLength: 1 }),
              new SettingText({ name: `${name}.boxBorders.right`, maxLength: 1 }),
            ],
          },
        ],
      },
      {
        cols: [
          {
            contents: [
              new SettingText({ name: `${name}.boxBorders.bottomLeft`, maxLength: 1 }),
              new SettingText({ name: `${name}.boxBorders.bottom`, maxLength: 1 }),
              new SettingText({ name: `${name}.boxBorders.bottomRight`, maxLength: 1 }),
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
  const boxWidget = terminal.attachWidget(Box, options);
  textWidget = boxWidget.attachWidget(Text, {});

  return boxWidget;
}

/**
 * Create the WidgetSettings object for the widget settings card
 */
function createWidgetSettings() {
  const boxSettingsLayout: SettingsLayout = {
    title: 'Box options',
    sections: [
      basicSection,
      boxPaddingSection,
      getBoxAspectLayoutSection('base', 'Base Aspect'),
      getBoxAspectLayoutSection('focus', 'Focused Aspect'),
      getBoxAspectLayoutSection('disabled', 'Disabled Aspect'),
    ],
  };

  return new WidgetSettings(boxSettingsLayout);
}

/**
 * Listen to changes on the Demo settings and apply it to the widgets
 */
function updateDemoSettings(settings: WidgetSettings) {
  interface DemoConfig {
    show: boolean;
    text: string;
  }

  const config: DemoConfig = settings.getConfig() as DemoConfig;

  if (config.show) {
    textWidget.setOptions({ text: config.text });
  } else {
    textWidget.setOptions({ text: '' });
  }
}

/**
 *
 */
function createPageSettings(): WidgetSettings {
  const demoSettingsLayout: SettingsLayout = {
    title: 'Demo options',
    sections: [ pageSettingsSection ],
  };
  const demoSettings = new WidgetSettings(demoSettingsLayout);
  demoSettings.setConfig({
    show: true,
    text: 'Lorem ipsum dolor sit amet, '
        + 'consectetur adipiscing elit, '
        + 'sed do eiusmod tempor incididunt '
        + 'ut labore et dolore magna aliqua. '
        + 'Ut enim ad minim veniam, quis nostrud '
        + 'exercitation ullamco laboris nisi '
        + 'ut aliquip ex ea commodo consequat. '
        + 'Duis aute irure dolor in reprehenderit '
        + 'in voluptate velit esse cillum dolore '
        + 'eu fugiat nulla pariatur. '
        + 'Excepteur sint occaecat cupidatat '
        + 'non proident, sunt in culpa qui '
        + 'officia deserunt mollit anim '
        + 'id est laborum.',
  });

  demoSettings.onChange = updateDemoSettings;
  updateDemoSettings(demoSettings);

  return demoSettings;
}

/**
 * List of settings presets to display
 */
const presets: Array<Preset<BoxOptions>> = (() => {
  const basicConfig = deepAssign(
    {},
    Widget.defaultOptions,
    {
      col: 1,
      line: 1,
      width: 25,
      height: 5,
    },
    Box.defaultOptions,
    { title: 'Title' },
  );

  const res: Array<Preset<BoxOptions>> = [
    {
      text: 'Basic options with 1 tile padding',
      options: basicConfig,
    },
    {
      text: 'Basic options with no padding',
      options: deepAssign(
        {},
        basicConfig,
        {
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      ),
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
    new SettingsPage<BoxOptions>({
      terminal,
      presets,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...Box.defaultOptions },
      widgetInitialSettings: presets[0].options,
      createPageSettings,
      createWidget,
      createWidgetSettings,
    });
  });
