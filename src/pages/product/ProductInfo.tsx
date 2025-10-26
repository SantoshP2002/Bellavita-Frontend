import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface ProductInfoProps {
  product: {
    description?: string;
    ingredients?: string;
    usage?: string;
    benefits?: string;
    brandInfo?: string;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "KEY BENEFITS",
      content: product?.description || "No description available.",
    },
    {
      title: "HOW TO USE",
      content:
        product?.ingredients ||
        "Crafted with premium natural ingredients and essential oils.",
    },
    {
      title: "PERFUME NOTES",
      content:
        product?.usage ||
        "Spray on pulse points such as wrists, neck, and behind ears for a long-lasting fragrance.",
    },
    {
      title: "PERFUME NOTES",
      content:
        product?.benefits ||
        "Long-lasting fragrance, skin-friendly formula, and IFRA-certified ingredients.",
    },
    {
      title: "OTHER INFORMATION",
      content:
        product?.brandInfo ||
        "Bella Vita Organic is an Indian brand focused on natural, sustainable, and premium beauty solutions.",
    },
  ];

  return (
    <div className="w-full p-10 mx-auto mt-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="border-b border-gray-300 p-6 transition-all duration-300"
        >
          <button
            className="w-full flex justify-between items-center font-medium text-left text-sm sm:text-xl hover:text-gray-600"
            onClick={() => toggleDropdown(index)}
          >
            {section.title}
            {openIndex === index ? (
              <IoIosArrowUp className="text-lg" />
            ) : (
              <IoIosArrowDown className="text-lg" />
            )}
          </button>

          {/* Dropdown content */}
          {openIndex === index && (
            <div className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductInfo;
