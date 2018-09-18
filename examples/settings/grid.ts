import { Terminal } from '../../src/Terminal';
import { Widget, WidgetOptions } from '../../src/Widget';
import { Box } from '../../src/widgets/Box';
import { Grid, GridOptions } from '../../src/widgets/Grid';
import { LoadData, load } from '../util/load';

import { SettingBoolean } from './controls/SettingBoolean';
import { SettingButton } from './controls/SettingButton';
import { SettingNumber } from './controls/SettingNumber';
import { SettingsPage } from './controls/SettingsPage';
import { SettingText } from './controls/SettingText';
import { basicSection } from './controls/widgetBasicSection';
import { SettingsLayout, SettingsRow, SettingsSection, WidgetSettings } from './controls/WidgetSettings';

let page: SettingsPage<GridOptions>;
let pageTerminal: Terminal;
let pageSettings: WidgetSettings;
let pageSettingRows: SettingsRow[] = [];
let pageSettingsRowId = 1;
let widgetSettings: WidgetSettings;

const pageSettingsLayout: SettingsLayout = {
  title: 'Demo options',
  sections: [{
    rows: pageSettingRows,
  }],
};

const gridSettingsSection: SettingsSection = {
  rows: [
    {
      cols: [
        {
          title: 'Columns',
          contents: [
            new SettingNumber({ name: 'columns', min: 1 }),
          ],
        },
        {
          title: 'Rows',
          contents: [
            new SettingNumber({ name: 'rows', min: 1 }),
          ],
        },
        {
          title: 'Full Size',
          contents: [
            new SettingBoolean({ name: 'fullSize' }),
          ],
        },
        {
          title: 'Borders',
          contents: [
            new SettingBoolean({ name: 'borders' }),
          ],
        },
      ],
    },
  ],
};

const borderStyleSettingsSection: SettingsSection = {
  title: 'Border Style',
  closed: true,
  rows: [
    {
      cols: [
        {
          title: 'Font',
          contents: [
            new SettingText({ name: `borderStyle.font` }),
          ],
        },
        {
          title: 'Offset X',
          contents: [
            new SettingNumber({ name: `borderStyle.offsetX` }),
          ],
        },
        {
          title: 'Offset Y',
          contents: [
            new SettingNumber({ name: `borderStyle.offsetY` }),
          ],
        },
      ],
    },
    {
      cols: [
        {
          title: 'FG color',
          contents: [
            new SettingText({ name: `borderStyle.fg` }),
          ],
        },
        {
          title: 'BG color',
          contents: [
            new SettingText({ name: `borderStyle.bg` }),
          ],
        },
      ],
    },
    {
      title: 'Borders Characters',
      cols: [
        {
          contents: [
            new SettingText({ name: `borderStyle.topLeft`, maxLength: 1 }),
            new SettingText({ name: `borderStyle.top`, maxLength: 1 }),
            new SettingText({ name: `borderStyle.topRight`, maxLength: 1 }),
            ' 　 ',
            new SettingText({ disabled: true, maxLength: 1, style: { border: '0' } }),
            new SettingText({ name: `borderStyle.noTop`, maxLength: 1 }),
            new SettingText({ disabled: true, maxLength: 1, style: { border: '0' } }),
          ],
        },
      ],
    },
    {
      cols: [
        {
          contents: [
            new SettingText({ name: `borderStyle.left`, maxLength: 1 }),
            new SettingText({ disabled: true, maxLength: 1, style: { border: '0' } }),
            new SettingText({ name: `borderStyle.right`, maxLength: 1 }),
            ' 　 ',
            new SettingText({ name: `borderStyle.noRight`, maxLength: 1 }),
            new SettingText({ name: `borderStyle.cross`, maxLength: 1 }),
            new SettingText({ name: `borderStyle.noLeft`, maxLength: 1 }),
          ],
        },
      ],
    },
    {
      cols: [
        {
          contents: [
            new SettingText({ name: `borderStyle.bottomLeft`, maxLength: 1 }),
            new SettingText({ name: `borderStyle.bottom`, maxLength: 1 }),
            new SettingText({ name: `borderStyle.bottomRight`, maxLength: 1 }),
            ' 　 ',
            new SettingText({ disabled: true, maxLength: 1, style: { border: '0' } }),
            new SettingText({ name: `borderStyle.noBottom`, maxLength: 1 }),
            new SettingText({ disabled: true, maxLength: 1, style: { border: '0' } }),
          ],
        },
      ],
    },
  ],
};

/**
 * Get a SettingRow for the Page Widget Settings box
 */
function getWidgetSettingsRow(): SettingsRow {
  function removeRow() {
    pageSettingRows = pageSettingRows.filter((item) => item.id !== id);
    pageSettingsLayout.sections[0].rows = pageSettingRows;
    pageSettings.setSections(pageSettingsLayout.sections);
    updatePageSettings(pageSettings);
  }

  const n = pageSettingsRowId++;
  const id = `pageSettingsRow${n}`;
  const row: SettingsRow = {
    id,
    cols: [
      {
        contents: [
          'Column: ',
          new SettingNumber({ name: `col-${n}`, min: 0 }),
        ],
      },
      {
        contents: [
          'Row: ',
          new SettingNumber({ name: `line-${n}`, min: 0 }),
        ],
      },
      {
        contents: [
          'Width: ',
          new SettingNumber({ name: `width-${n}`, min: 1 }),
        ],
      },
      {
        contents: [
          'Height: ',
          new SettingNumber({ name: `height-${n}`, min: 1 }),
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

function addBox(): void {
  const newRow = getWidgetSettingsRow();
  pageSettingRows.push(newRow);
  pageSettings.setSections(pageSettingsLayout.sections);
}

/**
 * Create the widget to test
 */
function createWidget(terminal: Terminal, options: WidgetOptions): Widget {
  const gridWidget = terminal.attachWidget(Grid, options);

  return gridWidget;
}

/**
 * Create the WidgetSettings object for the widget settings card
 */
function createWidgetSettings() {
  const settingsLayout: SettingsLayout = {
    title: 'Grid options',
    sections: [
      basicSection,
      gridSettingsSection,
      borderStyleSettingsSection,
    ],
  };

  widgetSettings = new WidgetSettings(settingsLayout);

  return widgetSettings;
}

/**
 * Listen to changes on the Demo settings and apply it to the widgets
 */
function updatePageSettings(pSettings: WidgetSettings) {
  interface DemoConfig {
    show: boolean;
    text: string;
  }

  if (!page) {
    return;
  }

  const config: DemoConfig = pSettings.getConfig(['']) as DemoConfig;

  /*
   * Transform the config object into an array of configs
   */
  const boxes = {};
  const MATCH_PROP = 1;
  const MATCH_ID = 2;
  Object.keys(config)
    .forEach((key) => {
      const match = /([^-]+)-([0-9]+)/.exec(key);
      if (!boxes[match[MATCH_ID]]) {
        boxes[match[MATCH_ID]] = {};
      }
      boxes[match[MATCH_ID]][match[MATCH_PROP]] = config[key];
    });

  /*
   * Reset the grid
   */
  const widgetOptions: GridOptions = widgetSettings.getConfig(['']) as GridOptions;
  const gridWidget: Grid = createWidget(pageTerminal, widgetOptions) as Grid;
  page.updateWidget(gridWidget, widgetOptions);

  /*
   * Create boxes in the grid
   */
  Object.keys(boxes)
    .forEach((key) => {
      const boxConfig = boxes[key];
      if (boxConfig.col === undefined || boxConfig.line === undefined
        || boxConfig.width === undefined || boxConfig.height === undefined) {
        return;
      }

      gridWidget.attachWidget(
        boxConfig.col,
        boxConfig.line,
        boxConfig.width,
        boxConfig.height,
        Box,
        { title: key },
      );
    });
}

/**
 *
 */
function createPageSettings(): WidgetSettings {
  pageSettings = new WidgetSettings(pageSettingsLayout, {
    button: {
      text: 'Add new widget',
      callback: addBox,
    },
  });

  pageSettings.onChange = updatePageSettings;
  updatePageSettings(pageSettings);

  return pageSettings;
}

/**
 *
 */
function filterCode(code: GridOptions): GridOptions {
  if (code.fullSize) {
    delete code.width;
    delete code.height;
  }

  return code;
}

function preUpdateWidgeSettings(): boolean {
  updatePageSettings(pageSettings);

  return false;
}

const widgetInitialSettings = {
  ...Widget.defaultOptions,
  ...Grid.defaultOptions,
  col: 1,
  line: 1,
  width: 40,
  height: 20,
  rows: 4,
  columns: 4,
  fullSize: true,
};

/*
 * Execution
 */
load()
  .then(({ terminal }: LoadData) => {
    pageTerminal = terminal;
    page = new SettingsPage<GridOptions>({
      terminal,
      widgetDefaultSettings: { ...Widget.defaultOptions, ...Grid.defaultOptions },
      widgetInitialSettings,
      createPageSettings,
      createWidget,
      createWidgetSettings,
      filterCode,
      preUpdateWidgeSettings,
    });
  });
