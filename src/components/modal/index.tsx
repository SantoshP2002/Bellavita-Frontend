import { useEffect } from "react";
import type { ModalProps } from "../../types";
import useVerticalScrollable from "../../hooks/useVerticalScrollable";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BottomGradient, TopGradient } from "../Gradients";

const Modal = ({
  isOpen,
  onClose,
  children,
  containerProps,
  className = "",
  heading = "",
}: ModalProps) => {
  const { showGradient, containerRef } = useVerticalScrollable();
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      {...containerProps}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-transparent p-8 backdrop-blur-sm ${
        containerProps?.className || ""
      }`}
    >
      <div
        className={`bg-gray-200 rounded-xl shadow-lg max-h-[90vh] relative overflow-hidden dark:bg-black ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable area */}
        {showGradient.top && (
          <TopGradient className={`h-8 ${heading ? "!top-16" : ""}`} />
        )}
        <div
          ref={containerRef}
          className={`max-h-[90dvh] overflow-y-auto scroll-smooth px-6 ${
            heading ? "pb-4" : "py-6"
          }`}
        >
          {/* Sticky Header */}
          <div
            className={`z-20 ${
              heading
                ? "h-16 flex items-center justify-between sticky top-0"
                : ""
            }`}
          >
            {heading && (
              <h2 className="text-lg mt-12 lg:mt-12 sm:text-xl md:text-2xl font-semibold flex-1 text-center bg-clip-text text-black bg-black dark:text-white">
                {heading}
                <span className="mx-auto block h-[2px] w-[60%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />
              </h2>
            )}
            <IoMdCloseCircleOutline
              onClick={onClose}
              className={`w-4 h-4 sm:w-5 sm:h-5 stroke-tertiary hover:stroke-2 cursor-pointer dark:text-white ${
                !heading ? "absolute top-2.5 right-2.5" : ""
              }`}
            />
          </div>
          <div className="py-2">{children}</div>
        </div>
        {/* Content */}
        {showGradient.bottom && <BottomGradient className="h-8" />}
      </div>
    </div>
  );
};

export default Modal;
