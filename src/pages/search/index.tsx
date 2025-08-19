import { useSearchParams } from "react-router-dom";
import Jobs from "./Jobs";
import Professionals from "./Professionals";
import { useEffect, useState } from "react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const tabNames = ["Professionals", "Jobs"] as const;
  type TabName = (typeof tabNames)[number];
  const [currentTab, setCurrentTab] = useState<TabName>("Professionals");
  const [mountedTabs, setMountedTabs] = useState<Record<TabName, boolean>>({
    Professionals: true,
    Jobs: false,
  });

  useEffect(() => {
    if (query === "jobs") {
      setCurrentTab("Jobs");
    } else if (query === "professionals") {
      setCurrentTab("Professionals");
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 component-px py-6">
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit border border-gray-200">
        {tabNames.map((tab) => (
          <button
            key={tab}
            className={`rounded-md text-sm px-6 py-2 font-medium transition-all duration-200 cursor-pointer ${
              currentTab === tab
                ? "bg-primary text-white shadow-sm"
                : "text-gray-600 hover:text-primary-dark"
            }`}
            onClick={() => {
              setCurrentTab(tab);
              setMountedTabs((prev) => ({ ...prev, [tab]: true }));
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white overflow-y-auto rounded-xl p-4 min-h-screen">
        {tabNames.map((tab) => {
          if (!mountedTabs[tab]) return null;

          return (
            <div key={tab} className={currentTab === tab ? "" : "hidden"}>
              {tab === "Professionals" && <Professionals query={query || ""} />}
              {tab === "Jobs" && <Jobs query={query || ""} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
