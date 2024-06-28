
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
//   const router = useRouter();

//   if (!isAuthenticated) {
//     router.push("/login");
//     return null;
//   }

//   return children;
// };

// export default PrivateRoute;

"use client"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Or you could return a loading indicator or a fallback UI
  }

  return children;
};

export default PrivateRoute;
