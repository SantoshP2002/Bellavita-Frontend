import HomeCarousel from "../../components/homeCarousel";
import HomeProducts from "../../components/HomeProducts";
import { carouselImages } from "../../constants";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/*Home Carousel */}
      <HomeCarousel key={"top"} images={carouselImages}  needDots={true} />
      {/* ✅ Horizontal Scroll HomeProduct Section */}
      <HomeProducts />
      <HomeCarousel key={"bottom"}
        images={[
          "https://bellavitaorganic.com/cdn/shop/files/Offer-Banner-2-UPB.webp?v=1727436765&width=1920",
        ]}
      />
    </div>
  );
};

export default Home;
