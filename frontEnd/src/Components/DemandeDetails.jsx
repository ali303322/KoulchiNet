// import React from 'react'

import SIdeBar from "./SIdeBar";
import img3 from "./image/img3.png";
import img2 from "./image/img2.jpeg";
export default function DemandeDetails() {
  return (
    <div className="bg-gray-100 flex min-h-screen">
     <SIdeBar/>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Account details:</h2>

          <div className="flex items-start space-x-8">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-pink-200 flex-shrink-0">
              <img src={img3} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Nom:</p>
                  <p className="font-medium">Reda</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Prenom:</p>
                  <p className="font-medium">Ahmed</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Ville:</p>
                  <p className="font-medium">Casablanca</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Quartier:</p>
                  <p className="font-medium">Anfa</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Disponibilite:</p>
                  <p className="font-medium">Lundi - Vendredi 08:00h - 18:00h</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Service:</p>
                  <p className="font-medium">Plombier</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <button className="px-6 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors">
                  Delete
                </button>
                <a
                  href="upgradedemande.html"
                  className="px-6 py-2 bg-[#4a69bd] text-white rounded-full text-sm hover:bg-blue-700 transition-colors text-center"
                >
                  Upgrade
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[#4a69bd] text-lg font-medium mb-4">Fichier telecharge:</h3>
          <div className="grid grid-cols-4 gap-6">
            {Array(4)
              .fill({img2})
              .map((src, index) => (
                <div key={index} className="w-40 h-40 rounded-lg overflow-hidden">
                  <img src={img2} alt={`File ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
