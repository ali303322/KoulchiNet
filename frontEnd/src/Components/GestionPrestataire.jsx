// import React from 'react'

import { Link } from "react-router-dom";
import SIdeBar from "./SIdeBar";
import DashboardHeader from "./DashboardHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GestionPrestataire() {

  const[prestataire,setPrestataire]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPrestataires(currentPage);
  }, [currentPage]);

  const fetchPrestataires = (page) => {
    axios
      .get(`http://127.0.0.1:8000/api/getAllPrestataire?page=${page}`)
      .then((res) => {
        setPrestataire(res.data.prestataire);
        setTotalPages(res.data.totalPages); // Ensure your API returns total pages
      })
      .catch((err) => console.log(err));
  };


  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  return (
    <>
      <DashboardHeader/>
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
          {prestataire&&prestataire.map((row, index) => (
              <tr key={index}>
                <td className="py-4 px-6">{row.prenom} {row.nom}</td>
                <td className="py-4 px-6">free</td>
                <td className="py-4 px-6">
                  <span className={row.is_approved ? "text-green-500" : "text-red-500"}>
                    {row.is_approved?"active":"inactive"}
                  </span>
                </td>
                <td className="py-4 px-6">
                <Link to="/AdminDashboard/PestataireDetails" className="text-[#4a69bd] hover:text-blue-700" state={{ "id": row.id }}>
  Details
</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={handlePreviousPage}
                className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 ${
                    currentPage === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-[#4a69bd] text-white"
                  } rounded`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
      </div>
    </div>
  </div>
  </>
  )
}
