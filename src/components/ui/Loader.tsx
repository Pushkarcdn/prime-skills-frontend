// components/FullPageLoader.js
const Loader = () => {
  return (
    <div className="w-full py-52 flex-grow inset-0 bg-opacity-100 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
