/* eslint-disable @typescript-eslint/no-explicit-any */

import { getFileUrl } from "../../../config";
import { formatDate } from "../../../utils/dateFormatters";
import ActionCard from "./ActionCard";

const All = ({ data, refetch }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="w-full">
            <thead className="!rounded-md">
              <tr className="bg-[#f9fafb] !rounded-xl text-sm text-nowrap">
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Address</th>
                <th className="px-4 py-3 text-left font-medium">
                  {data?.length > 0 &&
                    data[0]?.role === "jobSeeker" &&
                    "Profession"}
                  {data?.length > 0 &&
                    data[0]?.role === "recruiter" &&
                    "Company"}
                  {data?.length > 0 && data[0]?.role === "admin" && "Role"}
                </th>
                <th className="px-4 py-3 text-left font-medium">Registered</th>
                <th className="px-8 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="border-t border-gray-300 px-4 py-4 text-left text-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={getFileUrl(item?.profileImage)}
                        alt=""
                        className="w-10 h-10 aspect-square rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-0">
                        <h3>
                          {item?.firstName} {item?.lastName}
                        </h3>
                        <h4 className="text-xs">{item?.email}</h4>
                      </div>
                    </div>
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.phone || "N/A"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.temporaryAddress || item?.permanentAddress || "N/A"}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {item?.role === "jobSeeker" && (
                      <div>{item?.jobSeekerDetails?.profession || "N/A"}</div>
                    )}

                    {item?.role === "recruiter" && (
                      <div>{item?.recruiterDetails?.companyName || "N/A"}</div>
                    )}

                    {item?.role === "admin" && <div>{item?.role}</div>}
                  </td>

                  <td className="border-t border-gray-300 px-4 py-5 text-left text-sm text-gray-500 text-nowrap">
                    {formatDate(item?.createdAt, "long")}
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
              No users with this role found.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;
