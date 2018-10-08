import { load } from '../util/load';

import { terminalConfig, terminalOptions } from './rogueLike/terminal';
import { createUi } from './rogueLike/ui';

load(terminalOptions, { bindFocus: false })
  .then((data) => {
    terminalConfig(data);
    createUi(data.terminal);
  });
