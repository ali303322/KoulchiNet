// import React from 'react'

import { useState } from "react";
import SIdeBar from "./SIdeBar";
import { Link } from "react-router-dom";

export default function GestionContenu() {
    const [openAddModal, setOpenAddModal] = useState(false);

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="flex min-h-screen" data-testid="container">
         <SIdeBar/>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Gestion de contenu</h2>
                <Link
                    to="/AdminDashboard/AddContenu"
                    className="px-4 py-2 bg-[#f6ad55] text-white rounded-md hover:bg-[#ed8936] transition duration-200"
                    >
                    Ajouter Contenu
                </Link>
              </div>

              {/* Add Category Modal */}
              {openAddModal && (
                <div
                  className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
                  onClick={() => setOpenAddModal(false)}
                >
                  <div
                    className="relative p-6 border w-[800px] shadow-lg rounded-lg bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between space-x-8">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-2">Category name</label>
                          <input
                            type="text"
                            placeholder="Inter category name"
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-2">Category icon</label>
                          <div className="relative">
                            <input type="file" id="categoryIcon" className="hidden" />
                            <label
                              htmlFor="categoryIcon"
                              className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
                            >
                              <span className="text-gray-500">upload icon</span>
                              <i className="fas fa-cloud-upload-alt text-gray-400"></i>
                            </label>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            className="px-12 py-2 bg-[#4a69bd] text-white rounded-full"
                            onClick={() => setOpenAddModal(false)}
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">Services Evénements</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-3">
                      <Link
                            to="/AdminDashboard/DetailsContenu"
                            className="text-[#4a69bd]"
                            >
                            Details
                        </Link>
                        <button className="text-red-500 hover:text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">Services Personnels et Bien-être</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-3">
                      <Link
                            to="/AdminDashboard/DetailsContenu"
                            className="text-[#4a69bd]"
                            >
                            Details
                        </Link>
                        <button className="text-red-500 hover:text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-6 mb-6 space-x-2">
                <button className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400" disabled>
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
      </div>
    );
}
