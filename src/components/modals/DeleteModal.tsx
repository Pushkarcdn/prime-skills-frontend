import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Modal } from "antd";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
  title: string;
  description: string;
}

const DeleteModal = ({
  isOpen,
  closeModal,
  title,
  description,
  action,
}: ModuleModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        closeIcon={null}
        centered
        onCancel={closeModal}
        styles={{
          mask: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          content: {
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
          },
        }}
      >
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex flex-col items-center gap-5">
            <span className="rounded-[50%] p-2.5 bg-[#FCEEEE] text-[#E05151]">
              <HugeiconsIcon
                icon={Delete02Icon}
                size={20}
                strokeWidth={1.2}
                color="red"
              />
            </span>
            <span className="font-medium text-lg text-red-600">{title}</span>
          </div>

          <p className="text-center">{description}</p>

          <div className="flex gap-4 items-center text-sm mt-5">
            <div
              onClick={closeModal}
              className="py-2.5 px-12 rounded-lg text-red-500 border-2 border-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition font-medium"
            >
              Cancel
            </div>

            <div
              onClick={action}
              className="py-3 px-12 rounded-lg cursor-pointer bg-red-500 text-white transition font-medium hover:bg-red-700"
            >
              Delete
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
