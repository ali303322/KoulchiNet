import { useEffect, useState } from 'react'
import DashboardHeader from './DashboardHeader'
import SIdeBar from './SIdeBar'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GestionPaiment() {

    const[prestataire,setPrestataire]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10); // You can adjust the number of items per page

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getAllDemandes?page=${currentPage}&per_page=${perPage}`);
                console.log('Fetched demandes:', response.data); // Debugging
                setPrestataire(response.data.data); // Set the data
                setTotalPages(response.data.totalPages); // Set total pages
            } catch (err) {
                console.error('Error fetching demandes:', err);
            }
        };

        fetchDemandes();
    }, [currentPage, perPage]); // Fetch when currentPage changes

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };

      const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };

    const deletePrestataire=(id)=>{
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce prestataire ?");
        if (isConfirmed) {
         axios.delete("http://127.0.0.1:8000/api/deletePaimentDemande/"+id)
         .then(res=>{
            alert(res.data.message)
            window.location.reload();
        })
         .catch(err=>console.log(err))
         //window.location.reload();
         }
      }

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
              <th className="text-left py-4 px-6 font-medium text-gray-700">Nom Prestatire</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Offer demander</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">prix</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {prestataire&&prestataire.map((row, index) => (
              <tr key={index}>
                <td className="py-4 px-6">{row.prestataire.nom} {row.prestataire.prenom}</td>
                <td className="py-4 px-6">{row.NomOffre}</td>
                <td className="py-4 px-6">
                  <span>
                    {row.prix} MAD
                  </span>
                </td>
                <td className="py-4 px-6">
                <Link to={"/AdminDashboard/PaimentDetaille/"+row.id} className="text-[#4a69bd] hover:text-blue-700" state={{ "id": row.id }}>
  Details
</Link>

    <button className="ml-3 text-[#FF0000] hover:text-red-500" onClick={()=> deletePrestataire(row.id)}> Delete</button>
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
