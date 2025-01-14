import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import SIdeBar from "./SIdeBar";
import axios from 'axios';

export default function AddProduit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'domestique',
    link: '',
    price: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);


        // fetching for all services
        useEffect(() => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/services',
                headers: { }
              };

              axios.request(config)
              .then((response) => {
                setServices(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
        }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('link', formData.link);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/AdminDashboard/GestionProduit');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader/>
      <div>
        <div className="flex min-h-screen">
          <SIdeBar/>

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-8">
            <div className="relative p-6 border w-[1000px] shadow-lg rounded-lg bg-white mt-24 mx-auto">
              {/* Title */}
              <h3 className="text-[#4a69bd] font-medium mb-6">Ajouter produit:</h3>

              {error && (
                <div className="mb-4 text-red-500 text-center">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Labels Row */}
                <div className="flex justify-between px-2">
                  <label className="text-sm w-44 text-center">Product image:</label>
                  <label className="text-sm w-44 text-center">Product name:</label>
                  <label className="text-sm w-44 text-center">Product category:</label>
                  <label className="text-sm w-44 text-center">Product link:</label>
                  <label className="text-sm w-44 text-center">Product Price:</label>
                </div>

                {/* Input Fields Row */}
                <div className="flex justify-between space-x-4">
                  {/* Upload Media */}
                  <div className="relative w-44">
                    <input
                      type="file"
                      className="hidden"
                      id="addProductImage"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor="addProductImage"
                      className="flex items-center px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50 w-full"
                    >
                      <span className="text-gray-500 text-sm">
                        {formData.image ? formData.image.name : 'Upload media'}
                      </span>
                      <i className="fas fa-cloud-upload-alt ml-2 text-gray-400"></i>
                    </label>
                  </div>

                  {/* Product Name */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="type product name"
                    className="border rounded-full px-4 py-2 text-sm w-44"
                    required
                  />

                  {/* Product Category */}
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border rounded-full px-4 py-2 text-sm w-44"
                  >
                    <option value="">choisir un categorie</option>
                    {services.map((product, index) => (
                        <option key={index} value={product.serviceName}>
                        {product.serviceName}
                        </option>
                    ))}

                  </select>

                  {/* Product Link */}
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="type link"
                    className="border rounded-full px-4 py-2 text-sm w-44"
                    required
                  />

                  {/* Product Price */}
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="price"
                    className="border rounded-full px-4 py-2 text-sm w-44"
                    required
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-2 bg-[#4a69bd] text-white rounded-full text-sm disabled:bg-gray-400"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
