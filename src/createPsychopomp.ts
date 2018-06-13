import { createDakpan } from 'dakpan';
import { createElement, ReactNode } from 'react';

import { Psychopomp as Component } from './Psychopomp';

export const createPsychopomp = () => {
  const { Provider, withDakpan } = createDakpan({
    index: 0,
    steps: []
  })({
    nextIndex: () => ({ index, steps }) => ({
      index: Math.min(index + 1, steps.length - 1)
    }),
    previousIndex: () => ({ index }) => ({
      index: Math.max(0, index)
    })
  });

  const Psychopomp = ({ children }: { children: ReactNode }) => createElement(
    Provider,
    null,
    createElement(withDakpan(() => ({}))(Component)),
    children
  );

  return {
    Psychopomp,
    withPsychopomp: withDakpan
  };
};
