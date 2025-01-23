import React, { useEffect, useState } from "react";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { data } from "autoprefixer";

export default function HistoriquePres() {

    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const [historys, setHistorys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getHistorys = async (page = 1) => {
        await axios.get(`https://back.koulchinet.com/api/historyprestataire/${user.id}?page=${page}`)
            .then(res => {
                setHistorys(res.data.data); // Array of current page data
                setCurrentPage(res.data.meta.current_page);
                setTotalPages(res.data.meta.last_page);
            })
            .catch(err => console.log(err));
    };

    console.log(historys);


    useEffect(() => {
        getHistorys();
    }, []);

    // Function to handle page change
    const handlePageChange = (page) => {
        getHistorys(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="bg-gray-100 font-sans">
            <HeaderPres />

            {/* Main Content */}
            <div className="flex min-h-screen">
                <SideBarPres />
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
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Service</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Type Service</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            {historys && historys.map((e, i) => {
                            const client = e.client || {};  // Provide a fallback empty object if client is undefined
                            return (
                                <tr className="border-b border-gray-200" key={i}>
                                    <td className="py-3 px-4">{client.nom} {client.prenom}</td>  {/* Safe access */}
                                    <td className="py-3 px-4">{e.date_sent}</td>
                                    <td className="py-3 px-4">{e.service_name}</td>
                                    <td className="py-3 px-4">{e.type_service}</td>
                                    <td className="py-3 px-4 space-x-2">
                                        <Link to={`/prestataireDashboard/DetailsHistorie/${e.id}`} className="text-blue-500 hover:text-blue-700">Details</Link>
                                    </td>
                                </tr>
                            );
                        })}


                        </table>

                        {/* Pagination */}
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
                                    onClick={() => handlePageChange(i + 1)} // Use handlePageChange to change pages
                                    className={`px-4 py-2 ${currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-[#4a69bd] text-white"} rounded`}
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
        </div>
    );
}
