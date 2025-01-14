// import React from 'react'
import Header from './Header'
import Footer from './Footer'
import img4 from './image/DevenirPrestataire.webp'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderPres from './HeaderPres';
import HeaderClient from './HeaderClient';
import { useTranslation } from "react-i18next";
import DashboardHeader from './DashboardHeader';
export default function DevenirPrestataire() {

    const [categories , setCategories] = useState([]);
    const [services , setServices] = useState([]);
    const {t} = useTranslation();

      useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/categories',
          };

          axios.request(config)
          .then((response) => {
            setCategories(response.data)
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

    },[])

      useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/services',
          };

          axios.request(config)
          .then((response) => {
            setServices(response.data)
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

    },[])

    const auth = localStorage.getItem('role');


  return (
    <div className='bg-gray-100 font-sans'>
          {auth === "prestataire" ? (
        <HeaderPres />
      ) : auth === "client" ? (
        <HeaderClient />
      ) : auth == "admin" ?(
        <DashboardHeader />
      ) : (
        <Header />
      )}
        <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${img4})` }}
        >
        {/* Dark overlay with more opacity to match image */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-5xl font-bold mb-4">
            {t('becomeProvider')}
            </h1>
            <p className="text-white text-xl mb-8">
            {t('joinCommunity')}
            </p>
            <Link
            to="/InscriptionPrestataire"
            className="bg-[#ed8936] hover:bg-[#f6ad55] text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
            {t('getStarted')}
            </Link>
        </div>
        </section>

        <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('whyJoinUs')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Développez votre activité Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                    <svg className="w-12 h-12 text-[#4299e1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" />
                    </svg>
                </div>
                <h3 className="text-[#4a69bd] font-bold text-xl mb-2">{t('developActivity')}</h3>
                <p className="text-sm text-gray-600">
                    {t('developActivityDesc')}
                </p>
                </div>
            </div>

            {/* Flexibilité totale Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                    <svg className="w-12 h-12 text-[#4299e1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z" />
                    </svg>
                </div>
                <h3 className="text-[#4a69bd] font-bold text-xl mb-2">{t('flexibility')}</h3>
                <p className="text-sm text-gray-600">
                    {t('flexibilityDesc')}
                </p>
                </div>
            </div>

            {/* Support dédié Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                    <svg className="w-12 h-12 text-[#4299e1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
                    </svg>
                </div>
                <h3 className="text-[#4a69bd] font-bold text-xl mb-2">{t('dedicatedSupport')}</h3>
                <p className="text-sm text-gray-600">
                    {t('dedicatedSupportDesc')}
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-black mb-12">{t('howItWorksProvider')}</h2>

            <div className="max-w-3xl space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                1
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">{t('step1')}</h3>
                <p className="text-gray-600 text-sm">
                {t('step1Desc')}
                </p>
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                2
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">{t('step2')}</h3>
                <p className="text-gray-600 text-sm">
                {t('step2Desc')}
                </p>
                </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                3
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">{t('step3')}</h3>
                <p className="text-gray-600 text-sm">
                {t('step3Desc')}
                </p>
                </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                4
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">{t('step4')}</h3>
                <p className="text-gray-600 text-sm">
                {t('step4Desc')}
                </p>
                </div>
            </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12">
            <Link
                to="/InscriptionPrestataire"
                className="inline-block bg-[#ed8936] hover:bg-[#f6ad55] text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
                {t('getStarted')}
            </Link>
            </div>
        </div>
        </section>


{categories.map((cat, index) => (
  <section key={index} className="py-16 bg-gray-100">
    <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">
          {cat.nom}
        </h2>
        <div className="h-0.5 bg-orange-400"></div>
      </div>

      {/* Services Layout */}
      <div className="flex flex-wrap gap-6">
        {/* Each service as a link */}
        {services.map((ser, index) => {
          if (ser.category_id === cat.id) {
            return (
              <Link
              to={`/servicePageDesc/${ser.serviceName}`} // Replace with the appropriate path
                key={index}
                className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
               <i className={`text-blue-500 w-5 h-5 `}>
               <img
                    src={`http://127.0.0.1:8000/${ser.icon}`}
                    alt="Icon"
                    className="w-5 h-5 object-cover"
                    />
                </i>{/* Add the appropriate icon here */}
                <span className="text-gray-700 text-sm">{ser.serviceName}</span>
              </Link>
            );
          }
          return null; // Return null if the condition is not met (i.e., the category doesn't match)
        })}
      </div>
    </div>
  </section>
))}
        <Footer/>
    </div>
  )
}

