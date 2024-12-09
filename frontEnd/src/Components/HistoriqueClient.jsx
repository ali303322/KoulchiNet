// import React from 'react'

import { Link } from "react-router-dom";
import HeaderClient from "./HeaderClient";
// import SIdeBar from "./SIdeBar";
import SideBarClient from "./SideBarClient";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoriqueClient() {

  const[data,setData]=useState([]);
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/getHistoryClient")
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  })
  return (
    <div className="bg-gray-100 font-sans">
    <HeaderClient/>

    {/* Main Content */}
    <div className="flex min-h-screen">
       <SideBarClient/>

    {/* Main Content Area */}
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Historique</h2>

        {/* Search Bar */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
          />
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Nom</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">service </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">type service</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>

            {data.map((e,i)=>{
              return             <tr className="border-b border-gray-200">
              <td className="py-3 px-4">{e.name}</td>
              <td className="py-3 px-4">{e.date_sending_message}</td>
              <td className="py-3 px-4">{e.service}</td>
              <td className="py-3 px-4">{e.type_service}</td>
              <td className="py-3 px-4 space-x-2">
                <button className="text-[#4a69bd] hover:text-blue-700">
                  <Link to="/ClientDashboard/Review">Review</Link>
                </button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
            })}

            {/* Repeat similar rows for other entries */}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
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

    {/* Description Modal */}
    <div id="descriptionModal" className="fixed inset-0 bg-black bg-opacity-50 hidden">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg w-[1000px] p-6 relative">
          {/* Modal Header */}
          <div className="flex items-center text-[#4a69bd] mb-6">
            <i className="fas fa-book mr-3"></i>
            <h3 className="text-xl font-semibold">Description</h3>
          </div>

          {/* Modal Content */}
          <div>
            <textarea className="w-full h-48 p-4 border border-gray-300 rounded-lg" placeholder="Description..."></textarea>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-2 bg-[#4a69bd] text-white rounded"
              onClick={() => document.getElementById('descriptionModal').classList.add('hidden')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}
