// import React from 'react'

import { Link } from "react-router-dom";
import HeaderClient from "./HeaderClient";
// import SIdeBar from "./SIdeBar";
import SideBarClient from "./SideBarClient";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function HistoriqueClient() {

    const user = JSON.parse(localStorage.getItem('user')) ;


  const[historys,setHistorys]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10); // Adjust the number of items per page

    const getHistorys = async () => {
        try {
            const response = await axios.get(`https://back.koulchinet.com/api/historyclient/${user.id}?page=${currentPage}&per_page=${perPage}`);
            setHistorys(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };
    const { t } = useTranslation();
    useEffect(() => {
        getHistorys();
    }, [currentPage]); // Fetch data when the current page changes

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };

      const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };




  return (
    <div className="bg-gray-100 font-sans">
    <HeaderClient/>

    {/* Main Content */}
    <div className="flex min-h-screen">
       <SideBarClient/>

    {/* Main Content Area */}
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-[#4a69bd] text-xl font-medium mb-6">{t("history")}</h2>

        {/* Search Bar */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
          />
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                {t("clientDash.name")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                {t("clientDash.date")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                {t("clientDash.service")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                {t("clientDash.serviceType")}
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                {t("clientDash.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {historys &&
              historys.map((e, i) => (
                <tr className="border-b border-gray-200" key={i}>
                  <td className="py-3 px-4">
                    {e.prestataire.nom} {e.prestataire.prenom}
                  </td>
                  <td className="py-3 px-4">{e.date_sent}</td>
                  <td className="py-3 px-4">{e.service_name}</td>
                  <td className="py-3 px-4">{e.type_service}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="text-[#4a69bd] hover:text-blue-700">
                      <Link to={`/ClientDashboard/Review/${e.prestataire.id}`}>
                        {t("clientDash.review")}
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
            disabled={currentPage === 1}
          >
            {t("clientDash.previous")}
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
            {t("clientDash.next")}
          </button>
        </div>
      </div>
    </div>

  </div>
  </div>
  )
}
