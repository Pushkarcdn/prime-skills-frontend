import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LogoutModal from "../modals/LogoutModal";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout03Icon } from "@hugeicons/core-free-icons";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const success = await signOut();
    if (success) navigate("/");
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center gap-2 2xl:gap-4 py-3 xl:py-3.5 px-3 2xl:px-5 hover:bg-red-600 text-red-500 hover:text-white font-medium rounded-sm transition-all cursor-pointer text-sm"
        disabled={loading}
      >
        <HugeiconsIcon icon={Logout03Icon} size={22} strokeWidth={1.5} />
        <span>Logout</span>
      </button>

      <LogoutModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        action={handleLogout}
      />
    </>
  );
};

export default Logout;
