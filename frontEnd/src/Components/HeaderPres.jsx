// import React from 'react'
import KoulshiNet from "./image/Koulshinet.com (1).png"
import { useEffect, useState } from "react";
// import img3 from "./image/img3.png"
import { Link } from "react-router-dom";
// import { data } from "autoprefixer";
import { useTranslation } from "react-i18next";
export default function HeaderPres() {
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [presData, setPresData] = useState();
    const prestataire = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');
     const { t, i18n } = useTranslation(); // Translation hook
        const [langDropdownOpen, setLangDropdownOpen] = useState(false);

        const toggleLangDropdown = () => {
          setLangDropdownOpen(!langDropdownOpen);
        };

        const changeLanguage = (lang) => {
            i18n.changeLanguage(lang); // Switch language dynamically
            setLangDropdownOpen(false);
          };


          const getLanguageIcon = () => {
            switch (i18n.language) {
              case 'fr':
                return '🇫🇷'; // French flag emoji
              case 'ar':
                return '🇲🇦'; // Moroccan flag emoji (for Arabic)
              case 'en':
              default:
                return '🇬🇧'; // UK flag emoji
            }
          };

    const fetchUserData = async (id) => {
        try {
          const response = await fetch(`https://back.koulchinet.com/api/prestataire/${id}`);
          const data = await response.json();
          setPresData(data);
          // console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        if (prestataire?.id) {
          fetchUserData(prestataire.id);
        }
      }, [prestataire?.id]);

    //   console.log(presData);



    // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // const closeDropdown = (e) => {
    //   if (!e.target.closest('#langBtn')) {
    //     setIsDropdownOpen(false);
    //   }
    // };

    // React.useEffect(() => {
    //   window.addEventListener('click', closeDropdown);
    //   return () => window.removeEventListener('click', closeDropdown);
    // }, []);

    return (
      <header className="bg-white w-full h-[70px] shadow-sm">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src={KoulshiNet}
                alt="Koulchinet.com"
                className="h-[70px] w-auto absolute left-0 object-contain
                filter contrast-125 brightness-105
                [image-rendering:crisp-edges]
                [image-rendering:-webkit-optimize-contrast]"
              />
            </a>

            {/* Right Side Navigation */}

               <nav className="flex items-center space-x-8 ml-52">
                         <Link to="/AboutUs" className="text-gray-700 hover:text-blue-600">{t('about')}</Link>
                         <Link to="/" className="text-gray-700 hover:text-blue-600">{t('home')}</Link>
                         <Link to="/services" className="text-gray-700 hover:text-blue-600">{t('services')}</Link>
                         <Link to="/DevenirePrestataire" className="text-gray-700 hover:text-blue-600">{t('provider')}</Link>
                         <Link to="/marketplace" className="text-gray-700 hover:text-blue-600">{t('marketplace')}</Link>
                </nav>
            <div className="flex items-center space-x-10">
              {/* Language Dropdown */}
              <div className="relative">
                            <button
                                onClick={toggleLangDropdown}
                                className="flex items-center text-gray-700 hover:text-blue-600 text-sm"
                            >
                                <span className="mr-2 text-lg">{getLanguageIcon()}</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {langDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-12 bg-white rounded-md shadow-lg py-1 z-50">
                                    <button onClick={() => changeLanguage('fr')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Fr
                                    </button>
                                    <button onClick={() => changeLanguage('ar')} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Ar
                                    </button>
                                </div>
                            )}
                        </div>

              {/* Notification Bell */}
              {/* <button className="text-[#4a69bd] hover:text-blue-600 relative">
                <i className="fas fa-bell text-2xl"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button> */}

              {/* Profile Picture */}
              <div className="relative">
                <Link to='/PrestataireDashboard'>
              <div className="relative flex items-center space-x-3">
                {presData?.documents?.[0]?.photo ? (
                    <img
                    src={`https://back.koulchinet.com/profile_photos_perstataire/${presData.documents[0].photo}`}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                )}

                <div className="flex flex-col">
                    <p className="font-medium">
                    {presData?.user?.nom || "Nom inconnu"} {presData?.user?.prenom || "Prénom inconnu"}
                    </p>
                    <p className="text-sm text-gray-500">{role || "Rôle non spécifié"} {presData?.user?.id}</p>
                </div>
                </div>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </header>
    )
}
