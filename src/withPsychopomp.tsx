import * as React from 'react';
import { Component } from 'react';
import { object } from 'prop-types';

import { PsychopompData, Step, Steps } from '.';

export interface PsychopompHOCProps<T> {
  steps?: Step<T>[];
  index: number;
  target?: ClientRect;
  start: (steps: Steps<T>) => void
  stop: () => void;
  toNext: () => void;
  toPrevious: () => void;
  toIndex: (to: number) => void;
}

export const withPsychopomp = <T, P extends PsychopompHOCProps<T>, S>(WrappedComponent: new (props?: P, context?: any) => Component<P, S>): new () => Component<Partial<P>, S> => {
  return class PsychopompHOC extends Component<P, S> {
    public static contextTypes: object = {
      psychopomp: object.isRequired
    };

    public static displayName: string = 'withPsychopomp(' + WrappedComponent.name + ')';

    public render(): JSX.Element {
      const { psychopomp } = this.context;

      const data: PsychopompData<T> = psychopomp.getData();

      return (
        <WrappedComponent
          steps={data.steps}
          index={data.index}
          target={data.target}
          start={psychopomp.start}
          stop={psychopomp.stop}
          toNext={psychopomp.toNext}
          toPrevious={psychopomp.toPrevious}
          toIndex={psychopomp.toIndex}
          {...this.props} />
      );
    }
  };
};
