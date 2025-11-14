import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddToCart } from "../../api/cart/service";
import { useGetProductById } from "../../api/products/service";
import { Button } from "../../components/Button";
import ProductInfo from "./ProductInfo";
import ProductReview from "./ProductReview";
import AllReviews from "./AllReviews";
import QuillContent from "../../components/quillContent";

const ProductDetails = () => {
  const { productId } = useParams();
  const [current, setCurrent] = useState(0);

  const { mutateAsync: addToCart } = useAddToCart();

  const { data: product = {} } = useGetProductById(productId!);

  const handleAddToCart = (id: string) => {
    addToCart(id);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center gap-10 p-5 md:p-10 max-w-6xl mx-auto">
        {/* LEFT IMAGE  */}
        <div className="flex flex-col gap-4 items-center md:items-start lg:max-w-1/2">
          <img
            src={product?.images?.[current]}
            alt={`Product image`}
            className="w-full h-auto object-cover rounded"
          />
          {product?.images?.length > 1 && (
            <div className="flex items-center overflow-x-scroll scroll-smooth">
              <div className="flex flex-nowrap gap-2 shrink-0">
                {product.images.map((img: string, ind: number) => (
                  <img
                    key={ind}
                    src={img}
                    alt={`Product image ${ind + 1}`}
                    onClick={() => setCurrent(ind)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border hover:border-black/80 ${
                      current === ind ? "border-black" : "border-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT DETAILS  */}
        <div className="flex-1 mt-6 md:mt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">
            {product?.title}
          </div>
          <div className="text-sm text-gray-500">{product?.brand}</div>
          <div className="mt-4 text-lg sm:text-xl font-bold">
            ₹{product?.sellingPrice}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            MRP:
            <div className="line-through">₹{product?.price}</div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Inclusive of all taxes
          </p>

          <Button
            content=" Add To Cart "
            pattern="outline"
            className=" mt-5 lg:w-full rounded bg-black text-white"
            buttonProps={{
              onClick: () => handleAddToCart(product._id),
            }}
          />

          <div className="p-3 sm:p-4 bg-gray-100 mt-5 rounded">
            <div className="font-semibold text-sm sm:text-base">
              Personalize Perfume
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Personalize with your name or message for just
            </div>
            <span className="font-bold"> ₹75</span>{" "}
            <span className="text-xs sm:text-sm text-gray-500">
              extra - prepaid only!
            </span>
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-8 px-2">
            {[
              {
                img: "https://bellavitaorganic.com/cdn/shop/files/Long_Lasting_1_70a277fc-8142-4cfb-b036-fc4084c6cee5.svg?crop=center&height=40&v=1694673851&width=40",
                text: "LONG LASTING",
              },
              {
                img: "https://bellavitaorganic.com/cdn/shop/files/ifra_1.svg?crop=center&height=40&v=1694674058&width=40",
                text: "IFRA - CERTIFIED",
              },
              {
                img: "https://bellavitaorganic.com/cdn/shop/files/Imported_Oils_1.svg?crop=center&height=40&v=1694674059&width=40",
                text: "IMPORTED OILS",
              },
              {
                img: "https://bellavitaorganic.com/cdn/shop/files/Bottled_in_india_2.svg?crop=center&height=40&v=1727701843&width=40",
                text: "MADE IN INDIA",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="w-full h-24 sm:h-28 bg-gray-100 rounded-xl flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-all p-3"
              >
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  src={item.img}
                  alt={item.text}
                />
                <p className="text-[10px] sm:text-xs text-center font-semibold mt-2">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 font-medium text-sm sm:text-base">
            DESCRIPTION :
          </p>
          <div className="text-gray-600 text-sm sm:text-base">
            <QuillContent content={product?.description} />
          </div>
          <img
            src="https://bellavitaorganic.com/cdn/shop/files/UPD_-_Pdp_banner.jpg?v=1739267213&width=500"
            alt="ultimate image"
            className="mt-10 cursor-pointer w-full max-w-[500px] rounded"
          />
        </div>
      </div>
      <div>
        <ProductInfo product={product} />
      </div>
      <div>
        <ProductReview reviews={product?.reviews || []} />
      </div>
      <div>
        <AllReviews />
      </div>
    </div>
  );
};

export default ProductDetails;
