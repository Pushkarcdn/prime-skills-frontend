/* eslint-disable @typescript-eslint/no-explicit-any */

const RecruiterDetails = ({
  recruiterDetails,
  onChange,
  onCheckboxChange,
}: any) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Recruiter Details</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={recruiterDetails.companyName}
            onChange={onChange}
          />
          <label
            htmlFor="companyName"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Company Name
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={recruiterDetails.companyAddress}
            onChange={onChange}
          />
          <label
            htmlFor="companyAddress"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Company Address
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="companyWebsite"
            name="companyWebsite"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={recruiterDetails.companyWebsite}
            onChange={onChange}
          />
          <label
            htmlFor="companyWebsite"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Company Website
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="positionInCompany"
            name="positionInCompany"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={recruiterDetails.positionInCompany}
            onChange={onChange}
          />
          <label
            htmlFor="positionInCompany"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Position In Company
          </label>
        </div>

        <div className="relative md:col-span-2">
          <textarea
            id="aboutCompany"
            name="aboutCompany"
            rows={4}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={recruiterDetails.aboutCompany}
            onChange={onChange}
          />
          <label
            htmlFor="aboutCompany"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            About Company
          </label>
        </div>

        <label className="flex items-center space-x-2 cursor-pointer px-2">
          <input
            type="checkbox"
            name="isCurrentlyHiring"
            checked={recruiterDetails.isCurrentlyHiring}
            onChange={(e) =>
              onCheckboxChange("isCurrentlyHiring", e.target.checked)
            }
            className="h-4 w-4 text-primary border-gray-300 rounded"
          />
          <span className="text-sm">Are you currently hiring?</span>
        </label>
      </div>
    </div>
  );
};

export default RecruiterDetails;
