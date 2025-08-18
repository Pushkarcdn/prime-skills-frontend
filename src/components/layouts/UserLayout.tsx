import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "../globals/UserNavbar";
import UserFooter from "../globals/UserFooter";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../ui/Loader";

const UserLayout = () => {
  const { isSignedIn, isFinished, userData } = useAuth();

  if (!isFinished) return <Loader />;

  if (!isSignedIn && !userData) return <Navigate to="/auth/sign-in" />;

  return (
    <div className="w-full flex flex-col min-h-screen">
      <UserNavbar />
      <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
