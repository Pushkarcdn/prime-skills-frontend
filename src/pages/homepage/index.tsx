import {
  PrimaryButton,
  PrimaryOutlineButton,
} from "../../components/ui/Buttons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  BriefcaseIcon,
  StarIcon,
  CheckmarkCircle01Icon,
  Search01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

const Homepage = () => {
  const features = [
    {
      icon: <HugeiconsIcon icon={Search01Icon} size={32} strokeWidth={1.5} />,
      title: "Find Professionals",
      description:
        "Discover skilled professionals across various industries and connect with the right talent for your projects.",
    },
    {
      icon: <HugeiconsIcon icon={BriefcaseIcon} size={32} strokeWidth={1.5} />,
      title: "Browse Jobs",
      description:
        "Explore opportunities that match your skills and career goals. Find your next great opportunity.",
    },
    {
      icon: <HugeiconsIcon icon={UserIcon} size={32} strokeWidth={1.5} />,
      title: "Showcase Skills",
      description:
        "Build your professional profile and highlight your expertise to attract potential clients and employers.",
    },
    {
      icon: <HugeiconsIcon icon={UserGroupIcon} size={32} strokeWidth={1.5} />,
      title: "Build Network",
      description:
        "Connect with like-minded professionals, expand your network, and grow your career opportunities.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Professionals" },
    { number: "5K+", label: "Jobs Posted" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Industries" },
  ];

  const benefits = [
    "Connect with verified professionals",
    "Access to exclusive job opportunities",
    "Secure payment processing",
    "24/7 customer support",
    "Portfolio showcase tools",
    "Advanced matching algorithms",
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-white component-px component-py">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connect with
                  <span className="text-primary block">Prime Skills</span>
                  Professionals
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Your gateway to professional excellence. Find skilled
                  professionals, showcase your talents, and discover
                  opportunities that match your expertise.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <PrimaryButton
                  title="Get Started"
                  link="/search"
                  className="!px-8 !py-4 text-base"
                />
                <PrimaryOutlineButton
                  title="Learn More"
                  link="/about"
                  className="!px-8 !py-4 text-base"
                />
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle01Icon}
                    size={20}
                    className="text-green-500"
                  />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle01Icon}
                    size={20}
                    className="text-green-500"
                  />
                  <span>Verified profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={CheckmarkCircle01Icon}
                    size={20}
                    className="text-green-500"
                  />
                  <span>Secure payments</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/src/assets/images/professional.jpg"
                  alt="Professional workspace"
                  className="rounded-2xl shadow-2xl w-full max-h-[80vh] h-auto object-cover object-top"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary-light rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white component-px py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 component-px component-py">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Prime Skills?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive platform that connects professionals
              with opportunities and helps businesses find the right talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white component-px component-py">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of professionals who trust Prime Skills to
                advance their careers and grow their businesses.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={20}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-light p-8 rounded-2xl">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={48}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600">
                  Join our community of professionals and take your career to
                  the next level.
                </p>
                <PrimaryButton
                  title="Join Now"
                  link="/search?query=jobs"
                  className="!px-8 !py-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary component-px component-py">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-primary-light">
              Whether you're looking for talent or opportunities, Prime Skills
              is your gateway to professional success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryOutlineButton
                title="Browse Professionals"
                link="/search?type=professionals"
                className="!border-white !text-white hover:!bg-white hover:!text-primary !px-8 !py-4"
              />
              <PrimaryButton
                title="Find Jobs"
                link="/search?query=jobs"
                className="!bg-white !text-primary hover:!bg-gray-100 !px-8 !py-4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
