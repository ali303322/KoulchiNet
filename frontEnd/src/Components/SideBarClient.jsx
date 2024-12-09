// import React from 'react'

import { Link } from "react-router-dom";

export default function SideBarClient() {
  return (
    <div className="w-80 bg-[#4a69bd] text-white">
    <nav className="pt-12 px-16">

    <Link to="/ClientDashboard" className="flex items-center space-x-4 text-lg mb-12">
    <i className="fas fa-user w-6"></i>
    <span>Profil</span>
  </Link>

  <Link to="#" className="flex items-center space-x-4 text-lg mb-12">
    <i className="fas fa-envelope w-6"></i>
    <span>Messages</span>
  </Link>

  <Link to="/ClientDashboard/securityClient" className="flex items-center space-x-4 text-lg mb-12">
    <i className="fas fa-lock w-6"></i>
    <span>Sécurité</span>
  </Link>

  <Link to="/ClientDashboard/HistoriqueClient" className="flex items-center space-x-4 text-lg mb-12">
    <i className="fas fa-history w-6"></i>
    <span>Historique</span>
  </Link>

  <div className="mt-auto pt-32">
    <Link to="/apropo" className="flex items-center space-x-4 text-lg text-white/80 hover:text-white">

      <i className="fas fa-sign-out-alt w-6"></i>
      <span>Se déconnecter</span>
    </Link>
  </div>
    </nav>
  </div>
  )
}
