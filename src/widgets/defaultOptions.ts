import { BoxBorderOptions, BoxOptions, BoxPaddingOptions, BoxTitleOptions } from './Box';

export const boxBorderDefaultOptions: BoxBorderOptions = {
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
  boxBorders: boxBorderDefaultOptions,
  boxTitle: boxTitleDefaultOptions,
  padding: boxPaddingDefaultOptions,
};
