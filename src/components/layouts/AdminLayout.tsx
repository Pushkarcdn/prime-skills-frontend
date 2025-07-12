import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../ui/Loader";
import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";
import AdminMobileSidebar from "../admin/AdminMobileSidebar";

const AdminLayout = () => {
  const { userData, isFinished } = useAuth();

  if (!isFinished) return <Loader />;

  if (
    isFinished &&
    userData?.role !== "superAdmin" &&
    userData?.role !== "admin"
  )
    return <Navigate to="/" />;

  return (
    <div className="w-full h-screen flex flex-col">
      <AdminNavbar />
      <main
        className={`w-full flex-grow flex flex-col xl:grid grid-cols-1 xl:grid-cols-6 items-start justify-start bg-gray-100`}
      >
        <AdminSidebar />
        <AdminMobileSidebar />
        <div className="w-full h-full xl:col-span-5 relative">
          <div className="absolute w-full h-full p-2 sm:p-3">
            <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col gap-4 rounded-lg overflow-hidden bg-white p-2 sm:p-3 ">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
