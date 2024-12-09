// import React from 'react'
import { Link } from "react-router-dom";

export default function AddContenu() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
    {/* Sidebar */}
    <div className="w-80 bg-[#4a69bd] text-white">
      <nav className="pt-12 px-16">
        {/* Links */}
        <Link to="/admindash" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-file-alt w-6"></i>
          <span>Demande</span>
        </Link>
        <Link to="/gestionPres" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-users w-6"></i>
          <span>Gestion des prestataires</span>
        </Link>
        <Link to="/gestionClient" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-user-friends w-6"></i>
          <span>Gestion des clients</span>
        </Link>
        <Link to="/gestionProduit" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-box w-6"></i>
          <span>Gestion des produits</span>
        </Link>
        <Link to="/gestionContenu" className="flex items-center space-x-4 text-lg mb-12">
          <i className="fas fa-file-alt w-6"></i>
          <span>Gestion de contenu</span>
        </Link>

        {/* Logout */}
        <div className="mt-auto pt-32">
          <Link to="/apropo" className="flex items-center space-x-4 text-lg text-white/80 hover:text-white">
            <i className="fas fa-sign-out-alt w-6"></i>
            <span>Se déconnecter</span>
          </Link>
        </div>
      </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h3 className="text-xl font-medium text-[#4a69bd]">Ajouter un Service</h3>
        </div>

        {/* Form Container */}
        <div className="p-6">
          <div className="max-h-[600px] overflow-y-auto pr-4" style={{ scrollbarWidth: "thin" }}>
            <form
              className="space-y-4"
            >
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium mb-2">Titre:</label>
                <input
                  type="text"
                  placeholder="Entrer le titre"
                  className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                />
              </div>

              {/* Slogan */}
              <div>
                <label className="block text-sm font-medium mb-2">Slogan:</label>
                <input
                  type="text"
                  placeholder="Entrer le slogan"
                  className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Image:</label>
                <div className="relative">
                  <input type="file" className="hidden" id="serviceImage" />
                  <label
                    htmlFor="serviceImage"
                    className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-gray-500">Télécharger l &rsquo;image</span>
                    <i className="fas fa-cloud-upload-alt text-gray-400"></i>
                  </label>
                </div>
              </div>

              {/* Introduction */}
              <div>
                <label className="block text-sm font-medium mb-2">Introduction:</label>
                <textarea
                  rows="4"
                  placeholder="Entrer le texte"
                  className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                ></textarea>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description:</label>
                <textarea
                  rows="4"
                  placeholder="Entrer le texte"
                  className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                ></textarea>
              </div>

              {/* Dynamic Sections */}
              {/* Add other dynamic sections like typeInputs, avantageInputs, and faqInputs similarly */}

              {/* Submit Button */}
              <div className="flex justify-center mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="px-12 py-2 bg-[#4a69bd] text-white rounded-full text-sm"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
