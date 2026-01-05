import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import QuillContent from "../../components/quillContent";

interface ProductInfoProps {
  product: {
    description?: string;
    ingredients?: string;
    howToUse?: string;
    keyBenefits?: string;
    otherInformation?: string;
  };
  className?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sections = useMemo(() => {
    return [
      {
        title: "Description",
        content: product?.description,
      },

      {
        title: "How To Use",
        content: product?.howToUse,
      },
      {
        title: "Ingredients",
        content: product?.ingredients,
      },
      {
        title: "Key Benefits",
        content: product?.keyBenefits,
      },
      {
        title: "Other Information",
        content: product?.otherInformation,
      },
    ];
  }, [product]);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`w-full mx-auto mt-6 p-10 md:p-20 ${className}`}>
      {sections
        .filter(({ content }) => content && content.trim() !== "")
        .map(({ title, content }, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border-b border-gray-300 p-1 transition-all duration-300`}
            >
              {/* Accordion Header */}
              <button
                className="w-full flex justify-between items-center text-left py-4 font-semibold text-black hover:text-gray-600"
                onClick={() => toggleDropdown(index)}
              >
                <span className="uppercase text-xl font-medium">{title}</span>
                {isOpen ? (
                  <IoIosArrowUp className="text-lg" />
                ) : (
                  <IoIosArrowDown
                    className="text-lg"
                    children={<QuillContent content={content || ""} />}
                  />
                )}
              </button>

              {/* Animated Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
                      opacity: { duration: 0.3, delay: 0.05 },
                    }}
                    className="overflow-hidden px-2 pb-4 text-gray-700 text-sm leading-relaxed shadow-sm"
                  >
                    <QuillContent content={content || ""} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
    </div>
  );
};

export default ProductInfo;
