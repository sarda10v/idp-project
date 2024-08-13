import { useState, useRef, useEffect } from "react";
import { ITooltipProps, Tooltip as AdmiralTooltip } from "@admiral-ds/react-ui";

interface IUseTooltipProps extends Omit<ITooltipProps, "targetRef"> {}

export const useTooltip = (props: IUseTooltipProps) => {
  const tooltipTargetRef = useRef<any>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const show = () => {
    setTooltipVisible(true);
  };

  const hide = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    // взято из примера в сторибуке адмирала как есть
    const handleMouseEnter = () => {
      show();
    };

    const handleMouseLeave = () => {
      hide();
    };

    const handleClick = () => {
      hide();
    };

    const targetElement = tooltipTargetRef.current;

    if (targetElement) {
      targetElement.addEventListener("click", handleClick);
      targetElement.addEventListener("mouseenter", handleMouseEnter);
      targetElement.addEventListener("focus", handleMouseEnter);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
      targetElement.addEventListener("blur", handleMouseLeave);

      return () => {
        targetElement.removeEventListener("click", handleClick);
        targetElement.removeEventListener("mouseenter", handleMouseEnter);
        targetElement.removeEventListener("focus", handleMouseEnter);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
        targetElement.removeEventListener("blur", handleMouseLeave);
      };
    }
  }, [tooltipTargetRef.current, setTooltipVisible]);

  const Tooltip = () =>
    tooltipVisible && (
      <AdmiralTooltip
        targetRef={tooltipTargetRef}
        tooltipPosition="bottom"
        {...props}
      />
    );

  return {
    Tooltip,
    tooltipTargetRef,
    show,
    hide,
  };
};
