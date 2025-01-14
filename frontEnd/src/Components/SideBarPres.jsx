import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function SideBarPres() {

    const { t } = useTranslation();

        const navigate = useNavigate(); // Use useNavigate instead of useHistory

      const handleLogout = () => {
        // Clear any authentication data, like JWT tokens, from localStorage or sessionStorage
        localStorage.clear();
        sessionStorage.clear();


        navigate("/");
      };


  return (
    <div className="w-80 bg-[#4a69bd] text-white">
      <nav className="pt-12 px-16">
        {/* Profile
        <Link
          to="/PrestataireDashboard"
          className="flex items-center space-x-4 text-lg mb-12"
        >
          <i className="fas fa-user w-6"></i>
          <span>{t("presDash.profile")}</span>
        </Link> */}

        {/* Messages */}
        <Link
          to="/PrestataireDashboard"
          className="flex items-center space-x-4 text-lg mb-12"
        >
          <i className="fas fa-user w-6"></i>
          <span>{t("presDash.profile")}</span>
        </Link>
        {/* Messages */}
        <Link
          to="/chat"
          className="flex items-center space-x-4 text-lg mb-12"
        >
          <i className="fas fa-envelope w-6"></i>
          <span>{t("presDash.messages")}</span>
        </Link>

        {/* Security */}
        <Link
          to="/PrestataireDashboard/security"
          className="flex items-center space-x-4 text-lg mb-12"
        >
          <i className="fas fa-lock w-6"></i>
          <span>{t("presDash.security")}</span>
        </Link>

        {/* Plans */}
        <Link
          to="/PrestataireDashboard/Plans"
          className="flex items-center space-x-4 text-lg mb-12"
        >
          <i className="fas fa-list w-6"></i>
          <span>{t("presDash.plans")}</span>
        </Link>

        {/* History */}
        <Link
          to="/PrestataireDashboard/Historique"
          className="flex items-center space-x-4 text-lg mb-12"
        >
          <i className="fas fa-history w-6"></i>
          <span>{t("presDash.history")}</span>
        </Link>

        {/* Logout */}
        <div className="mt-auto pt-32">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 text-lg text-white/80 hover:text-white"
          >
            <i className="fas fa-sign-out-alt w-6"></i>
            <span>{t("presDash.logout")}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
