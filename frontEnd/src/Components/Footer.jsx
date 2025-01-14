// import React from 'react';

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#0A1931] text-white py-16">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-5 gap-16">
                {/* Company Info */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold mb-6 text-[#4A69BD]">Koulchinet.com</h3>
                    <p className="text-gray-300 mb-6">
                        Simplifiez vous la vie: Tous vos services en un clic
                    </p>
                    <div className="flex space-x-4">
                        {["facebook", "instagram", "linkedin", "youtube", "twitter"].map((icon) => (
                            <a key={icon} href="#" className="text-gray-300 hover:text-[#4A69BD]">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={getIconPath(icon)} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Pages */}
                <div className="space-y-8">
                    <h4 className="text-sm font-bold mb-6">Pages</h4>
                    <ul className="space-y-2">
                        {/* {["Acceuil", "Marketplace", "A propos", "Admin", "Prestataire dashboard", "Client dashboard"].map((page) => ( */}
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-[#4A69BD]">
                                    Acceuil
                                </Link>
                            </li>
                            <li>
                                <Link to="/Marketplace" className="text-gray-300 hover:text-[#4A69BD]">
                                Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link to="/AboutUs" className="text-gray-300 hover:text-[#4A69BD]">
                                A propos
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/" className="text-gray-300 hover:text-[#4A69BD]">
                                Admin
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/PrestataireDashboard" className="text-gray-300 hover:text-[#4A69BD]">
                                Prestataire dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/ClientDashboard" className="text-gray-300 hover:text-[#4A69BD]">
                                Client dashboard
                                </Link>
                            </li>
                        {/* ))} */}
                    </ul>
                </div>

                {/* Services */}
                <div className="space-y-8">
                    <h4 className="text-sm font-bold mb-6">Services</h4>
                    <ul className="space-y-2">
                        {[
                            "Service domestiques",
                            "Service décoration",
                            "Services d'accompagnement et de soutien",
                            "Service Rénovations résidentielles",
                            "Revêtement Plafond",
                            "Revêtement sol",
                            "Services Personnels et Bien-être",
                            "Services Evénements",
                        ].map((service) => (
                            <li key={service}>
                                <p className="text-gray-300 hover:text-[#4A69BD]">
                                    {service}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Assistance */}
                <div className="space-y-8">
                    <h4 className="text-sm font-bold mb-6">Assistance</h4>
                    <ul className="space-y-2">
                            <li>
                                <Link to="/ConditionGeneral" className="text-gray-300 hover:text-[#4A69BD]">
                                    condition general
                                </Link>
                            </li>
                            <li>
                                <Link to="/PolitiqueEtConfidentialite" className="text-gray-300 hover:text-[#4A69BD]">
                                    Politique et confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="text-gray-300 hover:text-[#4A69BD]">
                                    contact
                                </Link>
                            </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-8">
                    <h4 className="text-sm font-bold mb-6">
                        <Link to="/Contact" className="hover:text-gray-300 transition-colors">
                            Contact
                        </Link>
                    </h4>
                    <ul className="space-y-2">
                        <li className="text-gray-300">
                            <span className="font-bold">Société:</span> KOULCHINET
                        </li>
                        <li className="text-gray-300">
                            <span className="font-bold">Adresse:</span> 123 rue Rabat,
                            Maroc
                        </li>
                        <li className="text-gray-300">
                            <span className="font-bold">Tel:</span> 06 66 66 66 66
                        </li>
                        <li className="text-gray-300">
                            <span className="font-bold">Email:</span> contact@koulchinet.com
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-gray-700">
                <div className="text-center text-gray-400 text-sm">
                    © All right reserved by{" "}
                    <a href="#" className="text-[#4A69BD]">
                        koulchinet
                    </a>
                    . Powered by{" "}
                    <a href="https://cudi09.com/" className="text-[#4A69BD]">
                        https://cudi09.com/
                    </a>
                </div>
            </div>
        </footer>
    );
};

// Helper function for icon paths
const getIconPath = (icon) => {
    const paths = {
        facebook:
            "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
        instagram:
            "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
        linkedin:
            "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.184c-.966 0-1.5-.674-1.5-1.516 0-.854.548-1.516 1.434-1.516.966 0 1.5.662 1.5 1.516 0 .842-.534 1.516-1.434 1.516zm10.5 10.184h-3v-5.59c0-1.34-.48-2.252-1.686-2.252-.918 0-1.464.622-1.707 1.222-.088.216-.111.518-.111.82v5.8h-3s.039-9.421 0-10.409h3v1.472c-.005.008-.011.016-.016.024h.016v-.024c.4-.613 1.112-1.48 2.705-1.48 1.975 0 3.463 1.284 3.463 4.042v6.375z",
        youtube:
            "M19.615 3.184c-.86-.614-2.297-.806-5.615-.806s-4.754.193-5.615.806c-.86.614-1.335 1.557-1.5 3.621-.184 2.154-.184 2.888-.184 6.195s0 4.041.184 6.195c.165 2.064.64 3.007 1.5 3.621.86.614 2.297.806 5.615.806s4.754-.193 5.615-.806c.86-.614 1.335-1.557 1.5-3.621.184-2.154.184-2.888.184-6.195s0-4.041-.184-6.195c-.165-2.064-.64-3.007-1.5-3.621zm-8.615 11.215v-6.798l5.986 3.398-5.986 3.398z",
        twitter:
            "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-3.28-1.42c-3.18 0-5.59 3.11-4.81 6.17a10.66 10.66 0 01-7.72-3.92s-4.13 7.55 2.3 10.9c-.62.17-1.27.26-1.94.26-.48 0-.95-.04-1.4-.12.95 2.95 3.65 5.07 6.85 5.12a11.44 11.44 0 01-7.09 2.43c-.46 0-.92-.03-1.37-.09a15.94 15.94 0 008.64 2.55c10.34 0 16-8.57 16-16 0-.24-.01-.48-.03-.71a11.3 11.3 0 002.73-2.88z",
    };
    return paths[icon] || "";
};

export default Footer;
