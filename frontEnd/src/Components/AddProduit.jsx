// import React from 'react'

import { Link } from "react-router-dom";

export default function AddProduit() {
  return (
    <div className="bg-gray-100 flex min-h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-[#4a69bd] text-white">
        <nav className="pt-12 px-16">
          {/* Navigation Links */}
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
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="relative p-6 border w-[1000px] shadow-lg rounded-lg bg-white">
          {/* Title */}
          <h3 className="text-[#4a69bd] font-medium mb-6">Ajouter produit:</h3>

          {/* Form */}
          <div className="space-y-6">
            {/* Labels Row */}
            <div className="flex justify-between px-2">
              <label className="text-sm w-44 text-center">Product image:</label>
              <label className="text-sm w-44 text-center">Product name:</label>
              <label className="text-sm w-44 text-center">Product category:</label>
              <label className="text-sm w-44 text-center">Product link:</label>
              <label className="text-sm w-44 text-center">Product Price:</label>
            </div>

            {/* Input Fields Row */}
            <div className="flex justify-between space-x-4">
              {/* Upload Media */}
              <div className="relative w-44">
                <input type="file" className="hidden" id="addProductImage" />
                <label
                  htmlFor="addProductImage"
                  className="flex items-center px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50 w-full"
                >
                  <span className="text-gray-500 text-sm">Upload media</span>
                  <i className="fas fa-cloud-upload-alt ml-2 text-gray-400"></i>
                </label>
              </div>

              {/* Product Name */}
              <input
                type="text"
                placeholder="type product name"
                className="border rounded-full px-4 py-2 text-sm w-44"
              />

              {/* Product Category */}
              <select className="border rounded-full px-4 py-2 text-sm w-44">
                <option value="domestique">domestique</option>
                <option value="decoration">decoration</option>
                <option value="résidentielles">résidentielles</option>
              </select>

              {/* Product Link */}
              <input
                type="text"
                placeholder="type link"
                className="border rounded-full px-4 py-2 text-sm w-44"
              />

              {/* Product Price */}
              <input
                type="text"
                placeholder="price"
                className="border rounded-full px-4 py-2 text-sm w-44"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <Link
                to="/gestionProduit"
                className="px-12 py-2 bg-[#4a69bd] text-white rounded-full text-sm"
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
