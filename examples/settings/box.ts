import { diff } from 'deep-object-diff';

import { Terminal } from '../../src/Terminal';
import { deepAssign } from '../../src/util/deepAssign';
import { Box } from '../../src/widgets/Box';
import { Text } from '../../src/widgets/Text';
import { LoadData, load } from '../util/load';
import { traverseObject } from '../util/traverseObject';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingComponent } from './controls/SettingComponent';
import { SettingNumber } from './controls/SettingNumber';
import { SettingText } from './controls/SettingText';
import { SettingTextArea } from './controls/SettingTextArea';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

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
 * Listen to changes on the WidgetSetting and apply it to the widget
 */
function updateBoxSettings(terminal: Terminal, widget: Box, setting: SettingComponent, widgetSettings: WidgetSettings) {
  const value = setting.getValue();

  if (value === '' || value === undefined) {
    return;
  }

  const options = {};
  const ref = traverseObject(options, setting.getName(), { reference: true, create: true });
  ref.parent[ref.name] = setting.getValue();

  terminal.clear();
  widget.setOptions(options);
  updateCode(widgetSettings);
}

/**
 * Listen to changes on the Demo settings and apply it to the widgets
 */
function updateDemoSettings(box: Box, text: Text, setting: SettingComponent, settings: WidgetSettings) {
  interface DemoConfig {
    show: boolean;
    text: string;
  }

  const config: DemoConfig = settings.getConfig() as DemoConfig;

  if (config.show) {
    text.setOptions({ text: config.text });
  } else {
    text.setOptions({ text: '' });
  }
}

/**
 * Update the HTML card with the code for the options of the widget
 */
function updateCode(settings: WidgetSettings) {
  const elem = document.getElementById('settings-code');
  const fullChecked = (document.getElementById('settings-code-full') as HTMLInputElement).checked;
  const fullConfig = settings.getConfig(['']);
  const config = fullChecked ? fullConfig : diff(Box.defaultOptions, fullConfig);
  // tslint:disable-next-line:no-magic-numbers
  elem.innerHTML = JSON.stringify(config, undefined, 2);
}

/**
 * Execute this example when the terminal is ready
 */
function run({ terminal }: LoadData) {
  const boxOptions = deepAssign(
    {
      col: 1,
      line: 1,
      width: 25,
      height: 5,
      focusable: true,
    },
    Box.defaultOptions,
    { title: 'Title' },
  );

  // tslint:disable-next-line:no-any
  const box = terminal.attachWidget(Box as any, boxOptions) as Box;
  // tslint:disable-next-line:no-magic-numbers
  // tslint:disable-next-line:no-any
  const text = box.attachWidget(Text as any, {}) as Text;

  /*
   * Demo settings card
   */
  const demoSettingsLayout: SettingsLayout = {
    title: 'Demo options',
    sections: [ pageSettingsSection ],
  };
  const demoSettings = new WidgetSettings(demoSettingsLayout, {
    onChange: updateDemoSettings.bind(undefined, box, text),
  });
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
  document.getElementById('widgetSettings')
          .appendChild(demoSettings.getCard());
  updateDemoSettings(box, text, undefined, demoSettings);

  /*
   * Box settings card
   */
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
  const boxSettings = new WidgetSettings(boxSettingsLayout, {
    onChange: updateBoxSettings.bind(undefined, terminal, box),
  });
  boxSettings.setConfig(boxOptions);

  document.getElementById('widgetSettings')
          .appendChild(boxSettings.getCard());

  /**
   * Settings code card
   */
  document.getElementById('settings-code-full')
    .addEventListener('change', () => updateCode(boxSettings));
  updateCode(boxSettings);
}

load()
  .then(run);
