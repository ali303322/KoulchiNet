// import React from 'react'

// import { useEffect, useState } from "react";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";

export default function Security() {
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // useEffect(() => {
    //   const handleClickOutside = (e) => {
    //     if (e.target.closest('#langBtn') === null) {
    //       setIsDropdownOpen(false);
    //     }
    //   };

    //   window.addEventListener('click', handleClickOutside);

    //   return () => {
    //     window.removeEventListener('click', handleClickOutside);
    //   };
    // }, []);

    return (
      <div className="bg-gray-100 font-sans">
        <HeaderPres/>

        {/* Main Content */}
        <div className="flex min-h-screen">
        <SideBarPres/>

          {/* Main Content Area */}
          <div className="flex-1 p-8">
            {/* Password Change Form */}
            <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-center text-[#4a69bd] mb-8">
                <i className="fas fa-lock mr-3"></i>
                <h2 className="text-xl font-medium">Modifier le mot de passe:</h2>
              </div>

              <form className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-gray-700 mb-2">Mot de passe actuel :</label>
                  <input
                    type="password"
                    placeholder="Saisissez votre mot de passe actuel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-gray-700 mb-2">Nouveau mot de passe :</label>
                  <input
                    type="password"
                    placeholder="Saisissez votre nouveau mot de passe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
                  />
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-gray-700 mb-2">Nouveau mot de passe :</label>
                  <input
                    type="password"
                    placeholder="Retapez le nouveau mot de passe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#4a69bd] text-white px-12 py-2 rounded-full hover:bg-[#3d5aa7] font-medium"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
