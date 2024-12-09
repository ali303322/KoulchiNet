// import React from 'react'
import Footer from './Footer';
import  Header from './Header';
import img4 from './image/img4.jpeg'
export default function AboutPage() {
  return (
    <>
    <Header/>
           {/* Hero Section */}
            <section
                className="relative h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${img4})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-white text-5xl font-bold mb-4">A propos</h1>
                    <p className="text-white text-xl max-w-3xl">
                        La plateforme qui connecte les experts de votre quartier avec vos projets
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">A propos de koulchinet</h2>
                        <p className="text-gray-600">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                            the cites of the word in classical literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of (The
                            Extremes of Good and Evil) by Cicero, written in 45 BC.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Notre mission</h2>
                        <p className="text-gray-600">
                            Notre plateforme est née dune vision simple mais puissante : faciliter la mise en
                            relation entre les particuliers et les professionnels de services locaux qualifiés. Nous
                            croyons en la force de la communauté locale et en limportance de services de qualité
                            accessibles à tous.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-10">Pourquoi Nous Choisir ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Quality Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-[#4052B4]"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Qualité Certifiée</h3>
                                <p className="text-sm text-gray-600">
                                    Nos prestataires sont rigoureusement sélectionnés et évalués par notre
                                    communauté.
                                </p>
                            </div>
                        </div>

                        {/* Proximity Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-[#4052B4]"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Proximité</h3>
                                <p className="text-sm text-gray-600">
                                    Des prestataires locaux près de chez vous pour une intervention rapide et
                                    efficace.
                                </p>
                            </div>
                        </div>

                       {/* Transparency Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-12 h-12 text-[#4052B4]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                            </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Transparence</h3>
                            <p className="text-sm text-gray-600">
                            Avis vérifiés et notation détaillée pour chaque prestataire.
                            </p>
                        </div>
                        </div>

                        {/* Professionalism Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-12 h-12 text-[#4052B4]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Professionnalisme</h3>
                            <p className="text-sm text-gray-600">
                            Des prestataires expérimentés et qualifiés dans leur domaine.
                            </p>
                        </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Our Commitment Section */}
        <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Notre engagement</h2>
            <p className="text-gray-600 mb-8">Nous nous engageons à:</p>

            <ul className="space-y-4 text-gray-600 list-none pl-0">
            <li className="flex items-start">
                <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
                <span>Vérifier rigoureusement lidentité et les qualifications de chaque prestataire</span>
            </li>

            <li className="flex items-start">
                <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
                <span>Assurer un suivi qualité continu de nos prestataires</span>
            </li>

            <li className="flex items-start">
                <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
                <span>Garantir une mise en relation rapide et efficace</span>
            </li>

            <li className="flex items-start">
                <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
                <span>Protéger vos données personnelles</span>
            </li>

            <li className="flex items-start">
                <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
                <span>Proposer un support client réactif 7j/7</span>
            </li>
            </ul>
        </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-100 mb-16">
        <div className="max-w-7xl mx-auto px-4">
            {/* Combined Contact Container */}
            <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100" style={{ minHeight: '550px' }}>
            {/* Left Column - Contact Info */}
            <div className="w-full md:w-1/2 p-12 space-y-8">
                <h2 className="text-2xl font-semibold text-[#4052B4]">Prenons contact avec nous</h2>

                {/* Email */}
                <div className="flex items-center space-x-4">
                <div className="text-[#4052B4]">
                    <i className="far fa-envelope text-2xl"></i>
                </div>
                <p className="text-gray-600 text-lg">contact@koulshinet.com</p>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                <div className="text-[#4052B4]">
                    <i className="fas fa-phone-alt text-2xl"></i>
                </div>
                <p className="text-gray-600 text-lg">06.66.66.66.66</p>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                <div className="text-[#4052B4]">
                    <i className="fas fa-map-marker-alt text-2xl"></i>
                </div>
                <p className="text-gray-600 text-lg">123 rue Rabat,<br />Maroc</p>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                <p className="text-gray-600 text-lg mb-4">Contactez nous :</p>
                <div className="flex space-x-6">
                    <a href="#" className="text-[#4052B4] hover:text-blue-700">
                    <i className="fab fa-facebook-f text-2xl"></i>
                    </a>
                    <a href="#" className="text-[#4052B4] hover:text-blue-700">
                    <i className="fab fa-instagram text-2xl"></i>
                    </a>
                    <a href="#" className="text-[#4052B4] hover:text-blue-700">
                    <i className="fab fa-linkedin-in text-2xl"></i>
                    </a>
                </div>
                </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="w-full md:w-1/2 bg-[#4052B4] p-12">
                <h2 className="text-2xl font-semibold text-white mb-8">Contactez nous</h2>
                <form className="space-y-6">
                {/* Name Input */}
                <div>
                    <input type="text"
                    placeholder="Votre nom complet"
                    className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg" />
                </div>

                {/* Email Input */}
                <div>
                    <input type="email"
                    placeholder="Votre email"
                    className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg" />
                </div>

                {/* Subject Input */}
                <div>
                    <input type="text"
                    placeholder="sujet"
                    className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg" />
                </div>

                {/* Message Input */}
                <div>
                    <textarea placeholder="Votre message"
                    className="w-full px-6 py-4 rounded-3xl bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none resize-none text-lg"
                    style={{ minHeight: '140px' }}></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit"
                    className="w-full px-8 py-4 bg-white text-[#4052B4] rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg">
                    Envoyer
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </section>
        <Footer/>

        </>
  )
}
