import { useLocation, useNavigate, useParams } from "react-router-dom";

const usePathParams = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathParams = useParams();
  const paths = pathname.split("/").filter((path) => path !== "");

  return { paths, pathname, pathParams, navigate };
};

export default usePathParams;
