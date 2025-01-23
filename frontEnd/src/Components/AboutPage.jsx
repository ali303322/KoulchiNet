// import React from 'react'
import { useState } from 'react';
import Footer from './Footer';
import  Header from './Header';
import img4 from './image/Apropos.webp'
import axios from 'axios';
import HeaderPres from './HeaderPres';
import HeaderClient from './HeaderClient';
import { useTranslation } from 'react-i18next';
import DashboardHeader from './DashboardHeader';
export default function AboutPage() {
    const [nomComplet,setNomComplet] = useState('');
    const [email,setEmail] = useState('');
    const [subject,setSubject] = useState('');
    const [Message,setMessage] = useState('');
    const [manage,setManage] = useState('');
    const { t } = useTranslation();


      const handleSubmit = ()=>{
          const formData = new FormData();
          formData.append('NomComplet',nomComplet);
          formData.append('email',email);
          formData.append('subjet',subject);
          formData.append('message',Message);

          if(formData){
                  axios.post('https://back.koulchinet.com/api/contactMessage',formData)
                  .then(response=>{
                      setManage(response.message);
                      alert('message envoyé avec succès')
                  }).catch(error=>{
                      console.error(error);

                  });
          }
      }

    const auth = localStorage.getItem('role');


  return (
    <div className='bg-gray-100'>
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
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${img4})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-5xl font-bold mb-4">{t('aboutTitle')}</h1>
          <p className="text-white text-xl max-w-3xl">{t('aboutContent')}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('aboutKoulchinet')}</h2>
            <p className="text-gray-600">{t('koulchinetDescription')}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('missionTitle')}</h2>
            <p className="text-gray-600">{t('missionDescription')}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">{t('whyChooseUs')}</h2>
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
                <h3 className="font-semibold mb-2">{t('qualityCertified')}</h3>
                <p className="text-sm text-gray-600">{t('qualityDescription')}</p>
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
                <h3 className="font-semibold mb-2">{t('proximity')}</h3>
                <p className="text-sm text-gray-600">{t('proximityDescription')}</p>
              </div>
            </div>

            {/* Transparency Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#4052B4]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{t('transparency')}</h3>
                <p className="text-sm text-gray-600">{t('transparencyDescription')}</p>
              </div>
            </div>

            {/* Professionalism Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#4052B4]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{t('professionalism')}</h3>
                <p className="text-sm text-gray-600">{t('professionalismDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('commitment')}</h2>
          <p className="text-gray-600 mb-8">{t('commitmentDescription')}</p>

          <ul className="space-y-4 text-gray-600 list-none pl-0">
            <li className="flex items-start">
              <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
              <span>{t('commitmentPoints.identityVerification')}</span>
            </li>

            <li className="flex items-start">
              <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
              <span>{t('commitmentPoints.qualityMonitoring')}</span>
            </li>

            <li className="flex items-start">
              <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
              <span>{t('commitmentPoints.fastConnection')}</span>
            </li>

            <li className="flex items-start">
              <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
              <span>{t('commitmentPoints.dataProtection')}</span>
            </li>

            <li className="flex items-start">
              <i className="fas fa-check text-[#4052B4] text-lg mt-1 mr-3"></i>
              <span>{t('commitmentPoints.customerSupport')}</span>
            </li>
          </ul>
        </div>
      </section>

        {/* Contact Section */}
        <section className="bg-gray-100 mb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Combined Contact Container */}
        <div
          className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg"
          style={{ minHeight: '600px' }}
        >
          {/* Left Column - Contact Info */}
          <div className="w-full md:w-1/2 p-12 space-y-8">
            <h2 className="text-3xl font-semibold text-[#4052B4]">{t('contactTitle')}</h2>

            {/* Email */}
            <div className="flex items-center space-x-6">
              <div className="text-[#4052B4]">
                <i className="far fa-envelope text-3xl"></i>
              </div>
              <p className="text-gray-600 text-lg">{t('email')}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-6">
              <div className="text-[#4052B4]">
                <i className="fas fa-phone-alt text-3xl"></i>
              </div>
              <p className="text-gray-600 text-lg">{t('phone')}</p>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-6">
              <div className="text-[#4052B4]">
                <i className="fas fa-map-marker-alt text-3xl"></i>
              </div>
              <p className="text-gray-600 text-lg">{t('address')}</p>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-gray-600 text-lg mb-4">{t('contactSocialLinks')}</p>
              <div className="flex space-x-8">
                <a href="#" className="text-[#4052B4] hover:text-blue-700">
                  <i className="fab fa-facebook-f text-3xl"></i>
                </a>
                <a href="#" className="text-[#4052B4] hover:text-blue-700">
                  <i className="fab fa-instagram text-3xl"></i>
                </a>
                <a href="#" className="text-[#4052B4] hover:text-blue-700">
                  <i className="fab fa-linkedin-in text-3xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full md:w-1/2 bg-[#4052B4] p-12">
            <h2 className="text-3xl font-semibold text-white mb-6">{t('contactTitle')}</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder={t('namePlaceholder')}
                  className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg"
                  onChange={(e) => setNomComplet(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Subject Input */}
              <div>
                <input
                  type="text"
                  placeholder={t('subjectPlaceholder')}
                  className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Message Input */}
              <div>
                <textarea
                  placeholder={t('messagePlaceholder')}
                  className="w-full px-6 py-4 rounded-3xl bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none resize-none text-lg"
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ minHeight: '150px' }}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white text-[#4052B4] rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
                >
                  {t('contactSubmitButton')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
        <Footer/>

        </div>
  )
}
