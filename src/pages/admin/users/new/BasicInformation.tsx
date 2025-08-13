/* eslint-disable @typescript-eslint/no-explicit-any */

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";

const BasicInformation = ({
  formData,
  onChange,
  showPassword,
  togglePasswordVisibility,
  passwordEditable,
}: any) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Basic Information</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.firstName}
            onChange={onChange}
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
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.lastName}
            onChange={onChange}
          />
          <label
            htmlFor="lastName"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.username}
            onChange={onChange}
          />
          <label
            htmlFor="username"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Username <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.email}
            onChange={onChange}
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
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.phone}
            onChange={onChange}
          />
          <label
            htmlFor="phone"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Phone
          </label>
        </div>

        <div className="relative">
          <input
            type="date"
            id="dob"
            name="dob"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.dob}
            onChange={onChange}
          />
          <label
            htmlFor="dob"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Date of Birth
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="temporaryAddress"
            name="temporaryAddress"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.temporaryAddress}
            onChange={onChange}
          />
          <label
            htmlFor="temporaryAddress"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Temporary Address
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="permanentAddress"
            name="permanentAddress"
            className="floating-input py-2 px-5 text-sm rounded-md w-full"
            placeholder=""
            value={formData.permanentAddress}
            onChange={onChange}
          />
          <label
            htmlFor="permanentAddress"
            className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
          >
            Permanent Address
          </label>
        </div>

        {passwordEditable && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="floating-input py-2 px-5 text-sm rounded-md w-full"
              placeholder=""
              value={formData.password}
              onChange={onChange}
            />
            <label
              htmlFor="password"
              className="floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 -translate-y-1/2 right-0 pr-3 flex items-center cursor-pointer"
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
        )}

        <div className="relative select-none">
          <div className="px-3 text-sm rounded-md w-full">
            <label className="block text-gray-500 text-sm mb-2">Gender</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={onChange}
                  className="h-4 w-4 text-primary"
                />
                <span className="ml-2 text-sm">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={onChange}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2 text-sm">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={onChange}
                  className="form-radio h-4 w-4 text-primary"
                />
                <span className="ml-2 text-sm">Other</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
