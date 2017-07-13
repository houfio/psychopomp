export type Step<T> = {
  selector: string,
  blockInteraction?: boolean,
  payload: T
}

export type Steps<T> = Step<Partial<T>>[];

export type PsychopompData<T> = {
  steps?: Step<T>[],
  index: number,
  target?: ClientRect
}

export type PsychopompOptions = {
  backdropColor?: string,
  padding?: number,
  shadow?: string;
  borderRadius?: string,
  transition?: string
}

export type PsychopompOption<T> = {
  name: keyof PsychopompOptions,
  value: T
}
