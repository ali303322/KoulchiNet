import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from './image/Koulshinet.com (1).png';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; // Ensure correct import path

export default function Header() {
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

    return (
        <header className="bg-white w-full h-[70px] shadow-sm">
            <div className="container mx-auto px-4 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Koulchinet.com"
                            className="h-[70px] w-auto absolute left-0 object-contain filter contrast-125 brightness-105
                            [image-rendering:crisp-edges]
                            [image-rendering:-webkit-optimize-contrast] w-10"
                        />
                    </Link>

                    {/* Main Navigation */}
                    <nav className="flex items-center space-x-8 ml-52">
                        <Link to="/AboutUs" className="text-gray-700 hover:text-blue-600">{t('about')}</Link>
                        <Link to="/" className="text-gray-700 hover:text-blue-600">{t('home')}</Link>
                        <Link to="/services" className="text-gray-700 hover:text-blue-600">{t('services')}</Link>
                        <Link to="/DevenirePrestataire" className="text-gray-700 hover:text-blue-600">{t('provider')}</Link>
                        <Link to="/marketplace" className="text-gray-700 hover:text-blue-600">{t('marketplace')}</Link>
                    </nav>

                    {/* Right Side Navigation */}
                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">{t('login')}</Link>
                        <Link to="/InscriptionClient" className="bg-[#4052B4] text-white px-4 py-2 rounded hover:bg-blue-700">{t('signup')}</Link>

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
                    </div>
                </div>
            </div>
        </header>
    );
}

