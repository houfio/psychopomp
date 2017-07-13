import { PsychopompOption } from '.';

export const BACKDROP_COLOR_OPTION: PsychopompOption<string> = {
  name: 'backdropColor',
  value: 'rgba(0, 0, 0, .6)'
};
export const PADDING_OPTION: PsychopompOption<number> = {
  name: 'padding',
  value: 8
};
export const SHADOW_OPTION: PsychopompOption<string> = {
  name: 'shadow',
  value: '0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)'
};
export const BORDER_RADIUS_OPTION: PsychopompOption<string> = {
  name: 'borderRadius',
  value: '3px'
};
export const TRANSITION_OPTION: PsychopompOption<string> = {
  name: 'transition',
  value: '1s cubic-bezier(0.455, .030, .515, .955)'
};

export const START_ACTION = 'START_ACTION';
export const STOP_ACTION = 'STOP_ACTION';
export const TO_NEXT_ACTION = 'TO_NEXT_ACTION';
export const TO_PREVIOUS_ACTION = 'TO_PREVIOUS_ACTION';
export const TO_INDEX_ACTION = 'TO_INDEX_ACTION';
