// import React from 'react'

import SIdeBar from "./SIdeBar";
// import SideBarPres from "./SideBarPres";
import img3 from "./image/img3.png";
export default function ClientDetails() {
  return (
    <div className="bg-gray-100 flex min-h-screen">
    <SIdeBar/>
    {/* Main Content */}
    <div className="flex-1 p-8 flex justify-center">
      <div className="max-w-5xl w-full mt-32">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Account details:</h2>

          <div className="flex items-start space-x-8">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden bg-blue-200 flex-shrink-0">
              <img src={img3} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Nom:</p>
                  <p className="font-medium">Belzaar</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Prenom:</p>
                  <p className="font-medium">Hatim</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Ville:</p>
                  <p className="font-medium">Tanger</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Quartier:</p>
                  <p className="font-medium">Charf</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button className="px-6 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
