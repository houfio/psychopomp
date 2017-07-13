import * as React from 'react';
import { render } from 'react-dom';

import { Root } from './src';

declare var module: any;

const renderRoot = (): void => {
  render(<Root />, document.getElementById('root'));
};

renderRoot();

module.hot.accept(renderRoot);
