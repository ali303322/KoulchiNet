// import React from 'react'

import { useState } from "react";
import SIdeBar from "./SIdeBar";
import { Link } from "react-router-dom";

export default function GestionClient() {
    const [currentPage, setCurrentPage] = useState(1);
    const users = [
      { name: "Achraf Amrani", date: "27/10/2024 AT 12:50AM", status: "Active" },
      { name: "Mohammed Ali", date: "27/10/2024 AT 12:50AM", status: "Active" },
      // Add more user data as needed
    ];

    const handlePageChange = (page) => {
      setCurrentPage(page);
      // Logic to fetch or display data for the selected page
    };

    return (
      <div className="bg-gray-100 min-h-screen flex">
       <SIdeBar/>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Gestion des clients</h2>

            {/* Table */}
            <div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Nom</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Date</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6">{user.name}</td>
                      <td className="py-4 px-6">{user.date}</td>
                      <td className="py-4 px-6">
                        <span className="text-green-500">{user.status}</span>
                      </td>
                      <td className="py-4 px-6">
                      <Link to="/AdminDashboard/ClientDetails" className="text-[#4a69bd] hover:text-blue-700">
                        Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Précédent
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-[#4a69bd] text-white"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="px-4 py-2 bg-[#4a69bd] text-white rounded"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

