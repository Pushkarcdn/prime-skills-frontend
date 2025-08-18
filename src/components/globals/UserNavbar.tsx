import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryOutlineButton } from "../ui/Buttons";
import { useState } from "react";
import { getFileUrl } from "../../config";
import { HugeiconsIcon } from "@hugeicons/react";
import { BubbleChatQuestionIcon, Home01Icon } from "@hugeicons/core-free-icons";
import { Calendar02Icon } from "@hugeicons/core-free-icons";
import NavSearch from "./NavSearch";

const UserNavbar = () => {
  const { userData, isSignedIn, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <HugeiconsIcon icon={Home01Icon} size={22} strokeWidth={1.5} />,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: <HugeiconsIcon icon={Calendar02Icon} size={22} strokeWidth={1.5} />,
    },
    {
      name: "Support",
      path: "/contact",
      icon: (
        <HugeiconsIcon
          icon={BubbleChatQuestionIcon}
          size={22}
          strokeWidth={1.5}
        />
      ),
    },
  ];

  return (
    <div className="w-full component-px flex items-center justify-between bg-white shadow">
      <div className="flex items-center justify-start gap-3 flex-1">
        <Link to="/" className="flex items-center justify-start">
          <img
            src="/logo.png"
            alt="logo"
            className="w-8 h-8 rounded-md border-gray-400"
          />
        </Link>

        {/* Center search */}
        <NavSearch />
      </div>

      <div className="flex-1 flex items-center justify-center gap-5">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `text-gray-600 hover:text-primary-dark transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer pt-3 pb-1 px-6 ${
                isActive ? "text-primary-dark font-medium border-b-2" : ""
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center justify-end gap-6">
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
        {!isSignedIn && (
          <Link
            to="/auth/sign-in"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
