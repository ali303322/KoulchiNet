import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from './image/Koulshinet.com (1).png';
export default function Header() {
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    const toggleLangDropdown = () => {
        setLangDropdownOpen(!langDropdownOpen);
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
                            className="h-[200px] w-auto absolute -top-12 left-0 object-contain filter contrast-125 brightness-105
                            [image-rendering:crisp-edges]
                            [image-rendering:-webkit-optimize-contrast]"
                        />
                    </Link>

                    {/* Main Navigation */}
                    <nav className="flex items-center space-x-8 ml-52">
                        <Link to="/AboutUs" className="text-gray-700 hover:text-blue-600">A propos</Link>
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
                        <Link to="/services" className="text-gray-700 hover:text-blue-600">Nos services</Link>
                        <Link to="/DevenirePrestataire" className="text-gray-700 hover:text-blue-600">Devenir prestataire</Link>
                        <Link to="/marketplace" className="text-gray-700 hover:text-blue-600">Marketplace</Link>
                    </nav>

                    {/* Right Side Navigation */}
                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">Se connecter</Link>
                        <Link to="/SignIn" className="bg-[#4052B4] text-white px-4 py-2 rounded hover:bg-blue-700">S&rsquo;inscrire</Link>

                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleLangDropdown}
                                className="flex items-center text-gray-700 hover:text-blue-600"
                            >
                                Fr
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {langDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-12 bg-white rounded-md shadow-lg py-1 z-50">
                                    <button onClick={toggleLangDropdown} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Fr
                                    </button>
                                    <button onClick={toggleLangDropdown} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        En
                                    </button>
                                    <button onClick={toggleLangDropdown} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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

