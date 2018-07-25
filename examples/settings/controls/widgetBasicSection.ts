import { SettingBoolean } from './SettingBoolean';
import { SettingNumber } from './SettingNumber';
import { SettingsSection } from './WidgetSettings';

export const basicSection: SettingsSection = {
  title: 'Basic widget settings',
  rows: [
    {
      cols: [
        {
          title: 'Position',
          contents: [
            new SettingNumber({
              name: 'col',
              min: 0,
              step: 1,
            }),
            ' : ',
            new SettingNumber({
              name: 'line',
              min: 0,
              step: 1,
            }),
          ],
        },
        {
          title: 'Size',
          contents: [
            new SettingNumber({
              name: 'width',
              min: 0,
              step: 1,
            }),
            ' x ',
            new SettingNumber({
              name: 'height',
              min: 0,
              step: 1,
            }),
          ],
        },
        {
          title: 'Focusable',
          contents: [
            new SettingBoolean({
              name: 'focusable',
            }),
          ],
        },
      ],
    },
  ],
};
