/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatQuestionIcon,
  Calendar02Icon,
  InboxIcon,
} from "@hugeicons/core-free-icons";

const data = [
  {
    icon: (
      <HugeiconsIcon
        icon={BubbleChatQuestionIcon}
        size={22}
        strokeWidth={1.5}
      />
    ),
    text: "Dashboard",
    navigateTo: "/admin/dashboard",
  },
  {
    icon: <HugeiconsIcon icon={InboxIcon} size={22} strokeWidth={1.5} />,
    text: "Users",
    navigateTo: "/admin/users",
  },
  // {
  //   icon: (
  //     <HugeiconsIcon icon={Appointment01Icon} size={22} strokeWidth={1.5} />
  //   ),
  //   text: "Posts",
  //   navigateTo: "/admin/posts",
  // },
  {
    icon: <HugeiconsIcon icon={Calendar02Icon} size={22} strokeWidth={1.5} />,
    text: "Jobs",
    navigateTo: "/admin/jobs",
  },
  // {
  //   icon: <HugeiconsIcon icon={Calendar02Icon} size={22} strokeWidth={1.5} />,
  //   text: "Freelance works",
  //   navigateTo: "/admin/freelance-works",
  // },
];

const PageOptions = ({ close }: { close?: () => void }) => {
  // NavItem component (unchanged)
  const NavItem = ({
    icon,
    text,
    navigateTo,
  }: {
    icon: any;
    text: string;
    navigateTo: string;
  }) => {
    const isActive = useLocation().pathname.includes(navigateTo);

    return (
      <Link
        to={navigateTo}
        onClick={close}
        className={`w-full flex items-center gap-2 2xl:gap-4 py-3 xl:py-5 px-5 2xl:px-7 duration-400 ease-in-out cursor-pointer xl:rounded-lg text-sm transition-all border-l-4 no-scrollbar
              ${
                isActive
                  ? "!text-primary-dark font-medium bg-gradient-to-r from-primary-light to-gray-100 xl:translate-x-3 xl:scale-[0.98] border-primary"
                  : "!text-[#323232] bg-white xl:shadow-sm border-transparent"
              }
          `}
      >
        <div>{icon}</div>
        <div>{text}</div>
      </Link>
    );
  };

  const { userData } = useAuth();

  const [filteredData, setFilteredData] = useState(data?.slice(0, -1));

  useEffect(() => {
    if (userData?.role === "superAdmin") {
      setFilteredData(data);
    }
  }, [userData]);

  return (
    <>
      {filteredData?.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          text={item.text}
          navigateTo={item.navigateTo}
        />
      ))}
    </>
  );
};

export default PageOptions;
