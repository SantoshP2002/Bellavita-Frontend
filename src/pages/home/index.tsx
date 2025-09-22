import HomeCarousel from "../../components/homeCarousel";
import HomeProducts from "../../components/HomeProducts";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/*Home Carousel */}
      <HomeCarousel />
      {/* ✅ Horizontal Scroll HomeProduct Section */}
      <HomeProducts />
    </div>
  );
};

export default Home;
