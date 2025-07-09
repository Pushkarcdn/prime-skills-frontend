import { Outlet } from "react-router-dom";
import UserNavbar from "../globals/UserNavbar";
import UserFooter from "../globals/UserFooter";

const UserLayout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <UserNavbar />
      <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
