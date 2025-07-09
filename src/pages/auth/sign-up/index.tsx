import Cover from "./Cover";
import SignUpForm from "./SignUpForm";

const SignUp: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <Cover />
      <SignUpForm />
    </section>
  );
};

export default SignUp;
