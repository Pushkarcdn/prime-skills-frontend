import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryOutlineButton } from "../ui/Buttons";
import { useState } from "react";
import { getFileUrl } from "../../config";

const UserNavbar = () => {
  const { userData, isSignedIn, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full component-px py-5 flex items-center justify-between bg-gray-50">
      <Link to="/" className="flex items-center justify-start">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold ml-2">Prime Skills</h1>
      </Link>

      <div className="flex items-center justify-end gap-4">
        {isSignedIn && userData && (
          // custom dropdown menu
          <div className="relative flex items-center gap-2">
            <img
              src={getFileUrl(userData?.profileImage)}
              alt="profile-image"
              className="w-10 h-10 border border-gray-200 aspect-square rounded-full object-cover"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            <div
              className={`absolute top-12 right-0 bg-white shadow-md rounded-md p-2 transition-all duration-300 flex flex-col gap-2 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col items-start cursor-pointer">
                <h1 className="text-sm font-semibold">
                  {userData?.firstName} {userData?.lastName}
                </h1>
                <h1 className="text-xs font-medium">{userData?.email}</h1>
              </div>
              <PrimaryOutlineButton
                title="Logout"
                onClick={signOut}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
