import { mount } from 'enzyme';
import * as React from 'react';

import { createPsychopomp } from './createPsychopomp';

it('does stuff', () => {
  const { Psychopomp } = createPsychopomp();

  const wrapper = mount(
    <Psychopomp>
      <span>Test</span>
    </Psychopomp>
  );

  expect(wrapper).toMatchSnapshot();
});
