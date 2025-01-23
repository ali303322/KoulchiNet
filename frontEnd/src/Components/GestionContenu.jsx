import { useEffect, useState } from "react";
import SIdeBar from "./SIdeBar";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

export default function GestionContenu() {
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  const [cat,setCat] = useState();
  const [icon,setIcon] = useState();

  const handleModalClose = () => {
    setOpenAddModal(false);
  };

  const handleModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleFileChange = (e) => {
    setIcon(e.target.files[0]);
  };

  // Function to fetch categories data with pagination
  const fetchCategories = (page = 1) => {
    axios
      .get(`https://back.koulchinet.com/api/categoriesWithPaginate?page=${page}`)
      .then((response) => {
        // Ensure response has the expected structure and set categories state
        if (response.data && response.data.data) {
          setCategories(response.data.data); // Set the categories data
          setCurrentPage(response.data.current_page); // Set the current page
          setTotalPages(response.data.total_pages); // Set the total number of pages
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch categories when the component mounts or when currentPage changes
  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  // Function to handle pagination button click
  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update the current page
    }
  };

  const handleSubmit = () => {
    let data = new FormData();
    data.append("name", cat); // Add the category name
    data.append("icon", icon); // Add the file (icon)

    // console.log(data.get('icon'));

    axios.post('https://back.koulchinet.com/api/AddCategories', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log(response.data);
        setMessage("Ajouté avec succès");
        alert("Ajouté avec succès");
        window.location.reload();
    })
    .catch((error) => {
        console.error(error.response?.data || error.message);
        setMessage("Échec de l'ajout de la catégorie");
    });
};

const submitDelete = (id) => {
    // Ask for confirmation before proceeding with the delete
    const confirmation = window.confirm("Tu es sûr de supprimer cette catégorie ?");

    if (confirmation) {
        console.log(`Deleting category with ID: ${id}`); // Log the ID being passed

        // Make the DELETE request to the backend API
        axios.delete(`https://back.koulchinet.com/api/supprimerCategorie/${id}`)
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
    <>
      <DashboardHeader />
      <div className="bg-gray-100 min-h-screen">
        <div className="flex min-h-screen" data-testid="container">
          <SIdeBar />

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Gestion de contenu</h2>
                <div className="">
      {/* Header with Title and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleModalOpen}
          className="px-4 py-2 bg-[#f6ad55] text-white rounded-md hover:bg-[#ed8936] transition duration-200"
        >
          Add category
        </button>
      </div>

      {/* Add Category Modal */}
      {openAddModal && (
        <form >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
          onClick={handleModalClose}
        >
          <div
            className="relative p-6 border w-[800px] shadow-lg rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Form */}
            <div className="space-y-6">
              {/* Input Fields Row */}
              <div className="flex justify-between space-x-8">
                {/* Category Name */}
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Category name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                    onChange={(e)=>setCat(e.target.value)}
                  />
                </div>

                  {/* Category Icon */}
                  <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Category icon
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      className="hidden"
                      id="categoryIcon"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.svg"
                    />
                    <label
                      htmlFor="categoryIcon"
                      className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
                    >
                      <span className="text-gray-500">
                        {icon ? icon.name : "Upload icon"}
                      </span>
                      <i className="fas fa-cloud-upload-alt text-gray-400"></i>
                    </label>
                  </div>
                </div>

                {/* Add Button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    className="px-12 py-2 bg-[#4a69bd] text-white rounded-full"
                    onClick={handleSubmit}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      )}
    </div>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Check if categories array is not empty before calling map */}
                  {categories.length > 0 ? (
                    categories.map((cat, index) => (
                      <tr className="hover:bg-gray-50" key={index}>
                        <td className="py-4 px-6">{cat.nom}</td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-3">
                            <Link
                              to={`/AdminDashboard/DetailsContenu/${cat.id}`}
                              state={{ 'id' : cat.id }}
                              className="text-[#4a69bd]"
                            >
                              Details
                            </Link>
                            <button type="submit" className="text-red-500 hover:text-red-700" onClick={() => submitDelete(cat.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-4 px-6 text-center text-gray-500">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-6 mb-6 space-x-2">
                <button
                  onClick={() => handlePagination(currentPage - 1)}
                  className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
                  disabled={currentPage === 1}
                >
                  Précédent
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePagination(index + 1)}
                    className={`px-4 py-2 bg-[#4a69bd] text-white rounded ${currentPage === index + 1 ? "bg-[#ed8936]" : ""}`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePagination(currentPage + 1)}
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
    </>
  );
}
