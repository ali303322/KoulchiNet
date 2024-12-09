// import React from 'react'

import { useState } from "react";

export default function EditContenu() {
    const [typeInputs, setTypeInputs] = useState([1]);
    const maxInputs = 10;

    const addInput = (inputs, setInputs) => {
      if (inputs.length < maxInputs) {
        setInputs([...inputs, inputs.length + 1]);
      }
    };

    const removeInput = (index, inputs, setInputs) => {
      setInputs(inputs.filter((_, i) => i !== index));
    };

    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-80 bg-[#4a69bd] text-white">
          <nav className="pt-12 px-16">
            <a href="/admindash" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-file-alt w-6"></i>
              <span>Demande</span>
            </a>
            <a href="/gestionPres" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-users w-6"></i>
              <span>Gestion des prestataires</span>
            </a>
            <a href="/gestionClient" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-user-friends w-6"></i>
              <span>Gestion des clients</span>
            </a>
            <a href="/gestionProduit" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-box w-6"></i>
              <span>Gestion des produits</span>
            </a>
            <a href="/gestionContenu" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-file-alt w-6"></i>
              <span>Gestion de contenu</span>
            </a>
            <div className="mt-auto pt-32">
              <a
                href="/apropo"
                className="flex items-center space-x-4 text-lg text-white/80 hover:text-white"
              >
                <i className="fas fa-sign-out-alt w-6"></i>
                <span>Se déconnecter</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-medium text-[#4a69bd]">Modifier le Service</h3>
            </div>

            {/* Form */}
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre:</label>
                  <input
                    type="text"
                    defaultValue="Current Title"
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slogan:</label>
                  <input
                    type="text"
                    defaultValue="Current Slogan"
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image:</label>
                  <div className="relative">
                    <input type="file" className="hidden" id="editServiceImage" />
                    <label
                      htmlFor="editServiceImage"
                      className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
                    >
                      <span className="text-gray-500">Télécharger l&rsquo;image</span>
                      <i className="fas fa-cloud-upload-alt text-gray-400"></i>
                    </label>
                  </div>
                </div>

                {/* Dynamic Inputs for Types */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium mb-2">Types de services:</label>
                  {typeInputs.map((input, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        defaultValue={`Current Type ${input}`}
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeInput(index, typeInputs, setTypeInputs)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  {typeInputs.length < maxInputs && (
                    <button
                      type="button"
                      onClick={() => addInput(typeInputs, setTypeInputs)}
                      className="mt-2 text-[#4a69bd] hover:text-[#364f9b] flex items-center"
                    >
                      <i className="fas fa-plus-circle mr-2"></i>
                      Add Type
                    </button>
                  )}
                </div>
              </form>

              {/* Submit Button */}
              <div className="flex justify-center mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="px-12 py-2 bg-[#4a69bd] text-white rounded-full text-sm"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
