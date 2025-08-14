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

  const deleteItem = async (slug: any) => {
    await hitApi(`/jobs/${slug}`, `DELETE`);
    setDeleteModalStatus(false);
    refetch();
  };

  return (
    <div className="flex justify-center text-sm font-semibold">
      <div className="flex items-center gap-6">
        <HugeiconsIcon
          icon={ViewIcon}
          size={18}
          strokeWidth={1.2}
          className="text-secondary font-medium cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setViewModalStatus(true)}
        />

        <Link to={`/admin/jobs/${item?.slug}`}>
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
          title="Delete Job"
          description="Are you sure you want to delete this job? This action cannot be undone."
          action={() => {
            deleteItem(item?.slug);
            setDeleteModalStatus(false);
          }}
        />
      )}

      <Modal
        title="Job Details"
        open={viewModalStatus}
        onOk={() => setViewModalStatus(false)}
        onCancel={() => setViewModalStatus(false)}
        footer={null}
        width={700}
        style={{ top: 50, bottom: 50 }}
      >
        <div className="flex flex-col gap-4 pt-4">
          {/* Basic Job Information */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-4">
            <div className="flex gap-4 border-b border-gray-200 pb-4">
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-semibold">
                  {item.title}
                </span>

                <span className="font-medium text-sm text-gray-600">
                  {item.urgency === "urgent" ? (
                    <span className="text-red-500">Urgent Hiring</span>
                  ) : (
                    "Normal Hiring"
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {item?.level && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Level</span>
                  <span className="font-medium">{item.level}</span>
                </div>
              )}
              {item?.industry && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Industry</span>
                  <span className="font-medium">{item.industry}</span>
                </div>
              )}
              {item?.locationType && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Location Type</span>
                  <span className="font-medium">{item.locationType}</span>
                </div>
              )}
              {item?.timing && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Timing</span>
                  <span className="font-medium">{item.timing}</span>
                </div>
              )}
              {item?.vacancy && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Vacancies</span>
                  <span className="font-medium">{item.vacancy}</span>
                </div>
              )}
              {item?.deadline && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Deadline</span>
                  <span className="font-medium">
                    {formatDate(item.deadline, "long")}
                  </span>
                </div>
              )}
              {item?.salary && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Salary</span>
                  <span className="font-medium">
                    {item.currency} {item.salary}
                    {item.isSalaryNegotiable && " (Negotiable)"}
                  </span>
                </div>
              )}
              {!item?.salary && item?.isSalaryNegotiable && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Salary</span>
                  <span className="font-medium">Negotiable</span>
                </div>
              )}
              {item?.createdAt && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Posted On</span>
                  <span className="font-medium">
                    {formatDate(item.createdAt, "long")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary-dark mb-3">
              Job Description
            </h3>
            <div className="text-sm whitespace-pre-wrap">
              {item.jobDescription}
            </div>
          </div>

          {/* Job Requirements */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary-dark mb-3">
              Job Requirements
            </h3>
            <div className="text-sm whitespace-pre-wrap">
              {item.jobRequirements}
            </div>
          </div>

          {/* Company Benefits */}
          {item.companyBenefits && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-dark mb-3">
                Company Benefits
              </h3>
              <div className="text-sm whitespace-pre-wrap">
                {item.companyBenefits}
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
                    "title",
                    "jobDescription",
                    "jobRequirements",
                    "companyBenefits",
                    "recruiterId",
                    "level",
                    "industry",
                    "locationType",
                    "timing",
                    "salary",
                    "currency",
                    "isSalaryNegotiable",
                    "vacancy",
                    "urgency",
                    "deadline",
                    "createdAt",
                    "updatedAt",
                    "_id",
                    "__v",
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
      </Modal>
    </div>
  );
};

export default ActionCard;
