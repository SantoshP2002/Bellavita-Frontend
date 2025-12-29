import AutoScrollStrip from "../../components/AutoScrollStrip";
import BellamoodTech from "../../components/BellamoodTech";
import CrazyDeals from "../../components/CrazyDeals";
import CustomerCarousel from "../../components/CustomerCarousel";
import HomeCarousel from "../../components/HomeCarouse";
import HomeProducts from "../../components/HomeProducts";
import ImageStrip from "../../components/ImageStrip";
import LuxuryCategory from "../../components/LuxuryCategory";
import QuizProducts from "../../components/QuizProducts";
import ShopByNotes from "../../components/ShopByNotes";
import WhyBellavitaInfo from "../../components/WhyBellavitaInfo";
import { carouselImages, mobileCarouselImages } from "../../constants";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/*Home Carousel */}
      <HomeCarousel
        key={"top"}
        images={carouselImages}
        mobileImages={mobileCarouselImages}
        needDots={true}
      />
      {/* ✅ Horizontal Scroll HomeProduct Section */}
      <HomeProducts />
      <HomeCarousel
        key="bottom"
        images={[
          "https://bellavitaorganic.com/cdn/shop/files/Offer-Banner-2-UPB.webp?v=1727436765&width=1920",
        ]}
        mobileImages={[
          "https://bellavitaorganic.com/cdn/shop/files/Offer-Mobile-_1_UPB-mobile.webp?v=1727436765&width=800",
        ]}
      />

      <LuxuryCategory />
      <QuizProducts />
      <BellamoodTech />
      <CrazyDeals />
      <ShopByNotes />
      <WhyBellavitaInfo />
      <CustomerCarousel />
      <ImageStrip />
      <AutoScrollStrip />
    </div>
  );
};

export default Home;
