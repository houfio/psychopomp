import {
  Psychopomp,
  START_ACTION,
  Step,
  Steps,
  STOP_ACTION,
  TO_INDEX_ACTION,
  TO_NEXT_ACTION,
  TO_PREVIOUS_ACTION
} from '.';

export class Action<T, A> {
  public readonly start: (steps: Steps<T>) => void;
  public readonly stop: () => void;
  public readonly toNext: () => void;
  public readonly toPrevious: () => void;
  public readonly toIndex: (index: number) => void;

  public constructor(public type: A, psychopomp: Psychopomp<T>) {
    this.start = psychopomp.start;
    this.stop = psychopomp.stop;
    this.toNext = psychopomp.toNext;
    this.toPrevious = psychopomp.toPrevious;
    this.toIndex = psychopomp.toIndex;
  }
}

export class StartAction<T> extends Action<T, typeof START_ACTION> {
  public constructor(psychopomp: Psychopomp<T>, public steps: Step<T>[], public index: number) {
    super(START_ACTION, psychopomp);
  }
}

export class StopAction<T> extends Action<T, typeof STOP_ACTION> {
  public constructor(psychopomp: Psychopomp<T>, public scroll: number) {
    super(STOP_ACTION, psychopomp);
  }
}

export class ToNextAction<T> extends Action<T, typeof TO_NEXT_ACTION> {
  public constructor(psychopomp: Psychopomp<T>, public readonly steps: Step<T>[], public index: number) {
    super(TO_NEXT_ACTION, psychopomp);
  }
}

export class ToPreviousAction<T> extends Action<T, typeof TO_PREVIOUS_ACTION> {
  public constructor(psychopomp: Psychopomp<T>, public readonly steps: Step<T>[], public index: number) {
    super(TO_PREVIOUS_ACTION, psychopomp);
  }
}

export class ToIndexAction<T> extends Action<T, typeof TO_INDEX_ACTION> {
  public constructor(psychopomp: Psychopomp<T>, public readonly steps: Step<T>[], public index: number) {
    super(TO_INDEX_ACTION, psychopomp);
  }
}

export type PsychopompAction<T> =
  StartAction<T>
  | StopAction<T>
  | ToNextAction<T>
  | ToPreviousAction<T>
  | ToIndexAction<T>;
