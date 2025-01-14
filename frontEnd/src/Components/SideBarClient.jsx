// import React from 'react'

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function SideBarClient() {

    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogout = () => {
      // Clear any authentication data, like JWT tokens, from localStorage or sessionStorage
      localStorage.clear();
      sessionStorage.clear();


      navigate("/");
    };


    const { t } = useTranslation();
  return (
    <div className="w-80 bg-[#4a69bd] text-white">
      <nav className="pt-12 px-16">
        <Link to="/ClientDashboard" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-user w-6"></i>
          <span>{t("clientDash.profile")}</span>
        </Link>

        <Link to="/chat" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-envelope w-6"></i>
          <span>{t("clientDash.messages")}</span>
        </Link>

        <Link to="/ClientDashboard/securityClient" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-lock w-6"></i>
          <span>{t("clientDash.security")}</span>
        </Link>

        <Link to="/ClientDashboard/HistoriqueClient" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-history w-6"></i>
          <span>{t("clientDash.history")}</span>
        </Link>

        <div className="mt-auto pt-32">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 text-lg text-white/80 hover:text-white"
          >
            <i className="fas fa-sign-out-alt w-6"></i>
            <span>{t("clientDash.logout")}</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
