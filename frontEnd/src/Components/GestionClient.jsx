// import React from 'react'

import { useEffect, useState } from "react";
import SIdeBar from "./SIdeBar";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

export default function GestionClient() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const[clients,setClients]=useState([]);

    useEffect(() => {
        getClients(currentPage);
      }, [currentPage]);



      const getClients = async (page) => {
        try {
          const response = await axios.get(`https://back.koulchinet.com/api/getclients?page=${page}`);
          setClients(response.data.data); // Access the "data" key
          setTotalPages(response.data.last_page); // Access "last_page" for total pages
        } catch (error) {
          console.error("Error fetching clients:", error);
        }
      };


      const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };

      const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };

    function formatDate(dateString) {
      const date = new Date(dateString);

      if (isNaN(date)) {
        return "Date invalide";
      }


      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }


    return (
      <>
      <DashboardHeader/>
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
                  {clients.map((client, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6">{client.prenom} {client.nom}</td>
                      <td className="py-4 px-6">{formatDate(client.created_at) }</td>
                      <td className="py-4 px-6">
                        <span className={client.email_verified_at ? "text-green-500" : "text-red-500"}>{client.email_verified_at?"Active":"inactive"}</span>
                      </td>
                      <td className="py-4 px-6">
                      <Link   to="/AdminDashboard/ClientDetails" className="text-[#4a69bd] hover:text-blue-700" state={{ "id": client.id }}>
                        Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

