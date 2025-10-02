import { useEffect } from "react";
import type { ModalProps } from "../../types";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isOpen,
  onClose,
  children,
  containerProps,
  className = "",
  heading = "",
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      {...containerProps}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/50 p-8 backdrop-blur-sm ${
        containerProps?.className || ""
      }`}
    >
      <div
        className={`bg-gradient-to-r from-indigo-100 to-pink-100 rounded-xl shadow-[rgba(0,0,0,0.1)_0px_4px_16px,_rgba(0,0,0,0.1)_0px_8px_32px] w-full max-w-md max-h-[90vh] relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`max-h-[90dvh] overflow-y-auto scroll-smooth px-6 ${
            heading ? "pb-4" : "py-6"
          }`}
        >
          {/* Sticky Header */}
          <div
            className={`z-20 ${
              heading
                ? "border-b border-black/50 h-16 flex items-center justify-between sticky top-0 bg-gradient-to-r from-indigo-100 to-pink-100"
                : ""
            }`}
          >
            {heading && (
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex-1 text-center bg-clip-text text-transparent bg-black">
                {heading}
              </h2>
            )}
            <IoMdClose
              onClick={onClose}
              className={`w-4 h-4 sm:w-5 sm:h-5 stroke-gray-400 hover:stroke-black cursor-pointer ${
                !heading ? "absolute top-2.5 right-2.5" : ""
              }`}
            />
          </div>
          <div className="py-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
