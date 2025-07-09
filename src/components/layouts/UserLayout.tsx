import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen border-2 border-red-500">
      <h1 className="text-4xl font-bold text-red-500">
        This is the user layout
      </h1>
      <Outlet />
    </div>
  );
};

export default UserLayout;
