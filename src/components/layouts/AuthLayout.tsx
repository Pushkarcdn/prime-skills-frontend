import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Cover from "../../pages/auth/Cover";
import Loader from "../ui/Loader";

const AuthLayout = () => {
  const { userData, isSignedIn, isFinished } = useAuth();

  if (!isFinished) return <div></div>;

  if (isSignedIn && userData) return <Navigate to="/" />;

  if (!isSignedIn && !userData)
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 h-screen items-center">
        <Cover />
        <Outlet />
      </section>
    );

  return <Loader />;
};

export default AuthLayout;
