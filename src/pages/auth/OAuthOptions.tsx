import { Link } from "react-router-dom";
import config from "../../config/index";

const OAuthOptions = () => {
  return (
    <>
      {/* OAuth Options */}
      <div className="flex justify-center items-center gap-x-2 mt-2 select-none">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <p className="text-sm text-gray-500 text-nowrap">Or continue with</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
      {/* OAuth Options button */}
      <div className="flex justify-center mb-2 mt-4 gap-x-6 select-none">
        {["google", "linkedin", "facebook"].map((item) => (
          <Link
            to={`${config.API_URL}/auth/${item}`}
            key={item}
            type="button"
            className="bg-white hover:bg-gray-50 transition-colors duration-300 py-2 px-4 w-full rounded-2xl flex items-center justify-center text-center border border-gray-200"
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
    </>
  );
};

export default OAuthOptions;
