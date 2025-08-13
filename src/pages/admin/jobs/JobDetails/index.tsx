/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatDate } from "../../../../utils/dateFormatters";
import ActionCard from "../ActionCard";

const JobDetails = ({ data, refetch }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="w-full">
            <thead className="!rounded-md">
              <tr className="bg-[#f9fafb] !rounded-xl text-sm text-nowrap">
                <th className="px-4 py-3 text-left font-medium">Job Title</th>
                <th className="px-4 py-3 text-left font-medium">Recruiter</th>
                <th className="px-4 py-3 text-left font-medium">Level</th>
                <th className="px-4 py-3 text-left font-medium">Industry</th>
                <th className="px-4 py-3 text-left font-medium">
                  Location Type
                </th>
                <th className="px-4 py-3 text-left font-medium">Vacancies</th>
                <th className="px-4 py-3 text-left font-medium">Deadline</th>
                <th className="px-8 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="border-t border-gray-300 px-4 py-4 text-left text-nowrap">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-medium">{item?.title}</h3>
                      <h4 className="text-xs text-gray-500">
                        {item?.urgency === "urgent" ? (
                          <span className="text-red-500 font-medium">
                            Urgent Hiring
                          </span>
                        ) : (
                          <span>Normal Hiring</span>
                        )}
                      </h4>
                    </div>
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.recruiterName || "N/A"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.level || "N/A"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.industry || "N/A"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.locationType || "N/A"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.vacancy || 1}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.deadline
                      ? formatDate(item?.deadline, "long")
                      : "No Deadline"}
                  </td>

                  <td className="border-t border-gray-300 py-5">
                    <ActionCard item={item} refetch={refetch} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-400">
              No jobs found in this category.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
