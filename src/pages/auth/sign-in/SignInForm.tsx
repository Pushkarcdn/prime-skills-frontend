import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";

const SignInForm = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const res = await signIn(formData);

    if (res?.success) {
      setErr("");
      setSuccess(true);
      navigate("/");
    } else {
      setErr(res?.message);
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center h-full bg-white overflow-y-auto">
      <section className="w-full max-w-lg p-8 rounded-lg">
        <h2 className="text-2xl text-center font-semibold mb-2 text-primary">
          Sign in
        </h2>
        <p className="text-greyish text-center text-sm mb-4">
          Enter your login credentials.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col pb-4 border-gray-300 gap-4 mt-4"
        >
          <div className="relative">
            <input
              type="text"
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

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="floating-input py-2 px-5 text-sm rounded-md w-full"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
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

          <div className="flex justify-end items-center text-xs">
            <Link
              to="/forgot-password"
              className="text-primary font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <input
            type="submit"
            className="bg-primary hover:bg-primary-dark transition text-white font-semibold py-3 px-4 rounded cursor-pointer text-sm"
            value={loading ? "Signing in..." : "Sign in"}
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
            Sign in successful! Redirecting...
          </p>
        )}

        <div className="flex justify-center items-center gap-x-2 mt-2">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <p className="text-sm text-gray-500 text-nowrap">Or sign in with</p>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>
        {/* Sign in with Google button */}
        <div className="flex justify-between mb-2 mt-4 gap-x-6">
          {["google", "facebook", "linkedin"].map((item) => (
            <Link
              to={`/auth/${item}`}
              key={item}
              type="button"
              className="bg-white hover:bg-gray-50 transition-colors duration-300 py-2 px-4 rounded-2xl w-full flex items-center justify-center text-center border border-gray-200"
            >
              <img
                src={`/o-auth-icons/${item}.png`}
                alt={item}
                width={30}
                height={30}
                className="mr-2 object-contain"
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-x-2 mt-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignInForm;
