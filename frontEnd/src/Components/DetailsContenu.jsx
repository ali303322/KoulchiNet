// import React from 'react'

import { Link } from "react-router-dom";
import SIdeBar from "./SIdeBar";

export default function DetailsContenu() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
     <SIdeBar/>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center border-b">
            <h3 className="text-xl font-medium text-[#4a69bd]">Services Evénements</h3>
            <button className="px-4 py-2 bg-[#f6ad55] text-white rounded hover:bg-[#ed8936] transition duration-200">
            <Link
                to="/AdminDashboard/AddContenu"
                className="px-4 py-2 bg-[#f6ad55] text-white rounded-md hover:bg-[#ed8936] transition duration-200"
                >
                Add service
            </Link>
            </button>
          </div>

          {/* Services List */}
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Service name</th>
                  <th className="text-right py-4 px-6 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  'Contrôle des nuisibles',
                  'Coiffeur à domicile',
                  'Plomberie',
                  'Électricité',
                  'Jardinage',
                ].map((service, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6">{service}</td>
                    <td className="py-4 px-6 text-right">
                    <Link
                            to="/AdminDashboard/EditContenu"
                            className="text-[#4a69bd]"
                            >
                            Edit
                        </Link>

                      <button
                        onClick={() => console.log(`Delete ${service}`)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              <button className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400" disabled>
                Précédent
              </button>
              {[1, 2, 3].map((page) => (
                <button key={page} className="px-4 py-2 bg-[#4a69bd] text-white rounded">
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 bg-[#4a69bd] text-white rounded">Suivant</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
