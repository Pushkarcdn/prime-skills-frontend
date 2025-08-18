import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { getFileUrl } from "../../config";
import { useAuth } from "../../hooks/useAuth";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = useLocation();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const NavItem = ({
    name,
    href,
    currentPath,
  }: {
    name: string;
    href: string;
    currentPath: string;
  }) => {
    const isActive = currentPath === href;

    return (
      <Link to={href} onClick={() => setIsOpen(false)}>
        <span
          className={`${
            isActive ? "font-bold text-[#DEAD00]" : "text-secondary"
          } hover:text-[#DEAD00] transition-colors cursor-pointer flex items-center`}
        >
          {name}
        </span>
      </Link>
    );
  };

  const { userData } = useAuth();

  return (
    <nav
      className={`bg-white bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200`}
    >
      <div className="px-3 sm:px-8 py-2 flex items-center justify-between">
        <Link to="/admin">
          <img src="/logo.png" alt="Logo" width={45} />
        </Link>

        {userData && (
          <div className="flex items-center gap-2 select-none text-right">
            <Link to={"/"} className="mr-10 mt-3 relative group">
              <HugeiconsIcon
                icon={Home01Icon}
                className="text-primary group-hover:scale-[1.05] group-hover:text-primary-dark transition"
                size={27}
              />
              <div className="absolute hidden group-hover:block bg-white text-[#606060] text-sm rounded-lg py-1.5 px-4 z-10 text-nowrap shadow-lg -left-1/2">
                Go to home
              </div>
            </Link>
            <div className="flex-col gap-0 hidden sm:flex">
              <h4 className="font-medium">
                {userData?.firstName + " " + userData?.lastName}
              </h4>
              <h4 className="text-xs">{userData?.email}</h4>
            </div>
            <img
              src={getFileUrl(userData?.profileImage)}
              alt="profile-image"
              width={40}
              height={40}
              className="rounded-full w-12 aspect-square object-cover object-center"
            />
          </div>
        )}

        {/* <button
          ref={hamburgerRef}
          onClick={toggleDropdown}
          aria-label="Toggle menu"
          className="flex sm:hidden"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button> */}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="sm:hidden absolute right-0 w-full bg-white shadow-lg"
        >
          <div className="flex flex-col py-6 px-6 space-y-6">
            <NavItem name="Home" href="/" currentPath={pathname.pathname} />
            <NavItem
              name="Careers"
              href="/careers"
              currentPath={pathname.pathname}
            />
            {/* <NavItem name="Services" href="/services" currentPath={pathname} /> */}
            {/* <NavItem name="Contact us" href="/contact" currentPath={pathname} /> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
