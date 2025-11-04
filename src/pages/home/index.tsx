import BellamoodTech from "../../components/BellamoodTech";
import CrazyDeals from "../../components/CrazyDeals";
import HomeCarousel from "../../components/homeCarousel";
import HomeProducts from "../../components/HomeProducts";
import LuxuryCategory from "../../components/LuxuryCategory";
import QuizProducts from "../../components/QuizProducts";
import { carouselImages } from "../../constants";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/*Home Carousel */}
      <HomeCarousel key={"top"} images={carouselImages} needDots={true} />
      {/* ✅ Horizontal Scroll HomeProduct Section */}
      <HomeProducts />
      <HomeCarousel
        key={"bottom"}
        images={[
          "https://bellavitaorganic.com/cdn/shop/files/Offer-Banner-2-UPB.webp?v=1727436765&width=1920",
        ]}
      />
      <LuxuryCategory />
      <QuizProducts />
      <BellamoodTech />
      <CrazyDeals/>
    </div>
  );
};

export default Home;
