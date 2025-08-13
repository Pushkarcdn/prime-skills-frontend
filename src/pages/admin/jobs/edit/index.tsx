/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import hitApi from "../../../../api/axios";
import { PrimaryButton } from "../../../../components/ui/Buttons";
import JobForm from "../new/JobForm";
import Loader from "../../../../components/ui/Loader";

const EditJob = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);

  const [fetchingRecruiters, setFetchingRecruiters] = useState(true);
  const [recruiters, setRecruiters] = useState([]) as any;

  interface JobFormData {
    recruiterId: string;
    title: string;
    slug: string;
    jobDescription: string;
    jobRequirements: string;
    salary: string | number | null;
    isSalaryNegotiable: boolean;
    currency: string;
    companyBenefits: string;
    timing: string;
    level: string;
    industry: string;
    locationType: string;
    vacancy: number;
    urgency: string;
    deadline: string;
    isActive: boolean;
  }

  const [formData, setFormData] = useState<JobFormData>({
    recruiterId: "",
    title: "",
    slug: "",
    jobDescription: "",
    jobRequirements: "",
    salary: null,
    isSalaryNegotiable: false,
    currency: "",
    companyBenefits: "",
    timing: "",
    level: "",
    industry: "",
    locationType: "",
    vacancy: 1,
    urgency: "normal",
    deadline: "",
    isActive: true,
  });

  // Fetch recruiters and job data on component mount
  useEffect(() => {
    if (!slug) return;
    const fetchRecruiters = async () => {
      try {
        setFetchingRecruiters(true);
        const response = await hitApi("/users", "GET");

        if (response?.success) {
          const data = response?.data?.filter(
            (user: any) => user.role === "recruiter"
          );
          setRecruiters(data || []);
        } else {
          toast.error("Failed to fetch recruiters");
        }
      } catch (error: any) {
        toast.error(
          error?.message || "An error occurred while fetching recruiters"
        );
      } finally {
        setFetchingRecruiters(false);
      }
    };

    const fetchJobData = async () => {
      try {
        const response = await hitApi(`/jobs/${slug}`, "GET");

        if (response?.success) {
          const jobData = response?.data;

          // Set job data
          setFormData({
            recruiterId: jobData.recruiterId || "",
            title: jobData.title || "",
            slug: jobData.slug || "",
            jobDescription: jobData.jobDescription || "",
            jobRequirements: jobData.jobRequirements || "",
            salary:
              jobData.salary !== undefined && jobData.salary !== null
                ? jobData.salary.toString()
                : "",
            isSalaryNegotiable: jobData.isSalaryNegotiable || false,
            currency: jobData.currency || "",
            companyBenefits: jobData.companyBenefits || "",
            timing: jobData.timing || "",
            level: jobData.level || "",
            industry: jobData.industry || "",
            locationType: jobData.locationType || "",
            vacancy: jobData.vacancy || 1,
            urgency: jobData.urgency || "normal",
            deadline: jobData.deadline || "",
            isActive: jobData.isActive !== false, // Default to true if undefined
          });
        } else {
          toast.error("Failed to fetch job data");
        }
      } catch (error: any) {
        toast.error(
          error?.message || "An error occurred while fetching job data"
        );
      }
    };

    fetchRecruiters();
    fetchJobData();
  }, [slug]);

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

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData({ ...formData, [field]: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate required fields
      const requiredFields = [
        "recruiterId",
        "title",
        "slug",
        "jobDescription",
        "jobRequirements",
        "currency",
        "timing",
        "level",
        "industry",
        "locationType",
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          toast.error(
            `${
              field.charAt(0).toUpperCase() +
              field.slice(1).replace(/([A-Z])/g, " $1")
            } is required!`
          );
          return;
        }
      }

      // Validate slug format
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(formData.slug)) {
        toast.error(
          "Slug must contain only lowercase letters, numbers, and hyphens!"
        );
        return;
      }

      setLoading(true);

      // Prepare form data
      const payload = { ...formData };

      // Convert salary to number if present
      if (typeof payload.salary === "string" && payload.salary.trim() !== "") {
        const numSalary = Number(payload.salary);
        payload.salary = !isNaN(numSalary) ? numSalary : null;
      } else if (!payload.salary) {
        payload.salary = null;
      }

      // Convert vacancy to number
      payload.vacancy = Number(payload.vacancy || 1);

      const res = await hitApi(`/jobs/${slug}`, "PUT", payload);

      if (res?.success) {
        toast.success("Job updated successfully!");
        setTimeout(() => {
          navigate("/admin/jobs");
        }, 2000);
      } else {
        toast.error(res?.message || "Failed to update job");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingRecruiters) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Edit Job</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <JobForm
          formData={formData}
          onChange={handleChange}
          onCheckboxChange={handleCheckboxChange}
          recruiters={recruiters}
        />

        <div className="pt-[0.5px] bg-gray-300 mt-10" />

        <div className="flex justify-end">
          <PrimaryButton
            title={loading ? "Updating..." : "Update Job"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditJob;
