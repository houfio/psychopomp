import * as React from 'react';
import { Component, ComponentClass, HTMLAttributes, ReactNode } from 'react';
import { animateScroll } from 'react-scroll';
import { node, any, object, func } from 'prop-types';

import {
  Overlay,
  PADDING_OPTION,
  PsychopompAction,
  PsychopompData,
  PsychopompOption,
  PsychopompOptions,
  StartAction,
  Step,
  Steps,
  StopAction,
  ToIndexAction,
  ToNextAction,
  ToPreviousAction
} from '.';

export interface PsychopompProps<T> extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  overlay: ComponentClass;
  defaultPayload: T;
  options?: PsychopompOptions;
  middleware?: (action: PsychopompAction<T>, callback: () => void) => boolean
}

export interface PsychopompState<T> {
  steps?: Step<T>[];
  index: number;
  scroll: number;
}

export class Psychopomp<T> extends Component<PsychopompProps<T>, PsychopompState<T>> {
  private lastTarget?: ClientRect = undefined;
  private debounceTimeout?: number = undefined;

  public constructor(props: PsychopompProps<T>) {
    super(props);

    this.state = {
      steps: undefined,
      index: 0,
      scroll: 0
    };

    this.getOption = this.getOption.bind(this);
  }

  public static propTypes: object = {
    children: node.isRequired,
    overlay: any.isRequired,
    defaultPayload: object.isRequired,
    options: object,
    middleware: func
  };

  public static childContextTypes: object = {
    psychopomp: object.isRequired
  };

  public getChildContext(): object {
    return {
      psychopomp: this
    };
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.onResize, false);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize, false);
  }

  private onResize = (): void => {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.debounceTimeout = undefined;
      this.forceUpdate();
    }, 250);
  };

  public componentDidUpdate(prevProps: PsychopompProps<T>, prevState: PsychopompState<T>): void {
    const { steps, index, scroll } = this.state;

    if (prevState.steps != steps || prevState.index != index) {
      animateScroll.scrollTo(steps && this.lastTarget ? this.lastTarget.top - window.innerHeight / 2 + this.lastTarget.height / 2 : scroll);
    }
  }

  public getData = (): PsychopompData<T> => {
    const { steps, index } = this.state;

    return {
      steps,
      index,
      target: this.lastTarget
    };
  };

  private getOption<T>(option: PsychopompOption<T>): T {
    const { options } = this.props;

    if (!options || !options.hasOwnProperty(option.name)) {
      return option.value;
    }

    return options[option.name] as any as T; // ¯\_(ツ)_/¯
  };

  private emitAction = (action: PsychopompAction<T>, callback: (action: PsychopompAction<T>) => void): void => {
    const { middleware } = this.props;

    if (!middleware || !middleware(action, (): void => callback(action))) {
      callback(action);
    }
  };

  public start = (steps: Steps<T>): void => {
    const { defaultPayload } = this.props;

    this.emitAction(new StartAction(this, steps.map((step: Step<T>) => {
      if (!step.payload) {
        step.payload = defaultPayload;
      } else {
        step.payload = Object.assign({}, defaultPayload, step.payload);
      }

      return step;
    }), 0), (action: StartAction<T>): void => {
      this.setState({
        steps: action.steps,
        index: action.index,
        scroll: window.pageYOffset
      });
    });
  };

  public stop = (): void => {
    const { scroll } = this.state;

    this.emitAction(new StopAction(this, scroll), (action: StopAction<T>): void => {
      this.setState({
        steps: undefined,
        scroll: action.scroll
      });
    });
  };

  public toNext = (): void => {
    const { steps, index } = this.state;

    if (steps && index < steps.length - 1) {
      this.emitAction(new ToNextAction(this, steps, index + 1), (action: ToNextAction<T>): void => {
        this.setState({
          index: action.index
        });
      });
    }
  };

  public toPrevious = (): void => {
    const { steps, index } = this.state;

    if (steps && index > 0) {
      this.emitAction(new ToPreviousAction(this, steps, index - 1), (action: ToPreviousAction<T>): void => {
        this.setState({
          index: action.index
        });
      });
    }
  };

  public toIndex = (index: number): void => {
    const { steps } = this.state;

    if (steps && steps.length > index) {
      this.emitAction(new ToIndexAction(this, steps, index), (action: ToIndexAction<T>): void => {
        this.setState({
          index: action.index
        });
      });
    }
  };

  public render(): JSX.Element {
    const { children } = this.props;
    const props = { ...this.props };

    for (let type in Psychopomp.propTypes) {
      delete props[type];
    }

    return (
      <div {...props}>
        {this.createOverlay()}
        {children}
      </div>
    );
  }

  private createOverlay = (): JSX.Element | false => {
    const { steps, index } = this.state;
    const { overlay } = this.props;

    if (!steps || !steps[index]) {
      return false;
    }

    const step: Step<T> = steps[index];
    const targetElement: Element | null = document.querySelector(step.selector);

    if (targetElement) {
      const targetRect: ClientRect = targetElement.getBoundingClientRect();
      const bodyRect: ClientRect = document.body.getBoundingClientRect();
      const offset: number = this.getOption(PADDING_OPTION);

      this.lastTarget = {
        top: targetRect.top - bodyRect.top - offset,
        left: targetRect.left - bodyRect.left - offset,
        right: bodyRect.right - targetRect.right + offset * 2,
        bottom: bodyRect.bottom - targetRect.bottom - offset * 2,
        width: targetRect.width + offset * 2,
        height: targetRect.height + offset * 2
      };
    }

    if (!this.lastTarget) {
      this.stop();

      return false;
    }

    return (
      <Overlay overlay={overlay} getOption={this.getOption}/>
    );
  };
}
