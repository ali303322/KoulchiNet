// import React from 'react'

import { useState, useEffect } from "react";
import SIdeBar from "./SIdeBar";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import axios from 'axios';

export default function GestionProduit() {
    // const [openEditModal, setOpenEditModal] = useState(false);
    // const [openAddModal, setOpenAddModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [products, setProducts] = useState([]); // Empty array for products
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://back.koulchinet.com/api/products?page=${currentPage}&per_page=${perPage}`);
                console.log('Fetched products:', response.data); // Add this for debugging
                setProducts(response.data.data);
                setTotalPages(response.data.totalPages); // Set the total pages
            } catch (err) {
                setError('Failed to fetch products');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, perPage]); // Fetch products when currentPage changes

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`https://back.koulchinet.com/api/products/${id}`);
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setOpenDetailsModal(true);
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
      <div>
        <div className="flex min-h-screen">
            <SIdeBar/>

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-8">
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

              {loading && (
                  <div className="text-center py-4">Loading products...</div>
              )}

              {error && (
                  <div className="text-red-500 text-center py-4">{error}</div>
              )}

              {!loading && !error && (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-gray-500">
                            No products available
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="cursor-pointer hover:bg-gray-50"
                          >
                            <td className="py-4 px-6">{product.name}</td>
                            <td className="py-4 px-6">{product.category}</td>
                            <td className="py-4 px-6">
                              <div className="flex space-x-4">
                                <Link
                                  to={`/AdminDashboard/EditProduits/${product.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[#4a69bd]"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={(e) => handleDelete(product.id, e)}
                                  className="text-red-500"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
              )}

              {/* Pagination - Only show when there are products */}
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

        {/* Details Modal */}
        {openDetailsModal && selectedProduct && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            onClick={() => setOpenDetailsModal(false)}
          >
            <div
              className="relative p-6 border w-[600px] shadow-lg rounded-lg bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex">
                {/* Left side - Image */}
                <div className="w-1/2 h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image
                      ? `https://back.koulchinet.com/storage/${selectedProduct.image}`
                      : "image/img2.jpeg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Right side - Product Details */}
                <div className="w-1/2 pl-6 space-y-4">
                  {/* Product Name */}
                  <div>
                    <span className="font-medium">Product name: </span>
                    <span>{selectedProduct.name}</span>
                  </div>

                  {/* Product Category */}
                  <div>
                    <span className="font-medium">Product category: </span>
                    <span>{selectedProduct.category}</span>
                  </div>

                  {/* Product Link */}
                  <div>
                    <span className="font-medium">Product link: </span>
                    <a
                      href={selectedProduct.link}
                      className="text-blue-500 hover:underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedProduct.link}
                    </a>
                  </div>

                  {/* Product Price */}
                  <div>
                    <span className="font-medium">Product Price: </span>
                    <span>{selectedProduct.price} MAD</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-6">
                    <Link
                      to={`/AdminDashboard/EditProduits/${selectedProduct.id}`}
                      className="text-[#4a69bd] hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        handleDelete(selectedProduct.id, e);
                        setOpenDetailsModal(false);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
    )
}
