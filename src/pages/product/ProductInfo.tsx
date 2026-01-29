import { useState, useMemo } from "react";
import QuillContent from "../../components/quillContent";
import { FaMinus, FaPlus } from "react-icons/fa";

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
    <div
      className={`w-full mx-auto p-10 md:p-20 dark:bg-black dark:text-white ${className}`}
    >
      {sections
        .filter(({ content }) => content && content.trim() !== "")
        .map(({ title, content }, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border-b dark:border-gray-600 p-1 transition-all duration-300`}
            >
              {/* Accordion Header */}
              <button
                className={`w-full flex justify-between items-center py-4 transition-all duration-300 ease-in-out
                    ${isOpen ? "text-black" : "text-gray-700 hover:text-black"}
  `}
                onClick={() => toggleDropdown(index)}
              >
                <span className="uppercase text-xl font-medium hover:cursor-pointer dark:text-gray-300">
                  {title}
                </span>
                {isOpen ? (
                  <FaMinus className="text-lg" />
                ) : (
                  <FaPlus className="text-lg" />
                )}
              </button>

              {/* Section  Body */}
              <div
                className={`overflow-hidden transition-all duration-800 ease-in-out
                      ${
                        isOpen
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
              >
                <QuillContent
                  content={content || ""}
                  className=" dark:text-gray-300 text-sm leading-relaxed
               prose prose-sm max-w-none"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductInfo;
