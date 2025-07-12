import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Homepage = () => {
  const { isSignedIn, isFinished } = useAuth();

  if (!isFinished) return <div></div>;

  if (!isSignedIn) return <Navigate to="/auth/sign-in" />;

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold text-green-500">
        This is the homepage
      </h1>
    </div>
  );
};

export default Homepage;
