import { Terminal } from '../../src/Terminal';
import { Widget, WidgetOptions } from '../../src/Widget';
import { Box, BoxOptions } from '../../src/widgets/Box';
import { Text, TextOptions } from '../../src/widgets/Text';
import { load, LoadData } from '../util/load';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingButton } from './controls/SettingButton';
import { SettingNumber } from './controls/SettingNumber';
import { Preset, SettingsPage } from './controls/SettingsPage';
import { SettingText } from './controls/SettingText';
import { SettingTextArea } from './controls/SettingTextArea';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsSection, WidgetConfig, WidgetSettings } from './controls/WidgetSettings';

let boxWidget: Box;
let textWidget: Text;

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
  ],
};

const textControlsSection: SettingsSection = {
  rows: [
    {
      cols: [
        {
          title: 'Text controls',
          contents: [
            new SettingButton({
              text: 'Home',
              callback: () => { textWidget.setScrollLine(0); },
            }),
            ' ',
            new SettingButton({
              text: '↓',
              callback: () => { textWidget.scrollLines(1); },
            }),
            ' ',
            new SettingButton({
              text: '↑',
              callback: () => { textWidget.scrollLines(-1); },
            }),
            ' ',
            new SettingButton({
              text: 'Page Down',
              callback: () => { textWidget.scrollPages(1); },
            }),
            ' ',
            new SettingButton({
              text: 'Page Up',
              callback: () => { textWidget.scrollPages(-1); },
            }),
          ],
        },
      ],
    },
  ],
};

const widgetSettingsSection: SettingsSection = {
  title: 'Text settings',
  rows: [
    {
      title: 'Text',
      cols: [
        {
          contents: [
            new SettingTextArea({
              name: 'text',
            }),
          ],
        },
      ],
    },
    {
      cols: [
        {
          title: 'Ellipsis',
          contents: [
            new SettingText({
              name: 'ellipsis',
            }),
          ],
        },
        {
          title: 'Skip',
          contents: [
            new SettingNumber({
              name: 'skip',
              min: 0,
              step: 1,
            }),
          ],
        },
        {
          title: 'Fit Page End',
          contents: [
            new SettingBoolean({
              name: 'fitPageEnd',
            }),
          ],
        },
      ],
    },
    {
      cols: [
        {
          title: 'Typewritter Delay',
          contents: [
            new SettingNumber({
              name: 'typewritterDelay',
              min: 0,
              step: 1,
            }),
          ],
        },
        {
          title: 'Persistent Typewritter',
          contents: [
            new SettingBoolean({
              name: 'persistentTypewritter',
            }),
          ],
        },
        {
          title: 'Use tokenizer',
          contents: [
            new SettingBoolean({
              name: 'tokenizer',
            }),
          ],
        },
      ],
    },
  ],
};

const styleSettingsSection: SettingsSection = {
  title: 'Text style',
  closed: true,
  rows: [
    {
      cols: [
        {
          title: 'Font',
          contents: [
            new SettingText({ name: `textStyle.font` }),
          ],
        },
        {
          title: 'Offset X',
          contents: [
            new SettingNumber({ name: `textStyle.offsetX` }),
          ],
        },
        {
          title: 'Offset Y',
          contents: [
            new SettingNumber({ name: `textStyle.offsetY` }),
          ],
        },
      ],
    },
    {
      cols: [
        {
          title: 'FG color',
          contents: [
            new SettingText({ name: `textStyle.fg` }),
          ],
        },
        {
          title: 'BG color',
          contents: [
            new SettingText({ name: `textStyle.bg` }),
          ],
        },
      ],
    },
  ],
};

/**
 *
 */
function createPageSettings(): WidgetSettings {
  const demoSettingsLayout: SettingsLayout = {
    title: 'Demo options',
    sections: [pageSettingsSection, textControlsSection],
  };
  const demoSettings = new WidgetSettings(demoSettingsLayout);
  demoSettings.setConfig({
    showBox: true,
  });

  demoSettings.onChange = updatePageSettings;
  updatePageSettings(demoSettings);

  return demoSettings;
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

  const config = pageSettings.getConfig() as DemoConfig;

  boxWidget.setOptions(config.showBox ? visibleBox : hiddenBox);
}

/**
 *
 */
function postUpdateWidgetSettings(options: WidgetConfig) {
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
  textWidget = boxWidget.attachWidget(Text, options);

  return textWidget;
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
      styleSettingsSection,
    ],
  };

  return new WidgetSettings(boxSettingsLayout);
}

/**
 *
 */
// tslint:disable-next-line:no-any
function preUpdateWidgeSettings(options: any) {
  if (options.tokenizer) {
    options.tokenizer = Text.defaultOptions.tokenizer;
  }

  return options;
}

/**
 * List of settings presets to display
 */
const presets = (() => {
  const base = {
    col: 2,
    line: 2,
    width: 25,
    height: 5,
    ellipsis: '...',
    skip: 0,
    tokenizer: Text.defaultOptions.tokenizer,
    typewritterDelay: 0,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
        + 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. '
        + 'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. '
        + 'Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. '
        + 'Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora '
        + 'torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales '
        + 'ligula in libero. Sed dignissim lacinia nunc. ',
  };

  const res: Array<Preset<TextOptions>> = [
    {
      text: 'Default',
      options: {
        ...base,
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
    new SettingsPage<TextOptions>({
      terminal,
      presets,
      createPageSettings,
      createWidget,
      createWidgetSettings,
      postUpdateWidgetSettings,
      preUpdateWidgeSettings,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...Text.defaultOptions },
      widgetInitialSettings: preUpdateWidgeSettings(presets[0].options),
    });
  });
