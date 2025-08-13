/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import Chip from "../../../components/ui/Chip";
import { formatDate } from "../../../utils/dateFormatters";
import useFetch from "../../../hooks/useFetch";

const StatCard = ({
  label,
  value,
  subText,
  color = "primary",
}: {
  label: string;
  value: number | string;
  subText?: string;
  color?: "primary" | "secondary" | "green" | "red" | "gray";
}) => {
  const colorMap: Record<string, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-600",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 p-4 sm:p-5 bg-white">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        {subText && <span className="text-xs text-gray-400">{subText}</span>}
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        <span className={`text-xs px-3 py-1 rounded-full ${colorMap[color]}`}>
          {label}
        </span>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, link }: { title: string; link?: string }) => (
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-primary-dark">{title}</h3>
    {link && (
      <Link to={link} className="text-sm text-primary hover:text-primary-dark">
        View all
      </Link>
    )}
  </div>
);

const Dashboard = () => {
  const { data: users, loading: usersLoading } = useFetch("/users") as any;
  const { data: jobs, loading: jobsLoading } = useFetch("/jobs") as any;

  const isLoading = usersLoading || jobsLoading;

  const userStats = useMemo(() => {
    const all = Array.isArray(users) ? users : [];
    const counts = {
      total: all.length,
      jobSeekers: all.filter((u: any) => u?.role === "jobSeeker").length,
      recruiters: all.filter((u: any) => u?.role === "recruiter").length,
      admins: all.filter((u: any) => u?.role === "admin").length,
      new7d: all.filter((u: any) => {
        const created = u?.createdAt ? new Date(u.createdAt).getTime() : 0;
        return Date.now() - created <= 7 * 24 * 60 * 60 * 1000;
      }).length,
    };
    const recent = [...all]
      .sort(
        (a: any, b: any) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime()
      )
      .slice(0, 5);
    return { counts, recent };
  }, [users]);

  const jobStats = useMemo(() => {
    const all = Array.isArray(jobs) ? jobs : [];
    const counts = {
      total: all.length,
      active: all.filter((j: any) => j?.isActive === true).length,
      inactive: all.filter((j: any) => j?.isActive === false).length,
      urgent: all.filter((j: any) => j?.urgency === "urgent").length,
      new7d: all.filter((j: any) => {
        const created = j?.createdAt ? new Date(j.createdAt).getTime() : 0;
        return Date.now() - created <= 7 * 24 * 60 * 60 * 1000;
      }).length,
    };
    const recent = [...all]
      .sort(
        (a: any, b: any) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime()
      )
      .slice(0, 5);
    return { counts, recent };
  }, [jobs]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary-dark">
          Admin Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Chip text={`${userStats.counts.total || 0} users`} />
          <Chip text={`${jobStats.counts.total || 0} jobs`} />
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <StatCard
              label="Total Users"
              value={userStats.counts.total}
              color="primary"
            />
            <StatCard
              label="Job Seekers"
              value={userStats.counts.jobSeekers}
              color="green"
            />
            <StatCard
              label="Recruiters"
              value={userStats.counts.recruiters}
              color="secondary"
            />
            <StatCard
              label="Admins"
              value={userStats.counts.admins}
              color="gray"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <StatCard
              label="Total Jobs"
              value={jobStats.counts.total}
              color="primary"
            />
            <StatCard
              label="Active Jobs"
              value={jobStats.counts.active}
              color="green"
            />
            <StatCard
              label="Inactive Jobs"
              value={jobStats.counts.inactive}
              color="gray"
            />
            <StatCard
              label="Urgent Jobs"
              value={jobStats.counts.urgent}
              color="red"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="w-full rounded-xl border border-gray-200 p-4 bg-white">
              <SectionHeader title="Recent Users" link="/admin/users" />
              <div className="mt-3 divide-y">
                {userStats.recent.length === 0 && (
                  <div className="text-sm text-gray-400 py-6 text-center">
                    No recent users
                  </div>
                )}
                {userStats.recent.map((u: any, idx: number) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {(u?.firstName || "") + " " + (u?.lastName || "")}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {u?.email || ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip text={u?.role || "user"} />
                      <span className="text-xs text-gray-400">
                        {u?.createdAt ? formatDate(u.createdAt, "long") : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full rounded-xl border border-gray-200 p-4 bg-white">
              <SectionHeader title="Recent Jobs" link="/admin/jobs" />
              <div className="mt-3 divide-y">
                {jobStats.recent.length === 0 && (
                  <div className="text-sm text-gray-400 py-6 text-center">
                    No recent jobs
                  </div>
                )}
                {jobStats.recent.map((j: any, idx: number) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {j?.title || "Untitled"}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {j?.recruiterName || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {j?.urgency === "urgent" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">
                          Urgent
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {j?.createdAt ? formatDate(j.createdAt, "long") : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full rounded-xl border border-gray-200 p-4 bg-white">
              <SectionHeader title="This Week" />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <StatCard
                  label="New Users"
                  value={userStats.counts.new7d}
                  color="green"
                />
                <StatCard
                  label="New Jobs"
                  value={jobStats.counts.new7d}
                  color="green"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
