import { Link, useLocation, useParams } from "react-router-dom";
import SIdeBar from "./SIdeBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsContenu() {
    const [sousService, setSousService] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const itemsPerPage = 5; // Limit items per page

    const { id } = useParams();

    const location = useLocation();
    const message = location.state?.message; // Get the success message

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categorieServices/${id}?page=${currentPage}&limit=${itemsPerPage}`);
                setSousService(response.data.data); // Assuming the data is in 'data'
                setTotalPages(response.data.total_pages); // Assuming the total pages info is in 'total_pages'
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage, id]);

    // Handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    const submitDelete = (id) => {
        // Ask for confirmation before proceeding with the delete
        const confirmation = window.confirm("Tu es sûr de supprimer cette catégorie ?");

        if (confirmation) {
            console.log(`Deleting category with ID: ${id}`); // Log the ID being passed

            // Make the DELETE request to the backend API
            axios.delete(`http://127.0.0.1:8000/api/supprimerService/${id}`)
                .then((response) => {
                    alert("La catégorie a été bien supprimée.");
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Erreur lors de la suppression.");
                });
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <SIdeBar />
            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="px-6 py-4 flex justify-between items-center border-b">
                        <h3 className="text-xl font-medium text-[#4a69bd]">Services Evénements</h3>
                        <button className="px-4 py-2 bg-[#f6ad55] text-white rounded hover:bg-[#ed8936] transition duration-200">
                            <Link
                                to="/AdminDashboard/AddContenu"
                                state={{ 'id' : id }}
                                className="px-4 py-2 bg-[#f6ad55] text-white rounded-md hover:bg-[#ed8936] transition duration-200"
                            >
                                Add service
                            </Link>
                        </button>
                    </div>

                    {/* Services List */}
                    <div className="p-6">
                    <div>
                        {message && <p>{message}</p>} {/* Display the success message if available */}
                        {/* Your other content */}
                    </div>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-700">Service name</th>
                                    <th className="text-right py-4 px-6 font-medium text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sousService.map((service, index) => (
                                    <tr key={index}>
                                        <td className="py-4 px-6">{service.serviceName}</td>
                                        <td className="py-4 px-6 text-right">
                                            <Link to={"/AdminDashboard/EditContenu/"+service.id} className="text-[#4a69bd]">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => submitDelete (service.id)}
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
                            {/* Previous Button */}
                            <button
                                className={`px-4 py-2 bg-[#4a69bd] text-white rounded ${currentPage === 1 ? 'disabled:bg-gray-400' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Précédent
                            </button>

                            {/* Dynamic Page Buttons */}
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 bg-[#4a69bd] text-white rounded ${currentPage === index + 1 ? 'bg-[#ed8936]' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                className={`px-4 py-2 bg-[#4a69bd] text-white rounded ${currentPage === totalPages ? 'disabled:bg-gray-400' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
