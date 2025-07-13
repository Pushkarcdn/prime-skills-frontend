/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatCamelCase } from "../../../../utils/stringFormatters";

const UserRoleSelector = ({ selectedRole, onChange }: any) => {
  return (
    <div className="rounded-md">
      <div className="flex items-center gap-3 select-none">
        {["jobSeeker", "recruiter", "admin"].map((role) => (
          <label
            key={role}
            className={`flex items-center justify-center py-2 px-4 rounded-md cursor-pointer border ${
              selectedRole === role
                ? "bg-primary-light border-primary"
                : "bg-white border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="role"
              value={role}
              checked={selectedRole === role}
              onChange={onChange}
              className="sr-only"
            />
            <span>
              {role === "jobSeeker" ? "Job seeker" : formatCamelCase(role)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserRoleSelector;
