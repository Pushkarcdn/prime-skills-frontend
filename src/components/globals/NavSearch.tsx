import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const encodedValue = encodeURIComponent(searchTerm);
      navigate(`/search?query=${encodedValue}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md flex-1">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 4.27 11.94l3.27 3.27a.75.75 0 1 0 1.06-1.06l-3.27-3.27A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <input
        type="text"
        aria-label="Search"
        placeholder="Search for jobs, professionals, etc."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     handleSearch();
        //   }
        // }}
        className="w-xs focus:w-md transition-all duration-300 bg-white rounded-3xl pl-10 pr-3 py-2 text-sm"
      />
      {/* hidden submit button to let user press enter to search */}
      <button type="submit" className="hidden" />
    </form>
  );
};

export default NavSearch;
