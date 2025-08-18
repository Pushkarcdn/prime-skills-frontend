import { useNavigate } from "react-router-dom";
import { PrimaryOutlineButton } from "./Buttons";
import NotFoundImage from "../../assets/illustrations/not-found.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center w-full h-[calc(100dvh-100px)]">
      <section className="w-full max-w-xl p-8 text-center flex flex-col items-center justify-center">
        <img src={NotFoundImage} alt="Not found" width={360} />
        <h2 className="text-2xl font-semibold mt-2 select-none text-primary">
          Page not found
        </h2>
        <p className="text-gray-600 mt-3 text-sm select-none">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <PrimaryOutlineButton title="Go back" onClick={() => navigate(-1)} />
        </div>
      </section>
    </div>
  );
};

export default NotFound;
