import * as React from 'react';
import { Component } from 'react';
import { Psychopomp, PsychopompAction, PsychopompOptions, START_ACTION, STOP_ACTION } from '../../src';

import { AppOverlay, Demo, StepPayload } from '.';

export class Root extends Component {
  public render(): JSX.Element {
    const defaultPayload: StepPayload = {
      hasNext: true,
      text: ''
    };

    const options: PsychopompOptions = {
      borderRadius: '8px'
    };

    const middleware = (action: PsychopompAction<StepPayload>, callback: () => void): boolean => {
      switch (action.type) {
        case START_ACTION:
          console.log('starting tour with ' + action.steps.length + ' step(s) over 500 ms');

          setTimeout(callback, 500);

          return true;
        case STOP_ACTION:
          console.log('you can never stop!');

          return true;
      }

      return false;
    };

    return (
      <Psychopomp overlay={AppOverlay} defaultPayload={defaultPayload} options={options} middleware={middleware} className="demo">
        <Demo/>
      </Psychopomp>
    );
  }
}
