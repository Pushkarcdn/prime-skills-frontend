/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import hitApi from "../../../../api/axios";
import { formatCamelCase } from "../../../../utils/stringFormatters";
import { PrimaryButton } from "../../../../components/ui/Buttons";

import UserRoleSelector from "../new/UserRoleSelector";
import BasicInformation from "../new/BasicInformation";
import JobSeekerDetails from "../new/JobSeekerDetails";
import RecruiterDetails from "../new/RecruiterDetails";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);

  const [formData, setFormData] = useState({
    role: "jobSeeker",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetchingUser(true);
        const response = await hitApi(`/users/${id}`, "GET");

        if (response?.success) {
          const userData = response.data;

          // Set basic user data
          setFormData({
            role: userData.role,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone || "",
            dob: userData.dob || "",
            gender: userData.gender || "",
            temporaryAddress: userData.temporaryAddress || "",
            permanentAddress: userData.permanentAddress || "",
            isTermsAndConditionsAccepted:
              userData.isTermsAndConditionsAccepted || true,
          });

          // Set role specific data
          if (userData.role === "jobSeeker" && userData.jobSeekerDetails) {
            setJobSeekerDetails({
              bio: userData.jobSeekerDetails.bio || "",
              skills: userData.jobSeekerDetails.skills || [],
              profession: userData.jobSeekerDetails.profession || "",
              isOpenToWork: userData.jobSeekerDetails.isOpenToWork || false,
            });
          } else if (
            userData.role === "recruiter" &&
            userData.recruiterDetails
          ) {
            setRecruiterDetails({
              companyName: userData.recruiterDetails.companyName || "",
              companyAddress: userData.recruiterDetails.companyAddress || "",
              companyWebsite: userData.recruiterDetails.companyWebsite || "",
              aboutCompany: userData.recruiterDetails.aboutCompany || "",
              positionInCompany:
                userData.recruiterDetails.positionInCompany || "",
              isIndividualEmployer:
                userData.recruiterDetails.isIndividualEmployer || false,
              isCurrentlyHiring:
                userData.recruiterDetails.isCurrentlyHiring || false,
            });
          }
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error: any) {
        toast.error(
          error?.message || "An error occurred while fetching user data"
        );
      } finally {
        setFetchingUser(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate required fields
      const requiredFields = [
        "username",
        "firstName",
        "lastName",
        "email",
        "role",
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          toast.error(`${formatCamelCase(field)} is required!`);
          return;
        }
      }

      // Validate username format
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(formData.username)) {
        toast.error("Username must contain only letters and numbers!");
        return;
      }

      // Validate username length
      if (formData.username.length < 4 || formData.username.length > 32) {
        toast.error("Username must be between 4 and 32 characters!");
        return;
      }

      setLoading(true);

      const payload = { ...formData } as any;

      // Add role-specific details
      if (formData.role === "jobSeeker") {
        payload.jobSeekerDetails = jobSeekerDetails;
      } else if (formData.role === "recruiter") {
        payload.recruiterDetails = recruiterDetails;
      }

      const res = await hitApi(`/users/${id}`, "PUT", payload);

      if (res?.success) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/admin/users");
        }, 2000);
      } else {
        toast.error(res?.message || "Failed to update user");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return <div className="w-full text-center py-10">Loading user data...</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {/* User Role Selection */}
        <UserRoleSelector
          selectedRole={formData.role}
          onChange={handleChange}
        />

        {/* Basic Information */}
        <BasicInformation
          formData={formData}
          onChange={handleChange}
          passwordEditable={false}
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
            title={loading ? "Updating..." : "Update User"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
