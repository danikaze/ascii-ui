import { BoxBorderOptions, BoxTitleOptions } from './Box';

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
