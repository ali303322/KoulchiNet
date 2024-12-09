// import React from 'react'

import { Link } from "react-router-dom";

export default function SIdeBar() {
  return (
    <div className="flex min-h-screen">
          {/* Sidebar */}
        <div className="w-80 bg-[#4a69bd] text-white">
            <nav className="pt-12 px-16">
             {/* Sidebar Links */}
                {[
                { href: "/AdminDashboard", icon: "fa-file-alt", label: "Demande" },
                { href: "/AdminDashboard/GestionPrestataire", icon: "fa-users", label: "Gestion des prestataires" },
                { href: "/AdminDashboard/GestionClient", icon: "fa-user-friends", label: "Gestion des clients" },
                { href: "/AdminDashboard/GestionProduit", icon: "fa-box", label: "Gestion des produits" },
                { href: "/AdminDashboard/GestionContenu", icon: "fa-file-alt", label: "Gestion de contenu" },
                ].map((link, index) => (
                <Link
                    key={index}
                    to={link.href}
                    className="flex items-center space-x-4 text-lg mb-12"
                >
                    <i className={`fas ${link.icon} w-6`}></i>
                    <span>{link.label}</span>
                </Link>
                ))}
              {/* Logout */}
              <div className="mt-auto pt-32">
                <Link
                  to="/"
                  className="flex items-center space-x-4 text-lg text-white/80 hover:text-white"
                >
                  <i className="fas fa-sign-out-alt w-6"></i>
                  <span>Se déconnecter</span>
                </Link>
              </div>
            </nav>
        </div>
    </div>
  )
}
