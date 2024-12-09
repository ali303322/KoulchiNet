// import React from 'react'

import { useState } from "react";
import SIdeBar from "./SIdeBar";
import { Link } from "react-router-dom";

export default function GestionProduit() {
    // const [openEditModal, setOpenEditModal] = useState(false);
    // const [openAddModal, setOpenAddModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    return (
      <div>
        <div className="flex min-h-screen">
            <SIdeBar/>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Gestion des produits</h2>
                <Link
                    to="/AdminDashboard/AddProduits"
                    className="px-4 py-2 bg-[#f6ad55] text-white rounded-md hover:bg-[#ed8936] transition duration-200"
                    >
                    Ajouter produit
                </Link>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[...Array(8)].map((_, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setOpenDetailsModal(true)}
                    >
                      <td className="py-4 px-6">Product name</td>
                      <td className="py-4 px-6">{["domestiques", "decoration", "résidentielles"][index % 3]}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-4">
                        <Link
                            to="/AdminDashboard/EditProduits"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#4a69bd]"
                            >
                            Edit
                        </Link>
                          <a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            className="text-red-500"
                          >
                            Delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-6 mb-6 space-x-2">
                <button className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400" disabled>
                  Précédent
                </button>
                {[1, 2, 3].map((num) => (
                  <button key={num} className="px-4 py-2 bg-[#4a69bd] text-white rounded">
                    {num}
                  </button>
                ))}
                <button className="px-4 py-2 bg-[#4a69bd] text-white rounded">Suivant</button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        {openDetailsModal && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            onClick={() => setOpenDetailsModal(false)}
          >
            <div
              className="relative p-6 border w-[600px] shadow-lg rounded-lg bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex">
                {/* Image */}
                <div className="w-1/2 h-64 rounded-lg overflow-hidden">
                  <img
                    src="image/img2.jpeg"
                    alt="Product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="w-1/2 pl-6 space-y-4">
                  <div>
                    <span className="font-medium">Product name: </span>
                    <span>HABITAT cell</span>
                  </div>
                  <div>
                    <span className="font-medium">Product category: </span>
                    <span>domestique</span>
                  </div>
                  <div>
                    <span className="font-medium">Product link: </span>
                    <a
                      href="https://www.ika.com/en/Products-LabEq/Bioreactors-pg233/HABITAT-cell-10007533/"
                      className="text-blue-500 hover:underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      HABITAT-cell Link
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Product Price: </span>
                    <span>350 MAD</span>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <a href="editproduit.html" className="text-[#4a69bd] hover:underline">
                      Edit
                    </a>
                    <a href="#" className="text-red-500 hover:underline">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}
