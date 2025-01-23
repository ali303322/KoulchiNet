import { Link } from "react-router-dom";
import SIdeBar from "./SIdeBar";
import DashboardHeader from "./DashboardHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [prestataire, setPrestataire] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPrestataires(currentPage);
  }, [currentPage]);

  const fetchPrestataires = (page) => {
    axios
      .get(`https://back.koulchinet.com/api/getAllPrestataire?page=${page}`)
      .then((res) => {
        setPrestataire(res.data.prestataire);
        setTotalPages(res.data.totalPages); // Ensure your API returns total pages
      })
      .catch((err) => console.log(err));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return "Date invalide";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <DashboardHeader />
      <div className="flex min-h-screen bg-gray-100">
        <SIdeBar />

        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Accueil</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prestataire &&
                  prestataire.map((e, i) => {
                    if (!e.is_approved) {
                      return (
                        <tr key={i} className="border-b border-gray-200">
                          <td className="py-3 px-4">{e.prenom} {e.nom}</td>
                          <td className="py-3 px-4">{formatDate(e.created_at)}</td>
                          <td className="py-3 px-4">
                            <span className="text-red-500">innactive</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-3">
                              <Link
                                to={`/AdminDashboard/DemandeDetails/`}
                                className="text-[#4a69bd] hover:text-blue-700"
                                state={{ id: e.id }}
                              >
                                Details
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
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
  );
}
