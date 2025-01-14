// import React from 'react'

import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import img4 from './image/NosServices.webp'
import SearchBar from "./SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderPres from "./HeaderPres";
import HeaderClient from "./HeaderClient";
import { useTranslation } from "react-i18next";
import DashboardHeader from "./DashboardHeader";
export default function Service() {

    const [categories , setCategories] = useState([]);
    const [services , setServices] = useState([]);

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
    const { t } = useTranslation();

  return (
    <div className="bg-gray-100">
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
      className="relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${img4})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <h1 className="text-white text-6xl font-bold mb-4">{t('servicesTitle')}</h1>
        <p className="text-white text-3xl">{t('servicesDescription')}</p>
      </div>
    </div>
      <SearchBar/>
   </section>

       {/* Spacing */}
       <div className="h-16"></div>

{/* Services Domestiques Section */}
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
                <span className="text-gray-700 text-sm">{t(`servicesDy.${ser.serviceName}`)}</span>
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


// <!-- Hero Section -->
// <section class="relative h-[500px] bg-cover bg-center" style="background-image: url('image/img4.jpeg');">
//     <!-- Dark overlay -->
//     <div class="absolute inset-0 bg-black bg-opacity-50"></div>

//     <!-- Content Container -->
//     <div class="relative z-10 h-full flex flex-col items-center justify-center">
//         <!-- Hero Text -->
//         <div class="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
//             <h1 class="text-white text-6xl font-bold mb-4">Nos services</h1>
//             <p class="text-white text-3xl">Une large gamme de services professionnels à votre disposition</p>
//         </div>
//     </div>

//     <!-- Search Section - Positioned to overlap -->
//     <div class="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[95%] z-20">
//         <div class="max-w-[1400px] mx-auto bg-white rounded-lg shadow-lg p-8">
//             <h2 class="text-center text-3xl font-bold text-[#4052B4] mb-8">Trouvez votre prestataire</h2>

//             <div class="grid grid-cols-4 gap-8">
//                 <!-- Ville -->
//                 <div class="flex flex-col">
//                     <label class="text-sm text-gray-600 mb-2 ml-6">Choisir votre ville</label>
//                     <select class="w-full px-4 py-2.5 rounded-full border border-gray-300">
//                         <option>Choisir votre ville</option>
//                         <option>Choisir votre ville</option>
//                         <option>Choisir votre ville</option>
//                     </select>
//                 </div>

//                 <!-- Secteur -->
//                 <div class="flex flex-col">
//                     <label class="text-sm text-gray-600 mb-2 ml-6">Choisir votre quartier</label>
//                     <select class="w-full px-4 py-2.5 rounded-full border border-gray-300">
//                         <option>Choisir votre quartier</option>
//                         <option>Choisir votre quartier</option>
//                         <option>Choisir votre quartier</option>
//                     </select>
//                 </div>

//                 <!-- Service -->
//                 <div class="flex flex-col">
//                     <label class="text-sm text-gray-600 mb-2 ml-6">Choisir votre service</label>
//                     <select class="w-full px-4 py-2.5 rounded-full border border-gray-300">
//                         <option>Choisir votre service</option>
//                         <option>Choisir votre service</option>
//                         <option>Choisir votre service</option>
//                     </select>
//                 </div>

//                 <!-- Search Button -->
//                 <div class="flex items-end">
//                     <button class="w-full bg-[#4052B4] text-white px-6 py-2.5 rounded-full flex items-center justify-center">
//                         <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                         <a href="findprestataire.html">Rechercher</a>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>

// <div class="h-16"></div>

// <!-- Services Domestiques Section -->
// <section class="py-16 bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services Domestiques</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Ménage -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-broom text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Ménage</span>
//             </a>

//             <!-- Jardinage -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-leaf text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Jardinage</span>
//             </a>

//             <!-- Electricité -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-bolt text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Electricité</span>
//             </a>

//             <!-- Plomberie -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-faucet text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Plomberie</span>
//             </a>

//             <!-- Menuiserie Bois -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-hammer text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Menuiserie Bois</span>
//             </a>

//             <!-- Menuiserie Aluminium -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-window-maximize text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Menuiserie Aluminium</span>
//             </a>

//             <!-- Peinture et décoration -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-paint-roller text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Peinture et décoration</span>
//             </a>

//             <!-- Contrôle des nuisibles -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-bug text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Contrôle des nuisibles</span>
//             </a>

//             <!-- Réparation appareil électroménager -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-blender text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Réparation appareil électroménager</span>
//             </a>

//             <!-- Assemblage des meubles -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-couch text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Assemblage des meubles</span>
//             </a>

//             <!-- Installation TV et accessoires électroniques -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-tv text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Installation TV et accessoires électroniques</span>
//             </a>

//             <!-- Miroiterie -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-clone text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Miroiterie</span>
//             </a>

//             <!-- Déménagement -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-truck text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Déménagement</span>
//             </a>

//             <!-- Energie solaire -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-solar-panel text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Energie solaire</span>
//             </a>

//             <!-- Tapisserie -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-scroll text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Tapisserie</span>
//             </a>

//             <!-- Serrurier -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-key text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Serrurier</span>
//             </a>

//             <!-- Mécanique Auto -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-car text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Mécanique Auto</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services d'accompagnement Section -->
// <section class=" bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services d'accompagnement</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Garde d'enfants -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-baby text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Garde d'enfants</span>
//             </a>

//             <!-- Garde d'animaux -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-paw text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Garde d'animaux</span>
//             </a>

//             <!-- Toilettage d'animaux -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-cut text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Toilettage d'animaux</span>
//             </a>

//             <!-- Aide aux personnes âgées -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-user-nurse text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Aide aux personnes âgées</span>
//             </a>

//             <!-- Kinésithérapie -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-hand-holding-medical text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Kinésithérapie</span>
//             </a>

//             <!-- Soins à domicile -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-heartbeat text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Soins à domicile</span>
//             </a>

//             <!-- Cours à domicile -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-book text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Cours à domicile</span>
//             </a>

//             <!-- Cours de musique -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-music text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Cours de musique</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services de Rénovations résidentielles Section -->
// <section class="py-16 bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Rénovations résidentielles</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Maçonnerie -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-hard-hat text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Maçonnerie</span>
//             </a>

//             <!-- Rénovations cuisines -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-utensils text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Rénovations cuisines</span>
//             </a>

//             <!-- Rénovations salle de Bains -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-bath text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Rénovations salle de Bains</span>
//             </a>

//             <!-- Carrelage -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-border-all text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Carrelage</span>
//             </a>

//             <!-- Parquet -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-square text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Parquet</span>
//             </a>

//             <!-- Installation fenêtres et rideaux -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-window-restore text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Installation fenêtres et rideaux</span>
//             </a>

//             <!-- Plâtre -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-layer-group text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Plâtre</span>
//             </a>

//             <!-- Installation chauffe à eaux -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-hot-tub text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Installation chauffe à eaux</span>
//             </a>

//             <!-- Peinture Intérieure et extérieure -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-brush text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Peinture Intérieure et extérieure</span>
//             </a>

//             <!-- Climatisation et froid -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-snowflake text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Climatisation et froid</span>
//             </a>

//             <!-- Marbre -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-square text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Marbre</span>
//             </a>

//             <!-- Inox -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-shield-alt text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Inox</span>
//             </a>

//             <!-- Etanchéité -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-tint text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Etanchéité</span>
//             </a>

//             <!-- Energie Solaire -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-solar-panel text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Energie Solaire</span>
//             </a>

//             <!-- Vidéo-surveillance -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-video text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Vidéo-surveillance</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services Personnels et Bien-être Section -->
// <section class="bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services Personnels et Bien-être</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Coaching Sportif -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-running text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Coaching Sportif</span>
//             </a>

//             <!-- Coaching mental -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-brain text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Coaching mental</span>
//             </a>

//             <!-- Diététique et nutrition -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-apple-alt text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Diététique et nutrition</span>
//             </a>

//             <!-- Thérapie par massage -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-spa text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Thérapie par massage</span>
//             </a>

//             <!-- Kinésithérapie -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-hand-holding-medical text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Kinésithérapie</span>
//             </a>

//             <!-- Coiffeur à domicile -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-cut text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Coiffeur à domicile</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services Evénements Section -->
// <section class="py-16">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services Evénements</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Hôtesses -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-female text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Hôtesses</span>
//             </a>

//             <!-- Serveurs -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-concierge-bell text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Serveurs</span>
//             </a>

//             <!-- Chef à domicile -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-hat-chef text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Chef à domicile</span>
//             </a>

//             <!-- Traiteurs -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-utensils text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Traiteurs</span>
//             </a>

//             <!-- Orchestres -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-guitar text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Orchestres</span>
//             </a>

//             <!-- Disc Jockey (DJ) -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-music text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Disc Jockey (DJ)</span>
//             </a>

//             <!-- Negafa et cérémonies de mariage -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-gem text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Negafa et cérémonies de mariage</span>
//             </a>

//             <!-- Photographes et cameraman -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-camera text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Photographes et cameraman</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services Informatiques Section -->
// <section class="bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services Informatiques</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Assistance Informatique -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-laptop-medical text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Assistance Informatique</span>
//             </a>

//             <!-- Design des sites Web -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-code text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Design des sites Web</span>
//             </a>

//             <!-- Copywriting et SEO -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-pencil-alt text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Copywriting et SEO</span>
//             </a>

//             <!-- e-Commerce -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-shopping-cart text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">e-Commerce</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services Professionnels Section -->
// <section class="py-16 bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services Professionnels</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Architectes -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-drafting-compass text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Architectes</span>
//             </a>

//             <!-- Design Graphique -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-palette text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Design Graphique</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Services Juridiques Section -->
// <section class="bg-gray-100">
//     <div class="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
//         <!-- Section Title -->
//         <div class="mb-8">
//             <h2 class="text-2xl font-semibold text-[#4052B4] mb-4">Services Juridiques</h2>
//             <div class="h-0.5 bg-orange-400"></div>
//         </div>

//         <!-- Services Layout -->
//         <div class="flex flex-wrap gap-6">
//             <!-- Avocats -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-balance-scale text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Avocats</span>
//             </a>

//             <!-- Notaires -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-stamp text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Notaires</span>
//             </a>

//             <!-- Adoul -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-file-signature text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Adoul</span>
//             </a>

//             <!-- Huissier de justice -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-gavel text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Huissier de justice</span>
//             </a>

//             <!-- Comptabilité et tenue des livres -->
//             <a href="#" class="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all">
//                 <i class="fas fa-calculator text-blue-500 w-5 h-5"></i>
//                 <span class="text-gray-700 text-sm">Comptabilité et tenue des livres</span>
//             </a>
//         </div>
//     </div>
// </section>

// <!-- Testimonial Section -->
// <section class="bg-gray-100 py-32">
//     <div class="max-w-[75%] mx-auto">
//         <!-- Testimonial Container -->
//         <div class="relative flex items-center justify-center min-h-[200px]">
//             <!-- Previous Button -->
//             <button class="absolute left-0 p-3 rounded-full bg-[#4052B4] text-white hover:bg-[#324092] transition-colors">
//                 <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
//                 </svg>
//             </button>

//             <!-- Testimonial Content -->
//             <div class="text-center max-w-3xl px-4">
//                 <!-- Profile Image -->
//                 <div>
//                     <img src="image/img3.png" alt="Anouar.A" class="w-24 h-24 mx-auto">
//                 </div>

//                 <!-- Name -->
//                 <h3 class="text-2xl font-semibold text-[#4052B4] mb-2">Anouar.A</h3>

//                 <!-- Testimonial Text -->
//                 <p class="text-gray-700 text-lg leading-relaxed font-light italic">
//                     "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
//                 </p>
//             </div>

//             <!-- Next Button -->
//             <button class="absolute right-0 p-3 rounded-full bg-[#4052B4] text-white hover:bg-[#324092] transition-colors">
//                 <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
//                 </svg>
//             </button>
//         </div>
//     </div>
// </section>



