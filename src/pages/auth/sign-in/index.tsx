import Cover from "./Cover";
import SignInForm from "./SignInForm";

const SignIn: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <Cover />
      <SignInForm />
    </section>
  );
};

export default SignIn;
