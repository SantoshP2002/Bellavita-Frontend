import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddToCart } from "../../api/cart/service";
import { useGetProductById } from "../../api/products/service";
import { Button } from "../../components/Button";
import ProductInfo from "./ProductInfo";
import ProductReview from "./ProductReview";
import AllReviews from "./AllReviews";
import QuillContent from "../../components/quillContent";
import { categoryVideoMap } from "../../constants";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [current, setCurrent] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { mutateAsync: addToCart } = useAddToCart();

  const { data: product = {} } = useGetProductById(productId!);

  const handleAddToCart = (id: string) => {
    addToCart(id);
  };

  const videoData =
    categoryVideoMap?.[product?.category?.value]?.[product?.subCategory?.value];

  const price = product?.price;
  const sellingPrice = product?.sellingPrice;

  const discountPercent =
    price && sellingPrice
      ? Math.round(((price - sellingPrice) / price) * 100)
      : 0;

  return (
    <div>
      {/* Top Part to Description  */}
      <div className="flex flex-col md:flex-row justify-center gap-10 p-5 md:p-10 max-w-lvw mx-auto bg-white text-black dark:bg-black dark:text-white">
        {/* LEFT IMAGE */}
        <div className="flex flex-col gap-4 items-center md:items-start lg:max-w-1/2">
          <img
            src={product?.images?.[current]}
            alt="Product image"
            className="w-full h-auto object-cover rounded-2xl shadow-md dark:shadow-[0_0_25px_rgba(255,255,255,0.06)]"
          />

          {product?.images?.length > 1 && (
            <div className="flex items-center overflow-x-scroll scroll-smooth">
              <div className="flex flex-nowrap gap-2 shrink-0">
                {product.images.map((img: string, ind: number) => (
                  <img
                    key={ind}
                    src={img}
                    onClick={() => setCurrent(ind)}
                    className={`w-20 h-20  object-cover rounded-xl cursor-pointer border transition-all
                ${
                  current === ind
                    ? "border-black dark:border-white scale-95"
                    : "border-black/30 dark:border-white/30 opacity-60"
                }
              `}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT DETAILS */}
        <div className="flex-1 mt-6 md:mt-0">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            {product?.title}
          </div>

          <div className="text-sm text-yellow-500 font-medium">
            {product?.brand}
          </div>

          <div className="mt-4 flex items-center gap-6 py-3">
            <span className="text-lg font-bold">₹{product?.sellingPrice}</span>

            {discountPercent > 0 && (
              <span className="text-green-500 font-semibold text-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            MRP:
            <span className="line-through text-red-500">₹{price}</span>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400">
            Inclusive of all taxes
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              content="Add To Cart"
              pattern="outline"
              buttonProps={{
                onClick: () => handleAddToCart(product._id),
              }}
            />

            <Button
              content="Go To Cart"
              pattern="outline"
              buttonProps={{
                onClick: () => navigate("/cart"),
              }}
            />
          </div>

          {/* PERSONALIZE CARD */}
          <div className="p-4 mt-5 rounded-xl dark:bg-black shadow-[-4px_-4px_12px_rgba(0,0,0,0.200)] dark:shadow-[-4px_-4px_12px_rgba(247,197,253,0.35)]">
            <div className="font-semibold text-sm sm:text-base">
              Personalize Perfume
            </div>
            <div className="text-xs sm:text-sm text-black dark:text-white">
              Personalize with your name or message for just
            </div>
            <span className="font-bold"> ₹75</span>{" "}
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
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
                className="bg-gray-50 p-3 sm:p-6 rounded-xl flex flex-col h-full dark:bg-black dark:text-white border border-gray-400  border-l-2 border-t-2 dark:hover:border-blue-400"
              >
                <img className="w-10 h-10 sm:w-12 sm:h-12" src={item.img} />
                <p className="text-[10px] sm:text-xs font-semibold mt-2 ">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 font-medium text-sm sm:text-base">
            DESCRIPTION :
          </p>

          <div
            className={`text-sm text-gray-600 dark:text-gray-300 ${
              showFullDesc ? "" : "line-clamp-4"
            }`}
          >
            <QuillContent content={product?.description} />
          </div>

          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="mt-2 text-sm font-semibold text-black dark:text-white hover:underline"
          >
            {showFullDesc ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* Common Images */}
      <div className="w-full dark:bg-black">
        <div className="relative w-full h-[130px] sm:h-[250px] md:h-[400px] overflow-hidden dark:bg-black">
          <img
            src="https://www.sugarcosmetics.com/cdn/shop/files/FREE-Hd-Liquid-Foundation-on-699-LP_1600-X-400.jpg?v=1768978692&width=1600"
            className="carousel-img object-contain"
            alt=""
          />

          <img
            src="https://www.sugarcosmetics.com/cdn/shop/files/249-sugar-store---LP-1600x400.jpg?v=1767362348&width=1600"
            className="carousel-img object-contain"
            alt=""
          />

          <img
            src="https://www.sugarcosmetics.com/cdn/shop/files/BTR-GWP-at-1499--LP-1600x400.jpg?v=1767623005&width=1600"
            className="carousel-img object-contain"
            alt=""
          />
        </div>
      </div>

      {/* VIDEO  */}
      {videoData && (
        <div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[560px] object-cover block md:hidden"
          >
            <source src={videoData.mobile} type="video/mp4" />
          </video>

          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[560px] object-cover hidden md:block"
          >
            <source src={videoData.desktop} type="video/mp4" />
          </video>
        </div>
      )}

      <div>
        <ProductInfo product={product} />

        <div className="dark:bg-black dark:text-white py-10 lg:p-1">
          {product?.images?.length > 0 ? (
            <h1 className="text-lg lg:text-4xl sm:m- text-center">
              Colorful Captivation
              <p className="text-xs lg:text-sm text-gray-500 mb-2">
                A colorful masterpiece designed to stop and mesmerize everyone.
              </p>
              {/* NEEDLE LINE */}
              <span className="mx-auto block h-[2px] w-full lg:w-[70%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500 mb-10" />
            </h1>
          ) : (
            ""
          )}

          {product?.images?.length > 1 && (
            <>
              {/* 📱 MOBILE: HORIZONTAL SCROLL */}
              <div className="flex overflow-x-auto scroll-smooth px-3 sm:hidden">
                <div className="flex flex-nowrap gap-3">
                  {product.images
                    .slice(1, 5)
                    .map((img: string, ind: number) => (
                      <img
                        key={ind}
                        src={img}
                        alt={`Product image ${ind + 2}`}
                        className="w-[241px] h-[370px] object-cover rounded cursor-pointer shrink-0"
                      />
                    ))}
                </div>
              </div>

              {/* 💻 TABLET + DESKTOP: HORIZONTAL SCROLL */}
              <div className="hidden sm:flex justify-center overflow-x-auto scroll-smooth px-2">
                <div className="flex flex-nowrap gap-4 md:gap-6 mx-auto">
                  {product.images
                    .slice(1, 5)
                    .map((img: string, ind: number) => (
                      <img
                        key={ind}
                        src={img}
                        alt={`Product image ${ind + 2}`}
                        className="w-[180px] h-[260px] md:w-[240px] md:h-[330px] lg:w-[240px] lg:h-[370px] object-cover cursor-pointer rounded shrink-0"
                      />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
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
