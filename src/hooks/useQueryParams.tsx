import type { IQueryParams } from "../types";
import usePathParams from "./usePathParams";

const useQueryParams = () => {
  const { navigate } = usePathParams();

  const getParams = (): IQueryParams => {
    const searchParams = new URLSearchParams(window.location.search);
    const Q_Params: IQueryParams = {};
    for (const [key, value] of searchParams.entries()) {
      Q_Params[key] = value;
    }
    return Q_Params;
  };
  const setParams = (params: IQueryParams): void => {
    const searchParams = new URLSearchParams(window.location.search);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        newSearchParams.set(key, params[key]);
      }
    }
    navigate({ search: newSearchParams.toString() });
  };
  const removeParam = (paramKey: string): void => {
    const searchParams = new URLSearchParams(window.location.search);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(paramKey);
    navigate({ search: newSearchParams.toString() });
  };

  return { queryParams: getParams(), setParams, removeParam };
};

export default useQueryParams;
