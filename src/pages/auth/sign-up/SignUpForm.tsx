/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import hitApi from "../../../api/axios";
import { formatCamelCase } from "../../../utils/stringFormatters";
import OAuthOptions from "../OAuthOptions";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    role: "jobSeeker",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isTermsAndConditionsAccepted: false,
  });

  const [jobSeekerDetails, setJobSeekerDetails] = useState({
    profession: "",
    bio: "",
  });

  const [recruiterDetails, setRecruiterDetails] = useState({
    companyName: "",
    companyAddress: "",
    companyWebsite: "",
    positionInCompany: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJobSeekerDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobSeekerDetails({
      ...jobSeekerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecruiterDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecruiterDetails({
      ...recruiterDetails,
      [e.target.name]: e.target.value,
    });
  };

  const toggleRole = () => {
    setFormData({
      ...formData,
      role: formData.role === "jobSeeker" ? "recruiter" : "jobSeeker",
    });
    // scroll to the top of the overflow-y-auto
    const overflowYAuto = document.querySelector(".overflow-y-auto");
    if (overflowYAuto) {
      overflowYAuto.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // use loop on formData and check if all the fields are filled
      for (const key in formData) {
        if (formData[key as keyof typeof formData] === "") {
          setErr(`${formatCamelCase(key)} is required!`);
          return;
        }
      }

      if (formData.role === "jobSeeker") {
        for (const key in jobSeekerDetails) {
          if (jobSeekerDetails[key as keyof typeof jobSeekerDetails] === "") {
            setErr(`${formatCamelCase(key)} is required!`);
            return;
          }
        }
      } else if (formData.role === "recruiter") {
        for (const key in recruiterDetails) {
          if (recruiterDetails[key as keyof typeof recruiterDetails] === "") {
            setErr(`${formatCamelCase(key)} is required!`);
            return;
          }
        }
      }

      if (formData.password !== formData.confirmPassword) {
        setErr("Passwords do not match!");
        return;
      }

      if (!formData.isTermsAndConditionsAccepted) {
        setErr("Please accept the terms and conditions!");
        return;
      }

      setLoading(true);
      setSuccess(false);

      const payload = formData as any;

      if (formData?.role === "jobSeeker") {
        payload.jobSeekerDetails = jobSeekerDetails;
      } else {
        payload.recruiterDetails = recruiterDetails;
      }

      const res = await hitApi("/auth/signup", "POST", payload);

      if (res?.success) {
        setErr("");
        setSuccess(true);
        navigate("/auth/sign-in");
      } else {
        setErr(res?.message);
      }
    } catch {
      setErr("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toogleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative flex justify-center items-start h-full bg-white overflow-y-auto">
      <section className="w-full max-w-lg px-8 py-16 rounded-lg">
        <h2 className="text-2xl text-center font-semibold mb-1 text-primary select-none">
          Sign up {formData.role === "jobSeeker" ? "to get hired!" : "to hire!"}
        </h2>
        <p className="text-greyish text-center text-sm mb-5 select-none">
          Create an account to get started.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col pb-4 border-gray-300 gap-4 mt-4"
        >
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="floating-input py-2 px-5 text-sm rounded-md w-full "
                placeholder=""
                value={formData.firstName}
                onChange={handleChange}
              />
              <label
                htmlFor="firstName"
                className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
              >
                First Name <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="floating-input py-2 px-5 text-sm rounded-md w-full   "
                placeholder=""
                value={formData.lastName}
                onChange={handleChange}
              />
              <label
                htmlFor="lastName"
                className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="floating-input py-2 px-5 text-sm rounded-md w-full"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
            >
              Email <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="floating-input py-2 px-5 text-sm rounded-md w-full  "
              placeholder=""
              value={formData.phone}
              onChange={handleChange}
            />
            <label
              htmlFor="phone"
              className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Role-specific fields */}
          {formData.role === "jobSeeker" ? (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  className="floating-input py-2 px-5 text-sm rounded-md w-full  "
                  placeholder=""
                  value={jobSeekerDetails.profession}
                  onChange={handleJobSeekerDetailsChange}
                />
                <label
                  htmlFor="profession"
                  className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
                >
                  Profession <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="bio"
                  name="bio"
                  className="floating-input py-2 px-5 text-sm rounded-md w-full   min-h-[100px]"
                  placeholder=""
                  value={jobSeekerDetails.bio}
                  onChange={handleJobSeekerDetailsChange}
                />
                <label
                  htmlFor="bio"
                  className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
                >
                  Bio <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="floating-input py-2 px-5 text-sm rounded-md w-full  "
                  placeholder=""
                  value={recruiterDetails.companyName}
                  onChange={handleRecruiterDetailsChange}
                />
                <label
                  htmlFor="companyName"
                  className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="companyAddress"
                  name="companyAddress"
                  className="floating-input py-2 px-5 text-sm rounded-md w-full  "
                  placeholder=""
                  value={recruiterDetails.companyAddress}
                  onChange={handleRecruiterDetailsChange}
                />
                <label
                  htmlFor="companyAddress"
                  className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
                >
                  Company Address <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  className="floating-input py-2 px-5 text-sm rounded-md w-full  "
                  placeholder=""
                  value={recruiterDetails.companyWebsite}
                  onChange={handleRecruiterDetailsChange}
                />
                <label
                  htmlFor="companyWebsite"
                  className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
                >
                  Company Website <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="positionInCompany"
                  name="positionInCompany"
                  className="floating-input py-2 px-5 text-sm rounded-md w-full  "
                  placeholder=""
                  value={recruiterDetails.positionInCompany}
                  onChange={handleRecruiterDetailsChange}
                />
                <label
                  htmlFor="positionInCompany"
                  className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
                >
                  Position in Company <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          )}

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="floating-input py-2 px-5 text-sm rounded-md w-full  "
              placeholder=""
              value={formData.password}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-4 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? (
                <HugeiconsIcon
                  icon={ViewOffSlashIcon}
                  className="h-5 w-5 text-gray-700"
                />
              ) : (
                <HugeiconsIcon
                  icon={ViewIcon}
                  className="h-5 w-5 text-gray-700"
                />
              )}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="floating-input py-2 px-5 text-sm rounded-md w-full"
              placeholder=""
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label
              htmlFor="confirmPassword"
              className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <span
              onClick={toogleConfirmPasswordVisibility}
              className="absolute top-4 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showConfirmPassword ? (
                <HugeiconsIcon
                  icon={ViewOffSlashIcon}
                  className="h-5 w-5 text-gray-700"
                />
              ) : (
                <HugeiconsIcon
                  icon={ViewIcon}
                  className="h-5 w-5 text-gray-700"
                />
              )}
            </span>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center select-none">
            <input
              type="checkbox"
              id="terms"
              name="isTermsAndConditionsAccepted"
              checked={formData.isTermsAndConditionsAccepted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isTermsAndConditionsAccepted: e.target.checked,
                })
              }
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700 select-none cursor-pointer"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <input
            type="submit"
            className="bg-primary hover:bg-primary-dark transition text-white font-semibold py-3 px-4 rounded cursor-pointer text-sm select-none"
            value={loading ? "Signing up..." : "Sign up"}
            disabled={loading || success}
          />
        </form>

        {err && (
          <p className="w-full bg-red-100 text-red-500 text-center text-sm font-medium rounded-md p-2.5 sm:p-3 max-sm:text-sm">
            {err}
          </p>
        )}
        {success && (
          <p className="w-full bg-green-100 text-green-500 text-center text-sm font-medium rounded-md p-2.5 sm:p-3 max-sm:text-sm">
            Sign up successful! Redirecting...
          </p>
        )}

        <OAuthOptions />

        <div className="flex justify-center items-center gap-x-2 mt-4 select-none">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex justify-center items-center gap-x-2 my-2 select-none">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <p className=" text-gray-500 text-nowrap text-xs">Or</p>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        {/* Role toggle link */}
        <div className="text-center select-none">
          <p className="text-sm text-gray-600">
            {formData.role === "jobSeeker" ? (
              <>
                Want to hire?{" "}
                <button
                  type="button"
                  onClick={toggleRole}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  Sign up as a recruiter
                </button>
              </>
            ) : (
              <>
                Looking for a job?{" "}
                <button
                  type="button"
                  onClick={toggleRole}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  Sign up as a job seeker
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUpForm;
