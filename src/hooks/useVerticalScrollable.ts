import { useEffect, useRef, useState } from "react";
import type { VerticalScrollType } from "../types";

const useVerticalScrollable = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showGradient, setShowGradient] = useState<VerticalScrollType>({
    top: false,
    bottom: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const hasScroll = container.scrollHeight > container.clientHeight;
      const isAtTop = container.scrollTop <= 0;
      const isAtBottom =
        Math.ceil(container.scrollTop + container.clientHeight) >=
        container.scrollHeight;

      if (hasScroll) {
        setShowGradient({
          top: !isAtTop,
          bottom: !isAtBottom,
        });
      } else {
        setShowGradient({ top: false, bottom: false });
      }
    };

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll); // for dynamic content resize
    checkScroll();

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return { showGradient, containerRef } as const;
};

export default useVerticalScrollable;
