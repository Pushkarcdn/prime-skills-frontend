/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Loader from "../../../components/ui/Loader";
import useFetch from "../../../hooks/useFetch";
import Chip from "../../../components/ui/Chip";
import { PrimaryButton } from "../../../components/ui/Buttons";
import JobDetails from "./JobDetails/index";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("Active Jobs");

  const { data, loading, fetchData: refetch } = useFetch("/jobs") as any;

  const [activeJobs, setActiveJobs] = useState([]) as any;
  const [inactiveJobs, setInactiveJobs] = useState([]) as any;
  const [urgentJobs, setUrgentJobs] = useState([]) as any;

  useEffect(() => {
    if (data) {
      const trimmedSearchTerm = searchTerm?.toLowerCase().trim() || "";
      const filteredData =
        trimmedSearchTerm === ""
          ? data
          : data.filter((item: any) => {
              const title = item?.title?.toLowerCase() || "";
              const company = item?.company?.toLowerCase() || "";
              const industry = item?.industry?.toLowerCase() || "";
              const level = item?.level?.toLowerCase() || "";
              const location = item?.locationType?.toLowerCase() || "";

              return (
                title.includes(trimmedSearchTerm) ||
                company.includes(trimmedSearchTerm) ||
                industry.includes(trimmedSearchTerm) ||
                level.includes(trimmedSearchTerm) ||
                location.includes(trimmedSearchTerm)
              );
            });

      setActiveJobs(
        filteredData.filter((item: any) => item?.isActive === true)
      );

      setInactiveJobs(
        filteredData.filter((item: any) => item?.isActive === false)
      );

      setUrgentJobs(
        filteredData.filter((item: any) => item?.urgency === "urgent")
      );
    }
  }, [data, searchTerm]);

  const tabs = {
    "Active Jobs": (
      <JobDetails data={activeJobs} jobs={activeJobs} refetch={refetch} />
    ),
    "Inactive Jobs": (
      <JobDetails data={inactiveJobs} jobs={inactiveJobs} refetch={refetch} />
    ),
    "Urgent Jobs": (
      <JobDetails data={urgentJobs} jobs={urgentJobs} refetch={refetch} />
    ),
  } as any;

  return (
    <div className="flex flex-col gap-2 md:gap-6">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-y-2 gap-x-3">
        <div className="md:mr-5 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold">Jobs</span>
          <Chip text={`${data?.length || 0} jobs found`} />
        </div>
        <input
          type="text"
          placeholder="Search by title, company, industry, level, or location"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-2.5"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton
          title="Create Job"
          link="/admin/jobs/new"
          className="!text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={`rounded-md text-sm px-4 py-2 font-medium cursor-pointer transition-all duration-200 ${
              currentTab === tab
                ? "bg-primary text-white "
                : "text-gray-500 hover:text-primary-dark hover:bg-primary-light"
            }`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <Loader />}
      {!loading && tabs[currentTab]}
    </div>
  );
}
