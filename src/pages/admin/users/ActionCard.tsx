/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import hitApi from "../../../api/axios";
import DeleteModal from "../../../components/modals/DeleteModal";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Edit02Icon, ViewIcon } from "@hugeicons/core-free-icons";
import { Modal } from "antd";

const ActionCard = ({ item, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [viewModalStatus, setViewModalStatus] = useState(false);

  const deleteItem = async (id: any) => {
    await hitApi(`/users/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center  text-sm font-semibold">
      <div className="flex items-center gap-6">
        <HugeiconsIcon
          icon={ViewIcon}
          size={18}
          strokeWidth={1.2}
          className="text-secondary font-medium cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setViewModalStatus(true)}
        />

        <Link to={`/admin/users/${item?._id}`}>
          <HugeiconsIcon
            icon={Edit02Icon}
            size={20}
            strokeWidth={1.3}
            className="text-secondary font-medium"
          />
        </Link>

        <HugeiconsIcon
          icon={Delete02Icon}
          size={20}
          strokeWidth={1.2}
          color="red"
          onClick={() => {
            setDeleteModalStatus(true);
          }}
          className="cursor-pointer"
        />
      </div>

      {deleteModalStatus && (
        <DeleteModal
          isOpen={deleteModalStatus}
          closeModal={() => setDeleteModalStatus(false)}
          title="Delete user"
          description="Are you sure you want to delete this user? This action cannot be undone."
          action={() => {
            deleteItem(item?._id);
            setDeleteModalStatus(false);
          }}
        />
      )}

      <Modal
        title="User Details"
        open={viewModalStatus}
        onOk={() => setViewModalStatus(false)}
        onCancel={() => setViewModalStatus(false)}
        footer={null}
      >
        {/* iterate through the item and show the details in a table  with key and value */}
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(item).map(([key, value]) => (
              <tr key={key}>
                <td className="text-sm font-medium">{key}</td>
                <td className="text-sm">{value?.toString() || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default ActionCard;
