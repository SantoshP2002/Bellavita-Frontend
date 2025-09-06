import { useQuery } from "@tanstack/react-query";
import { get_user } from "./api";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get_user"],
    queryFn: () => get_user(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
};
