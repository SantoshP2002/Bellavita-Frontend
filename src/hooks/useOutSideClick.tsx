import { useEffect, useRef } from "react";

type UseOutsideClickOptions = {
  enabled?: boolean;
};

const useOutsideClick = <T extends HTMLElement>(
  callback: (event: MouseEvent | TouchEvent | PointerEvent) => void,
  options: UseOutsideClickOptions = { enabled: true }
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!options.enabled) return;

    const handleClickOutside = (
      event: MouseEvent | TouchEvent | PointerEvent
    ) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside, true);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
    };
  }, [callback, options.enabled]);

  return ref;
};

export default useOutsideClick;
