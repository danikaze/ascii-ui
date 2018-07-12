import { BoxBorderOptions, BoxOptions, BoxPaddingOptions, BoxTitleOptions } from './Box';
import { GridOptions } from './Grid';
import { InputOptions } from './Input';
import { ProgressBarDirection, ProgressBarOptions } from './ProgressBar';
import { SelectOptions } from './Select';
import { TextOptions } from './Text';

export const gridDefaultOptions: GridOptions = {
  rows: undefined,
  columns: undefined,
};

export const boxBorderDefaultOptions: BoxBorderOptions = {
  fg: '#00ff00',
  topLeft: '┌',
  top: '─',
  topRight: '┐',
  left: '│',
  center: ' ',
  right: '│',
  bottomLeft: '└',
  bottom: '─',
  bottomRight: '┘',
};

export const boxTitleDefaultOptions: BoxTitleOptions = {
  fg: '#00ff00',
  marginLeft: 1,
  marginRight: 1,
  ellipsis: '...',
};

export const boxPaddingDefaultOptions: BoxPaddingOptions = {
  top: 1,
  right: 1,
  bottom: 1,
  left: 1,
};

export const boxDefaultOptions: BoxOptions = {
  padding: boxPaddingDefaultOptions,
  base: {
    boxBorders: boxBorderDefaultOptions,
    boxTitle: boxTitleDefaultOptions,
  },
  focus: {
    boxBorders: { fg: '#ffff00' },
    boxTitle: { fg: '#ffff00' },
  },
  disabled: {
    boxBorders: { fg: '#009900' },
    boxTitle: { fg: '#009900' },
  },
};

export const textDefaultOptions: TextOptions = {
  tokenizer: true,
  fitPageEnd: false,
  typewritterDelay: 0,
  persistentTypewritter: true,
};

export const inputDefaultOptions: InputOptions = {
  maxLength: 0,
  password: false,
  passwordCharacter: '*',
};

// tslint:disable-next-line:no-any
export const selectDefaultOptions: Partial<SelectOptions<any>> = {
  loop: true,
  allowUnselect: true,
  base: { fg: '#00ff00', bg: '#000000' },
  selected: { fg: '#00ff00', bg: '#009900' },
  disabled: { fg: '#009900', bg: '#000000' },
};

export const progressBarDefaultOptions: ProgressBarOptions = {
  focusable: false,
  direction: ProgressBarDirection.HORIZONTAL,
  progress: 0,
  completedStyle: { char: '', bg: '#00ff00' },
  pendingStyle: { char: '', bg: '#009900' },
  currentStyle: { char: '', bg: '#99ff99' },
  startStyle: undefined,
  endStyle: undefined,
};
