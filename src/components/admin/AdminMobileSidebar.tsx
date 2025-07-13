import { useState } from "react";
import { Drawer } from "antd";
import PageOptions from "./PageOptions";
import Logout from "../ui/Logout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu02Icon } from "@hugeicons/core-free-icons";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <aside className="xl:hidden group">
      <div className="px-2 sm:px-4 pt-2 sm:pt-4">
        <button
          onClick={showDrawer}
          className="bg-white rounded-sm p-1 cursor-pointer border border-gray-200 hover:bg-gray-100 transition-all duration-300"
        >
          <HugeiconsIcon icon={Menu02Icon} size={20} strokeWidth={1.2} />
        </button>
      </div>

      <Drawer
        open={open}
        onClose={onClose}
        placement="left"
        width={280}
        getContainer={false}
        classNames={{
          header: "",
          body: "flex flex-col gap-8",
          content: "",
        }}
      >
        <div className="overflow-y-auto flex-grow scrollbar space-y-2">
          <PageOptions close={onClose} />
        </div>
        <Logout />
      </Drawer>
    </aside>
  );
};

export default MobileSidebar;
