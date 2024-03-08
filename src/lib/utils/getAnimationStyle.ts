import {
  ANIMATION_TYPE,
  ANIMATION_STYLE_MAP,
  MOUNT_ANIMATION_FIGURE,
  UNMOUNT_ANIMATION_FIGURE,
} from './../constants/Animation';
import { ObjValues } from '../types/ObjValues';

const getAnimationStyle = (
  animationType: ObjValues<typeof ANIMATION_TYPE>,
  animationDuration: number,
  animationTrigger: boolean,
) => {
  const animationCss = {
    [ANIMATION_STYLE_MAP[animationType]]: animationTrigger
      ? MOUNT_ANIMATION_FIGURE[animationType]
      : UNMOUNT_ANIMATION_FIGURE[animationType],
  };
  const transitionCss = {
    transition: `${animationDuration}ms`,
  };
  return Object.assign({}, animationCss, transitionCss);
};

export default getAnimationStyle;
