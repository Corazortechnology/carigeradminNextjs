
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null; 
  }

  return children;
};

export default PrivateRoute;
