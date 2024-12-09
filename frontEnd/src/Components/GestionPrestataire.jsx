// import React from 'react'

import { Link } from "react-router-dom";
import SIdeBar from "./SIdeBar";

export default function GestionPrestataire() {
  return (
    <div className="flex min-h-screen">
   <SIdeBar/>

    {/* Main Content Area */}
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Gestion des prestataires</h2>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-6 font-medium text-gray-700">Nom</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Offer</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { name: "Reda Ahmed", offer: "Free", status: "Active", isActive: true },
              { name: "Achraf Amrani", offer: "Free", status: "Inactive", isActive: false },
              { name: "Achraf Amrani", offer: "Entreprise", status: "Active", isActive: true },
            ].map((row, index) => (
              <tr key={index}>
                <td className="py-4 px-6">{row.name}</td>
                <td className="py-4 px-6">{row.offer}</td>
                <td className="py-4 px-6">
                  <span className={row.isActive ? "text-green-500" : "text-red-500"}>
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                <Link to="/AdminDashboard/PestataireDetails" className="text-[#4a69bd] hover:text-blue-700">
  Details
</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
            disabled
          >
            Précédent
          </button>
          <button className="px-4 py-2 bg-[#4a69bd] text-white rounded">1</button>
          <button className="px-4 py-2 bg-[#4a69bd] text-white rounded">2</button>
          <button className="px-4 py-2 bg-[#4a69bd] text-white rounded">3</button>
          <button className="px-4 py-2 bg-[#4a69bd] text-white rounded">Suivant</button>
        </div>
      </div>
    </div>
  </div>
  )
}
