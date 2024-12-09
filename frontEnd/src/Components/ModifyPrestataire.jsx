// import React from 'react'

import { useEffect, useState } from "react";

export default function ModifyPrestataire() {
    const [profileData, setProfileData] = useState({
        nom: 'Reda',
        prenom: 'Ahmed',
        ville: 'Casablanca',
        quartier: 'Anfa',
        disponibilite: 'Lundi - Vendredi 08:00h - 18:00h',
        service: 'Plombier',
      });

      // Load existing data when the component mounts
      useEffect(() => {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
          setProfileData(JSON.parse(savedData));
        }
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const saveChanges = () => {
        // Save data to localStorage
        localStorage.setItem('profileData', JSON.stringify(profileData));
        // Redirect to dashboard
        window.location.href = 'prestatairedash.html';
      };

      return (
        <main className="p-8 bg-[#f0f2f5] font-sans">
          {/* Profile Information Card */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center mb-8">
              {/* Profile Picture */}
              <div className="w-[150px] h-[150px] bg-[#e9ecef] rounded-full flex items-center justify-center text-5xl text-[#6c757d] mr-8">
                AD
              </div>
              {/* Profile Info */}
              <div>
                <h1 className="text-[#333] text-2xl font-bold m-0">Alice Dubois</h1>
                <p className="text-[#6c757d] my-2">Administratrice Principale</p>
                <p className="text-[#6c757d] my-2">alice.dubois@projectx.com</p>
                <p className="text-[#6c757d] my-2">Membre depuis: Janvier 2022</p>
              </div>
            </div>

            <h2 className="text-[#4a90e2] text-xl font-semibold mt-0 mb-6">
              Informations personnelles
            </h2>

            <form id="profile-form" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={profileData.nom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prenom"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Prenom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={profileData.prenom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ville"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    id="ville"
                    name="ville"
                    value={profileData.ville}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quartier"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Quartier
                  </label>
                  <input
                    type="text"
                    id="quartier"
                    name="quartier"
                    value={profileData.quartier}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="disponibilite"
                  className="block text-sm font-bold text-gray-700 mb-1"
                >
                  Disponibilité
                </label>
                <input
                  type="text"
                  id="disponibilite"
                  name="disponibilite"
                  value={profileData.disponibilite}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-bold text-gray-700 mb-1"
                >
                  Service
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={profileData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#e9ecef] flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => (window.location.href = 'prestatairedash.html')}
                  className="px-4 py-2 border border-[#ced4da] rounded-md text-[#6c757d] hover:bg-gray-50 font-bold"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={saveChanges}
                  className="px-4 py-2 bg-[#4a90e2] text-white rounded-md hover:bg-[#357abd] font-bold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>

          {/* Activity Log Card */}
          <div className="bg-white rounded-lg p-4 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <h2 className="text-[#4a90e2] text-xl font-semibold mt-0 mb-4">
              Journal d &rsquo;activité récente
            </h2>

            <div className="max-h-[300px] overflow-y-auto">
              <div className="py-2 border-b border-[#e9ecef] last:border-b-0">
                <strong>19/05/2023 14:30</strong> - Mise à jour du statut d &rsquo;un
                service
              </div>
              <div className="py-2 border-b border-[#e9ecef] last:border-b-0">
                <strong>18/05/2023 11:15</strong> - Ajout d &rsquo;un nouveau prestataire
              </div>
              <div className="py-2 border-b border-[#e9ecef] last:border-b-0">
                <strong>17/05/2023 16:45</strong> - Résolution d &rsquo;un litige client
              </div>
              <div className="py-2 border-b border-[#e9ecef] last:border-b-0">
                <strong>16/05/2023 09:00</strong> - Génération du rapport mensuel
              </div>
              <div className="py-2 border-b border-[#e9ecef] last:border-b-0">
                <strong>15/05/2023 13:20</strong> - Modification des paramètres de
                facturation
              </div>
            </div>
          </div>
        </main>
    )
}

