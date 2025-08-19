/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../../components/ui/Loader";
import useFetch from "../../hooks/useFetch";

const Jobs = ({ query }: { query: string }) => {
  const {
    data,
    loading,
    // fetchData: refetch,
  } = useFetch(`/jobs?query=${query}`) as any;

  if (loading) return <Loader />;

  return (
    <div>
      Jobs: {query} {data?.length}
    </div>
  );
};

export default Jobs;
