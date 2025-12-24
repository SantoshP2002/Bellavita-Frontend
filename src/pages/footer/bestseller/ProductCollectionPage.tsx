import { useParams } from "react-router-dom";
import { useGetAllProducts } from "../../../api/products/service";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";

interface Product {
  _id: string;
  title: string;
  commonImages: string[];
}

const SLUG_FILTER_MAP: Record<string, unknown> = {
  "ultimate-perfume-box": { category: "fragrance" },
  "perfume-gift-set-for-men": { category: "men" },
  "perfume-gift-set-for-women": { category: "women" },
  "perfume-for-men": { category: "men" },
  "perfume-for-women": { category: "women" },
  "unisex-perfume": { category: "unisex" },
  "under-eye-cream-for-dark-circles": { category: "eye-care" },
};

const ProductCollectionPage = () => {
  const { slug } = useParams();

  const filter = SLUG_FILTER_MAP[slug ?? ""];

  const { data, isPending } = useGetAllProducts(
    {
      page: 1,
      limit: 20,
      ...(filter || {}),
    },
    Boolean(filter)
  );

  const products: Product[] = data?.products ?? [];

  return (
    <div className="px-6 py-6">
      <h1 className="mx-auto text-2xl uppercase text-center">
        Products
      </h1>

      {isPending ? (
        <LoadingScreen />
      ) : products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-2 rounded">
              <img src={p.commonImages[0]} alt={p.title} />
              <h3 className="text-sm">{p.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <EmptyData
          content={"No Products Found 😕"}
          className="h-[50dvh] mx-auto [&>h3]:text-base sm:[&>h3]:text-4xl [&>h3]:uppercase gap-5"
        />
      )}
    </div>
  );
};

export default ProductCollectionPage;
