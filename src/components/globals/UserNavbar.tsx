/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { getFileUrl } from "../../config";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { Calendar02Icon } from "@hugeicons/core-free-icons";
import NavSearch from "./NavSearch";

const UserNavbar = () => {
  const { userData, isSignedIn, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation().pathname;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: (
        <HugeiconsIcon
          icon={Home01Icon}
          size={22}
          strokeWidth={1.5}
          fill={pathname === "/" ? "currentColor" : "none"}
        />
      ),
    },
    userData?.role === "recruiter" && {
      name: "Find Professionals",
      path: "/search?query=professionals",
      icon: (
        <HugeiconsIcon
          icon={UserIcon}
          size={22}
          strokeWidth={1.5}
          fill={
            pathname.includes("/search?query=professionals")
              ? "currentColor"
              : "none"
          }
        />
      ),
    },
    userData?.role === "jobSeeker" && {
      name: "Find Jobs",
      path: "/search?query=jobs",
      icon: (
        <HugeiconsIcon
          icon={Calendar02Icon}
          size={22}
          strokeWidth={1.5}
          fill={pathname.includes("/search") ? "currentColor" : "none"}
        />
      ),
    },
  ];

  return (
    <div className="w-full component-px flex items-center justify-between bg-white shadow fixed top-0 z-50 gap-5">
      <div className="flex items-center justify-start gap-3 lg:flex-1 ">
        <Link
          to="/"
          className="flex items-center justify-start w-10 h-10 aspect-square"
        >
          <img
            src="/logo.png"
            alt="logo"
            className="w-full h-full aspect-square rounded-md border-gray-400"
          />
        </Link>

        {/* Center search */}
        <div className="hidden lg:block">
          <NavSearch />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center lg:gap-3">
        {navItems.filter(Boolean).map((item: any) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `text-gray-600 hover:text-primary-dark transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer max-sm:py-4 pt-3 pb-1 px-4 lg:px-6 ${
                isActive
                  ? "text-primary-dark font-medium border-b-2 border-primary"
                  : ""
              }`
            }
          >
            {item.icon}
            <span className="hidden sm:block text-xs lg:text-sm font-medium">
              {item.name}
            </span>
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
              className="w-10 h-10 max-sm:w-10 max-sm:h-10 border border-gray-200 aspect-square rounded-full object-cover cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            <div
              ref={dropdownRef}
              className={`absolute top-12 right-0 bg-white shadow-lg border border-gray-200 rounded-lg min-w-[240px] py-3 px-4 transition-all duration-200 z-50 ${
                isDropdownOpen
                  ? "opacity-100 visible transform translate-y-0"
                  : "opacity-0 invisible transform -translate-y-2"
              }`}
            >
              {/* User Info Section */}
              <div className="pb-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">
                  {userData?.firstName} {userData?.lastName}
                </h2>
                <p className="text-xs text-gray-600 mt-1">{userData?.email}</p>
              </div>

              {/* Menu Items */}
              <div className="py-3 space-y-1">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Dashboard
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>
              </div>

              {/* Logout Section */}
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={signOut}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
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
