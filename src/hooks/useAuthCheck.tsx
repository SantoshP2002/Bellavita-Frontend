import { useEffect } from "react";
import { getUserToken } from "../utils";
import { useUserStore } from "../store/user";
import { useGetUser } from "../api/user/service";

export const useAuthCheck = () => {
  const { setUser, user } = useUserStore();
  const { data, isLoading, isError } = useGetUser();

  useEffect(() => {
    try {
      if (getUserToken() && !user && data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Error in auth check:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  return { isLoading, isError, data };
};
