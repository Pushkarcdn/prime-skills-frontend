/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hitApi from "../../../../api/axios";
import { formatCamelCase } from "../../../../utils/stringFormatters";
import { PrimaryButton } from "../../../../components/ui/Buttons";

import UserRoleSelector from "./UserRoleSelector";
import BasicInformation from "./BasicInformation";
import JobSeekerDetails from "./JobSeekerDetails";
import RecruiterDetails from "./RecruiterDetails";
import ProfileImageUpload from "./ProfileImageUpload";

const NewUser = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    role: "jobSeeker",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
    dob: "",
    gender: "",
    temporaryAddress: "",
    permanentAddress: "",
    isTermsAndConditionsAccepted: true,
  }) as any;

  const [jobSeekerDetails, setJobSeekerDetails] = useState({
    bio: "",
    skills: [] as string[],
    profession: "",
    isOpenToWork: false,
  }) as any;

  const [recruiterDetails, setRecruiterDetails] = useState({
    companyName: "",
    companyAddress: "",
    companyWebsite: "",
    aboutCompany: "",
    positionInCompany: "",
    isIndividualEmployer: false,
    isCurrentlyHiring: false,
  }) as any;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleJobSeekerDetailsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setJobSeekerDetails({ ...jobSeekerDetails, [name]: checked });
    } else if (name === "skills") {
      // Handle skills as array
      const skillsArray = value.split(",").map((skill) => skill.trim());
      setJobSeekerDetails({ ...jobSeekerDetails, skills: skillsArray });
    } else {
      setJobSeekerDetails({ ...jobSeekerDetails, [name]: value });
    }
  };

  const handleRecruiterDetailsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setRecruiterDetails({ ...recruiterDetails, [name]: checked });
    } else {
      setRecruiterDetails({ ...recruiterDetails, [name]: value });
    }
  };

  const handleJobSeekerCheckboxChange = (field: string, checked: boolean) => {
    setJobSeekerDetails({ ...jobSeekerDetails, [field]: checked });
  };

  const handleRecruiterCheckboxChange = (field: string, checked: boolean) => {
    setRecruiterDetails({ ...recruiterDetails, [field]: checked });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (file: any) => {
    setFormData({ ...formData, profileImage: file });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");

    try {
      // Validate required fields
      const requiredFields = [
        "username",
        "firstName",
        "lastName",
        "email",
        "password",
        "role",
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          setErr(`${formatCamelCase(field)} is required!`);
          return;
        }
      }

      // Validate username format
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(formData.username)) {
        setErr("Username must contain only letters and numbers!");
        return;
      }

      // Validate username length
      if (formData.username.length < 4 || formData.username.length > 32) {
        setErr("Username must be between 4 and 32 characters!");
        return;
      }

      setLoading(true);
      setSuccess(false);

      const payload = { ...formData } as any;

      // Add role-specific details
      if (formData.role === "jobSeeker") {
        payload.jobSeekerDetails = jobSeekerDetails;
      } else if (formData.role === "recruiter") {
        payload.recruiterDetails = recruiterDetails;
      }

      const res = await hitApi("/users", "POST", payload);

      if (res?.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/users");
        }, 2000);
      } else {
        setErr(res?.message || "Failed to create user");
      }
    } catch (error: any) {
      setErr(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Create New User</h2>

      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {/* User Role Selection */}
        <UserRoleSelector
          selectedRole={formData.role}
          onChange={handleChange}
        />

        <ProfileImageUpload
          profileImage={formData.profileImage}
          onImageChange={handleImageChange}
        />

        {/* Basic Information */}
        <BasicInformation
          formData={formData}
          onChange={handleChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        {/* Job Seeker Details */}
        {formData.role === "jobSeeker" && (
          <JobSeekerDetails
            jobSeekerDetails={jobSeekerDetails}
            onChange={handleJobSeekerDetailsChange}
            onCheckboxChange={handleJobSeekerCheckboxChange}
          />
        )}

        {/* Recruiter Details */}
        {formData.role === "recruiter" && (
          <RecruiterDetails
            recruiterDetails={recruiterDetails}
            onChange={handleRecruiterDetailsChange}
            onCheckboxChange={handleRecruiterCheckboxChange}
          />
        )}

        <div className="pt-[0.5px] bg-gray-300 mt-10 " />

        <div className="flex justify-end">
          <PrimaryButton
            title={loading ? "Creating..." : "Create User"}
            type="submit"
          />
        </div>
      </form>

      {err && (
        <p className="w-full bg-red-100 text-red-500 text-center text-sm font-medium rounded-md p-2.5 sm:p-3 my-4">
          {err}
        </p>
      )}

      {success && (
        <p className="w-full bg-green-100 text-green-500 text-center text-sm font-medium rounded-md p-2.5 sm:p-3 my-4">
          User created successfully!
        </p>
      )}
    </div>
  );
};

export default NewUser;
