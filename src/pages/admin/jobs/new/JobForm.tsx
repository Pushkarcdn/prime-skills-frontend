/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  currencies,
  levelOptions,
  industryOptions,
  locationTypeOptions,
  timingOptions,
  urgencyOptions,
} from "../../../../data/jobOptions";

const JobForm = ({ formData, onChange, onCheckboxChange, recruiters }: any) => {
  return (
    <div className="space-y-6 bg-white py-4 rounded-lg border-gray-200">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Recruiter Selection */}
        <div className="relative lg:col-span-2">
          <select
            id="recruiterId"
            name="recruiterId"
            value={formData.recruiterId || ""}
            onChange={onChange}
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            <option value="">Select Recruiter</option>
            {recruiters.map((recruiter: any) => (
              <option key={recruiter._id} value={recruiter._id}>
                {recruiter.firstName} {recruiter.lastName} ({recruiter.email})
              </option>
            ))}
          </select>
          <label
            htmlFor="recruiterId"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Recruiter <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Job Title */}
        <div className="relative lg:col-span-2">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={onChange}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            required
          />
          <label
            htmlFor="title"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Job Title <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Slug */}
        <div className="relative lg:col-span-1">
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug || ""}
            onChange={onChange}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            required
          />
          <label
            htmlFor="slug"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Slug <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Job Level */}
        <div className="relative">
          <select
            id="level"
            name="level"
            value={formData.level || ""}
            onChange={onChange}
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            <option value="">Select Level</option>
            {levelOptions.map((level: string) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <label
            htmlFor="level"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Job Level <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Industry */}
        <div className="relative">
          <select
            id="industry"
            name="industry"
            value={formData.industry || ""}
            onChange={onChange}
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            <option value="">Select Industry</option>
            {industryOptions.map((industry: string) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <label
            htmlFor="industry"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Industry <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Location Type */}
        <div className="relative">
          <select
            id="locationType"
            name="locationType"
            value={formData.locationType || ""}
            onChange={onChange}
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            <option value="">Select Location Type</option>
            {locationTypeOptions.map((locationType: string) => (
              <option key={locationType} value={locationType}>
                {locationType}
              </option>
            ))}
          </select>
          <label
            htmlFor="locationType"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Location Type <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Job Timing */}
        <div className="relative">
          <select
            id="timing"
            name="timing"
            value={formData.timing || ""}
            onChange={onChange}
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            <option value="">Select Timing</option>
            {timingOptions.map((timing: string) => (
              <option key={timing} value={timing}>
                {timing}
              </option>
            ))}
          </select>
          <label
            htmlFor="timing"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Job Timing <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Salary */}
        <div className="relative">
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary || ""}
            onChange={onChange}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
          />
          <label
            htmlFor="salary"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Salary
          </label>
        </div>

        {/* Currency */}
        <div className="relative">
          <select
            id="currency"
            name="currency"
            value={formData.currency || ""}
            onChange={onChange}
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            <option value="">Select Currency</option>
            {currencies.map((currency: string) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <label
            htmlFor="currency"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Currency <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Vacancy Count */}
        <div className="relative">
          <input
            type="number"
            id="vacancy"
            name="vacancy"
            min="1"
            value={formData.vacancy || 1}
            onChange={onChange}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
          />
          <label
            htmlFor="vacancy"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Number of Vacancies
          </label>
        </div>

        {/* Urgency */}
        <div className="relative">
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency || "normal"}
            onChange={onChange}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          >
            {urgencyOptions.map((urgency: string) => (
              <option key={urgency} value={urgency}>
                {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
              </option>
            ))}
          </select>
          <label
            htmlFor="urgency"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Urgency
          </label>
        </div>

        {/* Deadline */}
        <div className="relative">
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={
              formData.deadline
                ? new Date(formData.deadline).toISOString().split("T")[0]
                : ""
            }
            onChange={onChange}
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
          />
          <label
            htmlFor="deadline"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Application Deadline
          </label>
        </div>

        {/* Job Description */}
        <div className="relative lg:col-span-3">
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription || ""}
            onChange={onChange}
            rows={4}
            placeholder=""
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          ></textarea>
          <label
            htmlFor="jobDescription"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Job Description <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Job Requirements */}
        <div className="relative lg:col-span-3">
          <textarea
            id="jobRequirements"
            name="jobRequirements"
            value={formData.jobRequirements || ""}
            onChange={onChange}
            rows={4}
            placeholder=""
            required
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          ></textarea>
          <label
            htmlFor="jobRequirements"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Job Requirements <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Company Benefits */}
        <div className="relative lg:col-span-3">
          <textarea
            id="companyBenefits"
            name="companyBenefits"
            value={formData.companyBenefits || ""}
            onChange={onChange}
            rows={3}
            placeholder=""
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
          ></textarea>
          <label
            htmlFor="companyBenefits"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Company Benefits
          </label>
        </div>

        {/* Salary Negotiable */}
        <div className="flex items-start select-none">
          <div className="flex items-center h-5">
            <input
              id="isSalaryNegotiable"
              name="isSalaryNegotiable"
              type="checkbox"
              checked={formData.isSalaryNegotiable || false}
              onChange={(e) =>
                onCheckboxChange("isSalaryNegotiable", e.target.checked)
              }
              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="isSalaryNegotiable"
              className="font-medium text-gray-700"
            >
              Salary Negotiable
            </label>
          </div>
        </div>

        {/* Is Active */}
        <div className="flex items-start select-none">
          <div className="flex items-center h-5">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive !== false} // Default to true if undefined
              onChange={(e) => onCheckboxChange("isActive", e.target.checked)}
              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="isActive" className="font-medium text-gray-700">
              Job Active
            </label>
            <p className="text-gray-500">
              Inactive jobs won't be visible to job seekers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
