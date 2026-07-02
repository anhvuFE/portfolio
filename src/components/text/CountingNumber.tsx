import * as React from "react";
import { useMotionValue, useSpring, type SpringOptions } from "motion/react";
import { useIsInView, type UseIsInViewOptions } from "../../hooks/useIsInView";

/**
 * Ported from Animate UI's Counting Number
 * (https://animate-ui.com/docs/texts/counting-number). Spring-animates from
 * `fromNumber` up to `number`, optionally starting only once scrolled into view.
 */
type CountingNumberProps = Omit<React.ComponentProps<"span">, "children"> & {
  ref?: React.Ref<HTMLSpanElement>;
  number: number;
  fromNumber?: number;
  decimalPlaces?: number;
  decimalSeparator?: string;
  transition?: SpringOptions;
  delay?: number;
} & UseIsInViewOptions;

function CountingNumber({
  ref,
  number,
  fromNumber = 0,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  decimalSeparator = ".",
  transition = { stiffness: 90, damping: 50 },
  decimalPlaces = 0,
  delay = 0,
  ...props
}: CountingNumberProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLSpanElement>,
    { inView, inViewOnce, inViewMargin }
  );

  const numberStr = number.toString();
  const decimals =
    typeof decimalPlaces === "number"
      ? decimalPlaces
      : numberStr.includes(".")
      ? numberStr.split(".")[1]?.length ?? 0
      : 0;

  const motionVal = useMotionValue(fromNumber);
  const springVal = useSpring(motionVal, transition);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isInView) motionVal.set(number);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [isInView, number, motionVal, delay]);

  React.useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (!localRef.current) return;
      let formatted =
        decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
      if (decimals > 0) formatted = formatted.replace(".", decimalSeparator);
      localRef.current.textContent = formatted;
    });
    return () => unsubscribe();
  }, [springVal, decimals, decimalSeparator, localRef]);

  const initialText =
    decimals > 0 ? "0" + decimalSeparator + "0".repeat(decimals) : "0";

  return (
    <span ref={localRef} data-slot="counting-number" {...props}>
      {initialText}
    </span>
  );
}

export { CountingNumber, type CountingNumberProps };
