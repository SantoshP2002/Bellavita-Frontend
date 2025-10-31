// import { useState } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import Dropdown from "../../components/dropDown/children/DropDown";
// import QuillContent from "../../components/quillContent";

// interface ProductInfoProps {
//   product: {
//     description?: string;
//     ingredients?: string;
//     usage?: string;
//     benefits?: string;
//     brandInfo?: string;
//   };
// }

// const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleDropdown = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const sections = [
//     {
//       title: "KEY BENEFITS",
//       content: product?.description || "No description available.",
//     },
//     {
//       title: "HOW TO USE",
//       content:
//         product?.ingredients ||
//         "Crafted with premium natural ingredients and essential oils.",
//     },
//     {
//       title: "PERFUME NOTES",
//       content:
//         product?.usage ||
//         "Spray on pulse points such as wrists, neck, and behind ears for a long-lasting fragrance.",
//     },
//     {
//       title: "BENEFITS",
//       content:
//         product?.benefits ||
//         "Long-lasting fragrance, skin-friendly formula, and IFRA-certified ingredients.",
//     },
//     {
//       title: "OTHER INFORMATION",
//       content:
//         product?.brandInfo ||
//         "Bella Vita Organic is an Indian brand focused on natural, sustainable, and premium beauty solutions.",
//     },
//   ];

//   return (
//     <div className="w-full p-10 mx-auto mt-4">
//       {sections.map(({ title, content }, index) => (
//         <div
//           key={index}
//           className="border-b border-gray-300 p-6 transition-all duration-300"
//         >
//           <button
//             className="w-full flex justify-between items-center font-medium text-left text-sm sm:text-xl hover:text-gray-600"
//             onClick={() => toggleDropdown(index)}
//           >
//             {title}
//             {openIndex === index ? (
//               <IoIosArrowUp className="text-lg" />
//             ) : (
//               <IoIosArrowDown className="text-lg" />
//             )}
//           </button>

//           {/* Dropdown Content */}
//           {openIndex === index && (
//             <Dropdown
//               key={index}
//               title={title}
//               className={`[&>div>button]:py-5 [&>button]:sticky [&>button]:top-16 ${
//                 index === 0
//                   ? "border-y border-y-primary-30"
//                   : "border-b border-b-primary-30"
//               }`}
//             >
//               <QuillContent content={content || ""} />
//             </Dropdown>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductInfo;

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import QuillContent from "../../components/quillContent";

interface ProductInfoProps {
  product: {
    description?: string;
    ingredients?: string;
    usage?: string;
    benefits?: string;
    brandInfo?: string;
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
        content: product?.usage,
      },
      {
        title: "Ingredients",
        content: product?.ingredients,
      },
      {
        title: "Key Benefits",
        content: product?.benefits,
      },
      {
        title: "Other Information",
        content: product?.brandInfo,
      },
    ];
  }, [product]);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`w-full mx-auto mt-6 p-10 ${className}`}>
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
                <span className="uppercase text-xl font-light">{title}</span>
                {isOpen ? (
                  <IoIosArrowUp className="text-lg" />
                ) : (
                  <IoIosArrowDown className="text-lg" />
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
