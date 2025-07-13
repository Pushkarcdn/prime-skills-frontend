/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import UserDetails from "./UserDetails";
import Loader from "../../../components/ui/Loader";
import useFetch from "../../../hooks/useFetch";
import Chip from "../../../components/ui/Chip";
import { PrimaryButton } from "../../../components/ui/Buttons";

export default function Inquiries() {
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [currentTab, setCurrentTab] = useState("Job seekers");

  const { data, loading, fetchData: refetch } = useFetch("/users") as any;

  const [jobSeekers, setJobSeekers] = useState([]) as any;
  const [recruiters, setRecruiters] = useState([]) as any;
  const [admins, setAdmins] = useState([]) as any;

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (item: any) =>
          item?.firstName +
            " " +
            item?.lastName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase().trim()) ||
          item?.email
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase().trim()) ||
          item?.phone?.toLowerCase().includes(searchTerm?.toLowerCase().trim())
      );
      setJobSeekers(
        filteredData.filter((item: any) => item?.role === "jobSeeker")
      );
      setRecruiters(
        filteredData.filter((item: any) => item?.role === "recruiter")
      );
      setAdmins(
        filteredData.filter(
          (item: any) => item?.role === "admin" || item?.role === "superAdmin"
        )
      );
    }
  }, [data, searchTerm]);

  const tabs = {
    "Job seekers": (
      <UserDetails data={jobSeekers} inquiries={jobSeekers} refetch={refetch} />
    ),
    Recruiters: (
      <UserDetails data={recruiters} inquiries={recruiters} refetch={refetch} />
    ),
    Admins: <UserDetails data={admins} inquiries={admins} refetch={refetch} />,
  } as any;

  return (
    <div className="flex flex-col gap-2 md:gap-6">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-y-2 gap-x-3">
        <div className="md:mr-5 flex items-center gap-4">
          <span className="text-primary-dark text-xl font-semibold ">
            Users
          </span>

          <Chip text={`${data?.length || 0} users found`} />
        </div>
        <input
          type="text"
          placeholder="Search by name, email or phone!"
          className="px-5 border flex-grow rounded-md outline-gray-400 py-2.5"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <PrimaryButton
          title="Create user"
          link="/admin/users/new"
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
