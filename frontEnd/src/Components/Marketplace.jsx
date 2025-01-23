import { useState, useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";
import img4 from './image/img4.jpeg';
import HeaderPres from "./HeaderPres";
import HeaderClient from "./HeaderClient";
import DashboardHeader from "./DashboardHeader";
import { useTranslation } from "react-i18next";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://back.koulchinet.com/api/products');
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

      // fetching for all services
      useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://back.koulchinet.com/api/services',
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

    const auth = localStorage.getItem('role');

  return (
    <>
         {auth === "prestataire" ? (
        <HeaderPres />
      ) : auth === "client" ? (
        <HeaderClient />
      ) : auth == "admin" ?(
        <DashboardHeader />
      ) : (
        <Header />
      )}
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${img4})` }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Hero Text */}
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1 className="text-white text-6xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-white text-3xl">{t('hero.description')}</p>
          </div>
        </div>

        {/* Search Section - Positioned to overlap */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[95%] z-20">
          {/* Add your search content here */}
        </div>
      </section>

      {/* Search Bar Section */}
      <div className="relative -mt-8 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
            className="w-72 appearance-none border border-gray-200 rounded-lg px-4 py-3 pr-8 text-gray-700 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            >
            <option value="">Toutes les catégories</option>
            {/* Get unique categories from services */}
            {services.map((product, index) => (
                <option key={index} value={product.serviceName}>
                {product.serviceName}
                </option>
            ))}
            </select>

            <button className="bg-[#4052B4] hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
                {t('search.button')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-72">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-[#4052B4] mb-4">Catégories</h3>
              <div className="space-y-3">
                {services.map((category,index) => (
                  <label key={index} className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#4052B4]"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                    />
                    <span>{category.serviceName}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-4">{t('loading')}</div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                    <div className="h-48 bg-[#e9edf3] flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={`https://back.koulchinet.com//${product.image}`}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <svg style={{ width: '64px', height: '64px', fill: '#4052B4' }} viewBox="0 0 24 24">
                          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,17.73C4.46,17.95 4.73,18.04 4.95,17.95L7.44,16.95C7.96,17.34 8.5,17.68 9.13,17.93L9.5,20.58C9.54,20.82 9.75,21 10,21H14C14.25,21 14.46,20.82 14.5,20.58L14.87,17.93C15.5,17.68 16.04,17.34 16.56,16.95L19.05,17.95C19.27,18.04 19.54,17.95 19.66,17.73L21.66,14.27C21.78,14.05 21.73,13.78 21.54,13.63L19.43,12.97Z" />
                        </svg>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[#4052B4] text-sm mb-1">{product.category}</div>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="text-[#4052B4] font-bold text-xl mb-4">{product.price} MAD</div>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-[#f6ad55] hover:bg-[#ed8936] text-white text-center py-2 rounded-md transition-colors"
                      >
                        {t('product.buy')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
