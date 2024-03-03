import { useEffect, useState } from 'react';
/**
 *
 * @param mountCondition 모달이 열리거나 닫히는 조건
 * @returns { Object }
 * @property { boolean } shouldMount - 언마운트인 경우 애니메이션이 끝난 후 언마운트 되도록 하기 위한 조건
 * @property { boolean } animationTrigger - false에서 true로 변경될 때 마운트 애니메이션 트리거, true에서 false로 변경될 때 언마운트 애니메이션 트리거
 * @property { () => void } onTransitionEnd - transition이 끝나면 호출되는 함수, 언마운트 애니메이션 이후에 isComplete를 false로 변경
 * @description
 * 마운트, 언마운트에 transition를 이용한 애니메이션 효과를 주기 위한 훅
 */
export const useAnimation = (mountCondition: boolean) => {
  /**
   * @var isAnimating
   * @description
   * 마운트 조건이 true가 된 시점 ~ 언마운트 애니메이션이 끝나기 전(animating 사이클 진행 중) : true
   * 언마운트 애니메이션이 끝난 후 ~ 마운트 조건이 false인 상태(animating 사이클 종료) : false
   * 마운트 조건이 true일 때 animationTrigger를 바로 true로 변경하지 않고 마운트 된 이후에 true로 변경하기 위해 false로 유지
   * 마운트 조건이 false일 때 shouldMount를 바로 false로 변경하지 않고 애니메이션이 끝난 후에 false로 변경하기 위해 true로 유지
   */
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (mountCondition) setIsAnimating(true);
  }, [mountCondition]);

  const shouldMount = mountCondition || isAnimating;
  const animationTrigger = mountCondition && isAnimating;

  const onTransitionEnd = () => {
    if (!mountCondition) setIsAnimating(false);
  };
  return {
    shouldMount,
    animationTrigger,
    onTransitionEnd,
  };
};
