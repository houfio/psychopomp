import * as React from 'react';
import { Component, ComponentClass, CSSProperties } from 'react';

import { BACKDROP_COLOR_OPTION, BORDER_RADIUS_OPTION, PsychopompHOCProps, PsychopompOption, SHADOW_OPTION, TRANSITION_OPTION } from '.';
import { withPsychopomp } from './withPsychopomp'; // Getting an exception when imported from `.`

export interface OverlayProps<T> extends PsychopompHOCProps<T> {
  overlay: ComponentClass;
  getOption: <T>(option: PsychopompOption<T>) => T
}

export interface OverlayState {
  overHighlight: boolean;
}

export const Overlay = withPsychopomp(class Overlay<T> extends Component<OverlayProps<T>, OverlayState> {
  public constructor(props: OverlayProps<T>) {
    super(props);

    this.state = {
      overHighlight: false
    };
  }

  public componentDidMount(): void {
    document.addEventListener('mousemove', this.onMouseMove, false);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousemove', this.onMouseMove, false);
  }

  private onMouseMove = (event: MouseEvent): void => {
    const { target, steps, index } = this.props;

    if (!target || !steps) {
      return;
    }

    const inWidth: boolean = (event.pageX >= target.left && event.pageX <= target.left + target.width);
    const inHeight: boolean = (event.pageY >= target.top && event.pageY <= target.top + target.height);
    const overHighlight: boolean = inWidth && inHeight && !steps[index].blockInteraction;

    if (overHighlight != this.state.overHighlight) {
      this.setState({ overHighlight });
    }
  };

  public render(): JSX.Element | false {
    const { target, steps, overlay: Overlay, getOption } = this.props;
    const { overHighlight } = this.state;

    if (!target || !steps) {
      return false;
    }

    const styles: { [name: string]: CSSProperties } = {
      overlay: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        height: document.body.scrollHeight,
        pointerEvents: overHighlight ? 'none' : 'auto',
        userSelect: overHighlight ? 'inherit' : 'none',
        cursor: overHighlight ? 'inherit' : 'default',
        zIndex: 1000
      },
      highlight: {
        position: 'absolute',
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        boxShadow: '0 0 0 9999px ' + getOption(BACKDROP_COLOR_OPTION) + ', ' + getOption(SHADOW_OPTION),
        borderRadius: getOption(BORDER_RADIUS_OPTION),
        transition: 'all ' + getOption(TRANSITION_OPTION)
      }
    };

    return (
      <div style={styles.overlay}>
        <div style={styles.highlight}/>
        <Overlay/>
      </div>
    );
  }
});
