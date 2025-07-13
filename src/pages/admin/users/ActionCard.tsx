/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import hitApi from "../../../api/axios";
import DeleteModal from "../../../components/modals/DeleteModal";

const ActionCard = ({ item, refetch }: any) => {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  const deleteItem = async (id: any) => {
    await hitApi(`/users/${id}`, `DELETE`);

    setDeleteModalStatus(false);

    refetch();
  };

  return (
    <div className="flex justify-center  text-sm font-semibold">
      <div className="flex items-center gap-6">
        {/* <Modal
          title="Message"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <p>{item?.message}</p>
        </Modal>
        <BsEnvelope
          size={18}
          color="#0295a9"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        /> */}

        <Link to={`mailto:${item?.email}`} target="_blank">
          {/* <HugeIcon name="reply" size={22} i /> */}
        </Link>

        {/* <CiTrash
          size={20}
          color="red"
          onClick={() => {
            setDeleteModalStatus(true);
          }}
          className="cursor-pointer"
        /> */}
      </div>

      {deleteModalStatus && (
        <DeleteModal
          isOpen={deleteModalStatus}
          closeModal={() => setDeleteModalStatus(false)}
          title="Delete user"
          description="Are you sure you want to delete this user?"
          action={() => {
            deleteItem(item?.id);
            setDeleteModalStatus(false);
          }}
        />
      )}
    </div>
  );
};

export default ActionCard;
