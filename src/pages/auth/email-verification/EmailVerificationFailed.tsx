import { Link } from "react-router-dom";

const EmailVerificationFailed = () => {
  return (
    <div className="relative flex items-center justify-center h-full bg-white overflow-y-auto">
      <section className="w-full max-w-lg p-8 rounded-lg">
        <h2 className="text-2xl text-center font-semibold mb-2 text-primary select-none">
          Email verification failed
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6 select-none">
          We couldn&apos;t verify your email. The verification link may be
          invalid or expired.
        </p>

        <img
          src="/illustrations/failed.svg"
          alt="Email verification failed illustration"
          className="w-100 h-50 mx-auto mb-6 select-none"
        />

        <div className="flex flex-col gap-3">
          <Link
            to="/auth/sign-in"
            className="bg-primary hover:bg-primary-dark transition text-white font-semibold py-3 px-4 rounded text-sm text-center select-none"
          >
            Back to sign in
          </Link>
          <Link
            to="/auth/sign-up"
            className="text-primary font-medium hover:underline text-center text-sm select-none"
          >
            Create a new account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EmailVerificationFailed;
