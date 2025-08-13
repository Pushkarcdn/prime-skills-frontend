/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import hitApi from "../../../api/axios";
import DeleteModal from "../../../components/modals/DeleteModal";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Edit02Icon, ViewIcon } from "@hugeicons/core-free-icons";
import { Modal } from "antd";
import { formatDate } from "../../../utils/dateFormatters";
import { formatCamelCase } from "../../../utils/stringFormatters";

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
        width={700}
        style={{ top: 50, bottom: 50 }}
      >
        {/* iterate through the item and show the details in a table  with key and value */}
        <div className="flex flex-col gap-4 pt-4">
          {/* User Image */}

          {/* Basic User Information */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-4">
            <div className="flex gap-4 border-b border-gray-200 pb-4">
              {item?.profileImage && (
                <div className="flex justify-center aspect-square w-24 h-24">
                  <img
                    src={item.profileImage}
                    alt="User Profile"
                    className="w-full h-full aspect-square rounded-lg object-cover border"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-semibold">
                  {item.firstName} {item.lastName}
                </span>

                <span className="font-medium text-sm text-gray-600">
                  {item.email}
                </span>

                {item?.phone && (
                  <span className="font-medium text-sm text-gray-600">
                    {item.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {item?.role && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Role</span>
                  <span className="font-medium capitalize">
                    {formatCamelCase(item.role)}
                  </span>
                </div>
              )}
              {item?.createdAt && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Member since</span>
                  <span className="font-medium">
                    {formatDate(item.createdAt, "long")}
                  </span>
                </div>
              )}
              {item?.permanentAddress && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">
                    Permanent Address
                  </span>
                  <span className="font-medium">{item.permanentAddress}</span>
                </div>
              )}
              {item?.temporaryAddress && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">
                    Temporary Address
                  </span>
                  <span className="font-medium">{item.temporaryAddress}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Job Seeker Details */}
            {item?.jobSeekerDetails &&
              item?.role === "jobSeeker" &&
              Object.keys(item.jobSeekerDetails).length > 0 && (
                <div className="flex-grow bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-dark mb-3">
                    Job Seeker Details
                  </h3>
                  <div className="flex flex-col gap-3">
                    {/* Skills section */}
                    {item.jobSeekerDetails.skills &&
                      item.jobSeekerDetails.skills.length > 0 && (
                        <div className="flex flex-col col-span-2">
                          <span className="text-xs text-gray-500 capitalize">
                            Skills
                          </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.jobSeekerDetails.skills.map(
                              (skill: string, index: number) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Other job seeker details */}
                    {
                      Object.entries(item.jobSeekerDetails).map(
                        ([key, value]) =>
                          value &&
                          key !== "skills" &&
                          key !== "_id" && (
                            <div key={key} className="flex flex-col">
                              <span className="text-xs text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="font-medium">
                                {typeof value === "boolean"
                                  ? value
                                    ? "Yes"
                                    : "No"
                                  : typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </span>
                            </div>
                          )
                      ) as any
                    }
                  </div>
                </div>
              )}

            {/* Recruiter Details */}
            {item?.recruiterDetails &&
              item?.role === "recruiter" &&
              Object.keys(item.recruiterDetails).length > 0 && (
                <div className="flex-grow bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-dark mb-3">
                    Recruiter Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {
                      Object.entries(item.recruiterDetails).map(
                        ([key, value]) =>
                          value && (
                            <div key={key} className="flex flex-col">
                              <span className="text-xs text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="font-medium">
                                {typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </span>
                            </div>
                          )
                      ) as any
                    }
                  </div>
                </div>
              )}

            {/* Other Details */}
            <div className="flex-grow bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-dark mb-3">
                Other Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(item).map(([key, value]) => {
                  // Skip already displayed fields and complex objects we've handled separately
                  if (
                    [
                      "firstName",
                      "lastName",
                      "email",
                      "phone",
                      "role",
                      "permanentAddress",
                      "temporaryAddress",
                      "createdAt",
                      "jobSeekerDetails",
                      "recruiterDetails",
                      "_id",
                      "__v",
                      "password",
                      "profileImage",
                      "updatedAt",
                    ].includes(key) ||
                    value === null ||
                    value === undefined
                  ) {
                    return null;
                  }

                  if (typeof value === "boolean") {
                    value = value ? "Yes" : "No";
                  }

                  // Handle remaining fields
                  return (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs text-gray-500 capitalize">
                        {formatCamelCase(key)}
                      </span>
                      <span className="font-medium">
                        {typeof value === "object"
                          ? JSON.stringify(value).substring(0, 50) +
                            (JSON.stringify(value).length > 50 ? "..." : "")
                          : String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActionCard;
