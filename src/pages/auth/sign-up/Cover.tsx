import professional from "../../../assets/images/professional.jpg";

const Cover = () => {
  return (
    <div className="hidden lg:block overflow-hidden relative">
      <img
        src={professional}
        alt="sign-in"
        className="w-full h-full object-top object-cover"
      />
      <div className="absolute h-full inset-0 bg-gradient-to-b from-transparent to-black/100 flex flex-col justify-end p-16 gap-4">
        <h1 className="text-white text-3xl font-bold flex items-center gap-2">
          Search or become a professional!
        </h1>
        <p className="text-white text-sm max-w-2xl">
          Connect with professionals, showcase your skills, and find or offer
          services all in one platform. Whether you're looking for expertise or
          to offer your services, we've got you covered.
        </p>
      </div>
    </div>
  );
};

export default Cover;
