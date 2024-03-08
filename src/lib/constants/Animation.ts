// TODO: 애니메이션 종류 추가
export const ANIMATION_TYPE = {
  FADE: 'fade',
  SLIDE_UP: 'slideUp',
  SLIDE_DOWN: 'slideDown',
  SLIDE_LEFT: 'slideLeft',
  SLIDE_RIGHT: 'slideRight',
  ZOOM: 'zoom',
} as const;

/**
 * @description
 * 애니메이션 타입에 따른 css 속성
 */
export const ANIMATION_STYLE_MAP = {
  [ANIMATION_TYPE.FADE]: 'opacity',
  [ANIMATION_TYPE.SLIDE_UP]: 'transform',
  [ANIMATION_TYPE.SLIDE_DOWN]: 'transform',
  [ANIMATION_TYPE.SLIDE_LEFT]: 'transform',
  [ANIMATION_TYPE.SLIDE_RIGHT]: 'transform',
  [ANIMATION_TYPE.ZOOM]: 'transform',
} as const;

/**
 * @description
 * animationTrigger가 true가 되었을 때(마운트 시에), 목표하는 애니메이션 값
 */
export const MOUNT_ANIMATION_FIGURE = {
  [ANIMATION_TYPE.FADE]: 1,
  [ANIMATION_TYPE.SLIDE_UP]: 'translateY(0)',
  [ANIMATION_TYPE.SLIDE_DOWN]: 'translateY(0)',
  [ANIMATION_TYPE.SLIDE_LEFT]: 'translateX(0)',
  [ANIMATION_TYPE.SLIDE_RIGHT]: 'translateX(0)',
  [ANIMATION_TYPE.ZOOM]: 'scale(1)',
} as const;

/**
 * @description
 * animationTrigger가 false가 되었을 때(언마운트 시에), 목표하는 애니메이션 값
 */
export const UNMOUNT_ANIMATION_FIGURE = {
  [ANIMATION_TYPE.FADE]: 0,
  [ANIMATION_TYPE.SLIDE_UP]: 'translateY(100%)',
  [ANIMATION_TYPE.SLIDE_DOWN]: 'translateY(-100%)',
  [ANIMATION_TYPE.SLIDE_LEFT]: 'translateX(100%)',
  [ANIMATION_TYPE.SLIDE_RIGHT]: 'translateX(-100%)',
  [ANIMATION_TYPE.ZOOM]: 'scale(0)',
} as const;
