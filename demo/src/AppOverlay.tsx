import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { PsychopompHOCProps, Step, withPsychopomp } from '../../src';

import { StepPayload } from '.';

export const AppOverlay = withPsychopomp(class AppOverlay extends Component<PsychopompHOCProps<StepPayload>> {
  public render(): JSX.Element | false {
    const { steps, index, stop, toNext, toPrevious } = this.props;

    if (!steps) {
      return false;
    }

    const step: Step<StepPayload> = steps[index];
    const styles: { [name: string]: CSSProperties } = {
      bar: {
        display: 'flex',
        position: 'fixed',
        left: '20%',
        bottom: '32px',
        width: '60%',
        height: '128px',
        flexDirection: 'column',
        pointerEvents: 'auto',
        borderRadius: '8px',
        boxShadow: '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)',
        overflow: 'hidden',
        zIndex: 1005
      },
      top: {
        display: 'flex',
        padding: '8px',
        color: '#FFFFFF',
        backgroundColor: '#24292E'
      },
      steps: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center'
      },
      step: {
        width: '8px',
        height: '8px',
        margin: '4px',
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        transition: 'opacity .2s cubic-bezier(.455, .030, .515, .955)'
      },
      bottom: {
        flex: '1',
        padding: '8px',
        color: '#24292E',
        backgroundColor: '#FFFFFF',
        overflowY: 'scroll'
      }
    };

    return (
      <div style={styles.bar}>
        <div style={styles.top}>
          <button onClick={toPrevious} disabled={index == 0}>&lt;</button>
          <div style={styles.steps}>
            {Array.apply(undefined, new Array(steps.length)).map((value: undefined, key: number) => {
              return (
                <div key={key} style={{...styles.step, opacity: index > key ? .1 : index < key ? 1 : .5}}/>
              )
            })}
          </div>
          <button onClick={() => index == steps.length - 1 ? stop() : toNext()}
                  disabled={!step.payload.hasNext || index == steps.length - 1}>&gt;</button>
          <button onClick={stop}>x</button>
        </div>
        <div style={styles.bottom}>
          {step.payload.text}
        </div>
      </div>
    );
  }
});
