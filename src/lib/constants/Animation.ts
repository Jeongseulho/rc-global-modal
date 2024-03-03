export const ANIMATION_TYPE = {
  NONE: 'none',
  FADE: 'fade',
} as const;

export const ANIMATION_STYLE_MAP = {
  [ANIMATION_TYPE.FADE]: 'opacity',
} as const;
