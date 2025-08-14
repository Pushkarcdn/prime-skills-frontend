import { Link } from "react-router-dom";
import config from "../../config/index";

const OAuthOptions = () => {
  return (
    <>
      {/* OAuth Options */}
      <div className="flex justify-center items-center gap-x-2 select-none">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <p className="text-sm text-gray-500 text-nowrap">Or</p>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
      {/* OAuth Options button */}
      <div className="flex justify-center mb-2 mt-3 gap-x-6 select-none">
        {["google"].map((item) => (
          <Link
            to={`${config.API_URL}/auth/${item}`}
            key={item}
            type="button"
            className="bg-white hover:bg-gray-50 transition-colors duration-300 py-3 px-4 w-full rounded-2xl flex items-center justify-center gap-3 text-center shadow-sm shadow-gray-100 text-gray-700 border border-gray-100"
          >
            <img
              src={`/o-auth-icons/${item}.png`}
              alt={item}
              width={25}
              height={25}
              className="mr-2 object-contain"
            />
            <span className="text-sm font-medium">Continue with {item}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default OAuthOptions;
