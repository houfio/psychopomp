import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { PsychopompHOCProps, Steps, withPsychopomp } from '../../src';

import { StepPayload } from '.';

export const Demo = withPsychopomp(class Demo extends Component<PsychopompHOCProps<StepPayload>> {
  private steps: Steps<StepPayload> = [
    {
      selector: '#first #inner',
      payload: {
        text: 'step 1'
      }
    },
    {
      selector: '#second button',
      payload: {
        text: 'step 2',
        hasNext: false
      }
    },
    {
      selector: '#missingno',
      payload: {
        text: 'step 2.5?'
      }
    },
    {
      selector: '#third span',
      payload: {
        text: 'step 3'
      }
    },
    {
      selector: '#fourth #inner',
      blockInteraction: true,
      payload: {
        text: 'step 4'
      }
    }
  ];

  public render(): JSX.Element {
    const { start, toNext } = this.props;

    const styles: { [name: string]: CSSProperties } = {
      container: {
        position: 'relative',
        width: '80%',
        margin: 'auto'
      },
      image: {
        width: '100%',
        verticalAlign: 'middle'
      },
      heading: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      },
      hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#36B04A',
        color: '#007BB7'
      },
      start: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        height: '3rem',
        padding: '0 2rem',
        color: 'white',
        backgroundColor: '#007BB7',
        border: 'none',
        borderRadius: '2rem',
        cursor: 'pointer'
      },
      section: {
        height: '100vh',
        padding: '2rem 0',
        color: 'white',
        backgroundColor: '#36B04A'
      },
      sectionInverse: {
        backgroundColor: '#007BB7'
      },
      sectionInner: {
        marginTop: '2rem'
      }
    };

    return (
      <div>
        <div style={styles.hero}>
          <a id="start" style={styles.start} onClick={() => start(this.steps)}>START DEMO</a>
        </div>
        <div id="first" style={{ ...styles.section, ...styles.sectionInverse }}>
          <div style={styles.container}>
            <span style={styles.heading}>Section 1</span>
            <div id="inner" style={styles.sectionInner}>
              <img style={styles.image} src="https://via.placeholder.com/2400x600/FFFFFF/24292E" alt=""/>
            </div>
          </div>
        </div>
        <div id="second" style={styles.section}>
          <div style={styles.container}>
            <span style={styles.heading}>Section 2</span>
            <div>
              <button style={styles.start} onClick={toNext}>Next</button>
            </div>
          </div>
        </div>
        <div id="third" style={{ ...styles.section, ...styles.sectionInverse }}>
          <div style={styles.container}>
            <span style={styles.heading}>Section 3</span>
          </div>
        </div>
        <div id="fourth" style={styles.section}>
          <div id="inner" style={styles.container}>
            <span style={styles.heading}>Section 4</span>
            <div style={styles.sectionInner}>
              All of the blocked content!
              <img style={styles.image} src="https://via.placeholder.com/2400x600/FFFFFF/24292E" alt=""/>
              Wooo
            </div>
          </div>
        </div>
      </div>
    );
  }
});
