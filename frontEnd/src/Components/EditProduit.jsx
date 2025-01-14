import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import SIdeBar from "./SIdeBar";
import axios from 'axios';

export default function EditProduit() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    link: '',
    price: '',
    image: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        const product = response.data;
        setFormData({
          name: product.name,
          category: product.category,
          link: product.link,
          price: product.price,
          image: null // Current image will be shown separately
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error:', err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    formDataToSend.append('_method', 'PUT');

    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/products/${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT'
            },
        });

        console.log('Update response:', response.data); // Debug log
        
        if (response.data.message === 'Product updated successfully') {
            setSuccess('Product updated successfully');
            setTimeout(() => {
                navigate('/AdminDashboard/GestionProduit');
            }, 1500); // Give user time to see success message
        } else {
            setError('Failed to update product');
        }
    } catch (err) {
        console.error('Update error:', err);
        setError(err.response?.data?.message || 'Failed to update product');
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <DashboardHeader />
        <div className="flex min-h-screen">
          <SIdeBar />
          <div className="flex-1 bg-gray-100 p-8">
            <div className="text-center py-4">Loading product details...</div>
          </div>
        </div>
      </>
    );
  }

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
              <h3 className="text-[#4a69bd] font-medium mb-6">Modifier produit:</h3>

              {error && (
                <div className="mb-4 text-red-500 text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 text-green-500 text-center">
                  {success}
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
                      id="editProductImage"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor="editProductImage"
                      className="flex items-center px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50 w-full"
                    >
                      <span className="text-gray-500 text-sm">
                        {formData.image ? formData.image.name : 'Update image'}
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
                    <option value="domestique">domestique</option>
                    <option value="decoration">decoration</option>
                    <option value="résidentielles">résidentielles</option>
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
                    {loading ? 'Saving...' : 'Save Changes'}
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
