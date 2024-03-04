// TODO: 애니메이션 종류 추가
export const ANIMATION_TYPE = {
  FADE: 'fade',
  SLIDE_UP: 'slideUp',
} as const;

/**
 * @description
 * 애니메이션 타입에 따른 css 속성
 */
export const ANIMATION_STYLE_MAP = {
  [ANIMATION_TYPE.FADE]: 'opacity',
  [ANIMATION_TYPE.SLIDE_UP]: 'transform',
} as const;

/**
 * @description
 * animationTrigger가 true가 되었을 때(마운트 시에), 목표하는 애니메이션 값
 */
export const MOUNT_ANIMATION_FIGURE = {
  [ANIMATION_TYPE.FADE]: 1,
  [ANIMATION_TYPE.SLIDE_UP]: 'translateY(0)',
} as const;

/**
 * @description
 * animationTrigger가 false가 되었을 때(언마운트 시에), 목표하는 애니메이션 값
 */
export const UNMOUNT_ANIMATION_FIGURE = {
  [ANIMATION_TYPE.FADE]: 0,
  [ANIMATION_TYPE.SLIDE_UP]: 'translateY(100%)',
} as const;
