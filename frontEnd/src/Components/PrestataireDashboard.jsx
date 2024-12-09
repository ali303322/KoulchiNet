// import React from 'react'

// import { useEffect, useState } from "react";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";
import img3 from "./image/img3.png";
import { Link, useLocation } from "react-router-dom";
export default function PrestataireDashboard() {
    // const [profileData, setProfileData] = useState(null);

    const location = useLocation();
    const savedData = location.state;


    return (
        <div className="bg-gray-100 font-sans">
           <HeaderPres/>

            {/* Main Content */}
            <div className="flex min-h-screen">
              <SideBarPres/>
              <div className="flex-1 p-8">
                {/* Account Status */}
                <div className="bg-white rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-user-circle text-[#4a69bd]"></i>
                            <span className="text-[#4a69bd] font-medium">Statut du compte :</span>
                            <span className="bg-red-200 text-red-600 px-2 py-1 rounded text-sm">non confirmé</span>
                        </div>
                        <button className="bg-[#4a69bd] text-white px-4 py-2 rounded-lg hover:bg-[#3d5aa7]">
                            Complétez votre profil
                        </button>
                    </div>
                </div>

                {/* General Information Section */}
                <div className="bg-white rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-user-circle text-[#4a69bd]"></i>
                            <span className="text-[#4a69bd] font-medium text-lg">Informations générales :</span>
                        </div>
                        <Link
                            to={{
                                pathname: "/PrestataireDashboard/modifyPrestataire",
                                state: { state : savedData},
                              }}
                            className="bg-[#4a69bd] text-white px-4 py-2 rounded-lg hover:bg-[#3d5aa7]"
                            >
                            Modifier
                        </Link>
                    </div>

                    <div className="flex gap-16 px-4">
                        {/* Profile Image */}
                        <div className="w-[440px] h-[332px] pb-32">
                            <img src={img3} alt="Profile" className="w-80 h-80 rounded-full object-cover" />
                        </div>

                        {/* Information List with IDs */}
                        <div className="flex-1 pt-4">
                            <div className="space-y-6">
                                <div className="flex">
                                    <span className="w-32 text-gray-700">Nom:</span>
                                    <span></span>
                                </div>
                                {/* <div className="flex">
                                    <span className="w-32 text-gray-700">Prenom:</span>
                                    <span></span>
                                </div> */}
                                <div className="flex">
                                    <span className="w-32 text-gray-700">Ville:</span>
                                    <span></span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-700">Quartier:</span>
                                    <span></span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-700">Numéro:</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-credit-card text-[#4a69bd]"></i>
                            <span className="text-[#4a69bd] font-medium text-lg">Détails des paiements :</span>
                        </div>
                        <button className="bg-[#4a69bd] text-white px-6 py-2 rounded-lg hover:bg-[#3d5aa7]">
                            Voir historique
                        </button>
                    </div>

                    {/* Payment Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Mois</th>
                                    <th className="px-4 py-2 text-left">Montant</th>
                                    <th className="px-4 py-2 text-left">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">Janvier</td>
                                    <td className="px-4 py-2">500 MAD</td>
                                    <td className="px-4 py-2">Payé</td>
                                </tr>
                                {/* Additional rows as necessary */}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
