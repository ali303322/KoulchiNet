// import React from 'react'

import { Link } from "react-router-dom";
import SIdeBar from "./SIdeBar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
   <SIdeBar/>

    {/* Main Content Area */}
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Accueil</h2>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Nom</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Offer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">Achraf amrani</td>
              <td className="py-3 px-4">Free</td>
              <td className="py-3 px-4">
                <span className="text-red-500">innactive</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-3">
                <Link
                    to="/AdminDashboard/DemandeDetails"
                    className="text-[#4a69bd] hover:text-blue-700"
                    >
                    Details
                </Link>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">Achraf amrani</td>
              <td className="py-3 px-4">Free</td>
              <td className="py-3 px-4">
                <span className="text-red-500">innactive</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-3">
                <Link
                    to="/AdminDashboard/DemandeDetails"
                    className="text-[#4a69bd] hover:text-blue-700"
                    >
                    Details
                </Link>
                </div>
              </td>
            </tr>
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
