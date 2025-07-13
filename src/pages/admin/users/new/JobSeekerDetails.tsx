/* eslint-disable @typescript-eslint/no-explicit-any */

const JobSeekerDetails = ({
  jobSeekerDetails,
  onChange,
  onCheckboxChange,
}: any) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Job Seeker Details</h3>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="relative">
          <input
            type="text"
            id="profession"
            name="profession"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={jobSeekerDetails.profession}
            onChange={onChange}
          />
          <label
            htmlFor="profession"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Profession
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="skills"
            name="skills"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={jobSeekerDetails.skills.join(", ")}
            onChange={onChange}
          />
          <label
            htmlFor="skills"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Skills (comma separated)
          </label>
        </div>

        <div className="relative md:col-span-2">
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={jobSeekerDetails.bio}
            onChange={onChange}
          />
          <label
            htmlFor="bio"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Bio
          </label>
        </div>

        <label className="flex items-center space-x-2 cursor-pointer px-2">
          <input
            type="checkbox"
            name="isOpenToWork"
            checked={jobSeekerDetails.isOpenToWork}
            onChange={(e) => onCheckboxChange("isOpenToWork", e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <span className="text-sm">Are you currently open to work?</span>
        </label>
      </div>
    </div>
  );
};

export default JobSeekerDetails;
