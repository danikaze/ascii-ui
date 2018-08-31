import { Terminal } from '../../src/Terminal';
import { Widget, WidgetOptions } from '../../src/Widget';
import { Box, BoxOptions } from '../../src/widgets/Box';
import { Input, InputOptions } from '../../src/widgets/Input';
import { LoadData, load } from '../util/load';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingNumber } from './controls/SettingNumber';
import { Preset, SettingsPage } from './controls/SettingsPage';
import { SettingText } from './controls/SettingText';
import { SettingsLayout, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

let boxWidget: Box;
let inputWidget: Input;

const visibleBox: BoxOptions = {
  col: 1,
  line: 1,
  width: 15,
  height: 3,
  title: 'Input',
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

const pageSettingsSection: SettingsSection = {
  rows: [
    {
      cols: [
      {
        contents: [
          new SettingBoolean({ name: 'showBox' }),
          ' Show test box',
        ],
      },
    ],
    },
    {
      cols: [
        {
          contents: [
            new SettingBoolean({ name: 'showText' }),
            ' Test text: ',
            new SettingText({ name: 'text' }),
          ],
        },
      ],
    },
  ],
};

const widgetSettingsSection: SettingsSection = {
  rows: [
    {
      cols: [
        {
          title: 'Max Length',
          contents: [
            new SettingNumber({ name: 'maxLength', min: 1 }),
          ],
        },
        {
          title: 'Password?',
          contents: [
            new SettingBoolean({ name: 'password' }),
          ],
        },
        {
          title: 'Password Char',
          contents: [
            new SettingText({ name: 'passwordCharacter', maxLength: 1 }),
          ],
        },
      ],
    },
  ],
};

/**
 * Create the widget to test
 */
function createWidget(terminal: Terminal, options: WidgetOptions): Widget {
  boxWidget = terminal.attachWidget(Box, visibleBox);
  inputWidget = boxWidget.attachWidget(Input, options);

  return inputWidget;
}

/**
 * Create the WidgetSettings object for the widget settings card
 */
function createWidgetSettings() {
  const boxSettingsLayout: SettingsLayout = {
    title: 'Input options',
    sections: [
      widgetSettingsSection,
    ],
  };

  return new WidgetSettings(boxSettingsLayout);
}

/**
 * Listen to changes on the Demo settings and apply it to the widgets
 */
function updatePageSettings(pageSettings: WidgetSettings) {
  interface DemoConfig {
    showBox: boolean;
    showText: boolean;
    text: string;
  }

  const config: DemoConfig = pageSettings.getConfig() as DemoConfig;

  if (config.showText) {
    inputWidget.setValue(config.text);
  } else {
    inputWidget.setValue('');
  }

  boxWidget.setOptions(config.showBox ? visibleBox : hiddenBox);
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
    showBox: true,
    showText: true,
    text: 'Input test text',
  });

  demoSettings.onChange = updatePageSettings;
  updatePageSettings(demoSettings);

  return demoSettings;
}

function postUpdateWidgetSettings() {
  boxWidget.render();
}

/**
 * List of settings presets to display
 */
const presets: Array<Preset<InputOptions>> = (() => {
  const res: Array<Preset<InputOptions>> = [
    {
      text: 'Basic text input',
      options: {
        password: false,
        passwordCharacter: '*',
        maxLength: 0,
      },
    },
    {
      text: 'Basic text input with limited length (5 chars)',
      options: {
        password: false,
        passwordCharacter: '*',
        maxLength: 5,
      },
    },
    {
      text: 'Basic password input',
      options: {
        password: true,
        passwordCharacter: '*',
        maxLength: 0,
      },
    },
    {
      text: 'Basic password input with custom character and limited length (7)',
      options: {
        password: true,
        passwordCharacter: '#',
        maxLength: 7,
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
    new SettingsPage<InputOptions>({
      terminal,
      presets,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...Input.defaultOptions },
      widgetInitialSettings: presets[0].options,
      createPageSettings,
      createWidget,
      createWidgetSettings,
      postUpdateWidgetSettings,
    });
  });
