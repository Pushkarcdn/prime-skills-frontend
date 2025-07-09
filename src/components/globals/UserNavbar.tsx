import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton, PrimaryOutlineButton } from "../ui/Buttons";
import { useState } from "react";

const UserNavbar = () => {
  const { userData, isSignedIn, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="w-full component-px py-5 flex items-center justify-between bg-gray-50">
      <Link to="/" className="flex items-center justify-start">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold ml-2">Prime Skill Store</h1>
      </Link>
      <div className="flex items-center justify-end gap-4">
        {isSignedIn ? (
          // custom dropdown menu
          <div className="relative">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <h1 className="text-sm font-bold">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <h1 className="text-sm font-bold">{userData?.email}</h1>
            </div>

            <div
              className={`absolute top-10 right-0 w-48 bg-white shadow-md rounded-md p-2 transition-all duration-300 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <PrimaryOutlineButton title="Logout" onClick={signOut} />
            </div>
          </div>
        ) : (
          <>
            <PrimaryOutlineButton title="Login" link="/sign-in" className="" />
            <PrimaryButton title="Register" link="/sign-up" />
          </>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
