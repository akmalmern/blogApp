import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) return <div className="text-center mt-20">Yuklanmoqda...</div>;

  return user.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
