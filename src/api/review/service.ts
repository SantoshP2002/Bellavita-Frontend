import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import usePathParams from "../../hooks/usePathParams";
import { create_reviews, get_review_by_product_id } from "./api";

// create review
export const useCreateReviews = () => {
  const { pathParams } = usePathParams();
  const queryClient = useQueryClient();
  const productId = pathParams.productId || "";

  return useMutation({
    mutationKey: ["create_reviews", productId],
    mutationFn: (data: FormData) => create_reviews(data, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_reviews_by_product_id_infinite"],
      });
      queryClient.invalidateQueries({ queryKey: ["get_product_by_id"] });
    },
  });
};

// get review by product id
export const useGetReviewByProductId = () => {
  const { pathParams } = usePathParams();
  const productId = pathParams.productId || "";

  return useInfiniteQuery({
    queryKey: ["get_reviews_by_product_id_infinite", productId],

    // pageParam ka default value
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      get_review_by_product_id(productId, pageParam, 7, false),

    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage || {};
      if (pagination?.hasNextPage) {
        return pagination.currentPage + 1;
      }
      return undefined;
    },
  });
};
