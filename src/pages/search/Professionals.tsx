/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Loader from "../../components/ui/Loader";
import useFetch from "../../hooks/useFetch";
import Chip from "../../components/ui/Chip";
import { formatDate, hoursAgo } from "../../utils/dateFormatters";

const displayName = (p: any) => {
  const name = `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim();
  return name || p.username;
};

const capitalize = (text?: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

const Professionals = ({ query }: { query: string }) => {
  if (query === "professionals") query = "";

  const {
    data,
    loading,
    fetchData: refetch,
    err,
  } = useFetch(`/professionals?query=${query}`) as any;

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query]);

  if (loading) return <Loader />;

  if (err)
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
        {err}
      </div>
    );

  const professionals = (data as any) || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {query ? (
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-900">
              {professionals.length}
            </span>{" "}
            result{professionals.length === 1 ? "" : "s"} for
            <span className="ml-1 font-medium text-primary">“{query}”</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">Suggestions</p>
        )}
      </div>

      {professionals.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          No professionals found.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {professionals.map((p: any) => {
            const lastLoginHours = hoursAgo(p.lastLogin);
            return (
              <li key={p._id} className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={p.profileImage || "/logo.png"}
                      alt={displayName(p)}
                      className="h-14 w-14 rounded-full object-cover border border-gray-200 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-gray-900 truncate max-w-[16rem]">
                          {displayName(p)}
                        </h3>
                        <span className="text-sm text-gray-500 truncate">
                          @{p.username}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        <a
                          href={`mailto:${p.email}`}
                          className="hover:text-primary hover:underline break-all"
                        >
                          {p.email}
                        </a>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Chip
                          text={
                            p.role === "jobSeeker"
                              ? "Job Seeker"
                              : capitalize(p.role)
                          }
                        />
                        {p.isEmailVerified ? (
                          <Chip
                            text="Email Verified"
                            className="bg-green-100 text-green-700"
                          />
                        ) : (
                          <Chip
                            text="Email Not Verified"
                            className="bg-red-100 text-red-700"
                          />
                        )}
                        {p.oAuthProvider && (
                          <Chip
                            text={`OAuth: ${capitalize(p.oAuthProvider)}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-sm text-gray-600">
                    {p.createdAt && (
                      <p>
                        Joined{" "}
                        <span className="text-gray-900 font-medium">
                          {formatDate(p.createdAt, "long")}
                        </span>
                      </p>
                    )}
                    <p className="mt-1">
                      Last login:{" "}
                      {lastLoginHours != null
                        ? `${lastLoginHours}h ago`
                        : "N/A"}
                    </p>
                    {p.ip && <p className="mt-1">IP: {p.ip}</p>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Professionals;
