import * as React from "react";
import { useInView, type UseInViewOptions } from "motion/react";

/**
 * Ported from Animate UI (https://animate-ui.com). Wraps motion's `useInView`
 * and forwards a local ref, so a component can either animate immediately
 * (`inView` false) or wait until it scrolls into view (`inView` true).
 */
export interface UseIsInViewOptions {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
}

export function useIsInView<T extends HTMLElement = HTMLElement>(
  ref: React.Ref<T>,
  options: UseIsInViewOptions = {}
) {
  const { inView, inViewOnce = false, inViewMargin = "0px" } = options;
  const localRef = React.useRef<T>(null);
  React.useImperativeHandle(ref, () => localRef.current as T);
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;
  return { ref: localRef, isInView };
}
