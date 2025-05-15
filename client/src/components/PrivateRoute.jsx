import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoading) return <div className="text-center mt-20">Yuklanmoqda...</div>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
