// import React from 'react'

import Footer from "./Footer";
import Header from "./Header";
import img4 from './image/img4.jpeg'
export default function Marketplace() {
  return (
    <>
    <Header/>
<section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${img4})` }}>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Content Container */}
  <div className="relative z-10 h-full flex flex-col items-center justify-center">
    {/* Hero Text */}
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-bold mb-4">La Marketplace des Services de Proximité</h1>
      <p className="text-white text-3xl">Trouvez les meilleurs équipements pour exercer ou faire appel à des services professionnels de qualité</p>
    </div>
  </div>

  {/* Search Section - Positioned to overlap */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[95%] z-20">
    {/* Add your search content here */}
  </div>
</section>


{/* Bar Section with Search */}
<div className="relative -mt-8 mb-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
      />
      {/* Categories Dropdown */}
      <div className="relative w-72">
        <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 pr-8 text-gray-700 bg-white">
          <option>Toutes les catégories</option>
          <option>Services Domestiques</option>
          <option>Services d &rsquo;accompagnement</option>
          <option>Services Personnels</option>
          <option>Services Décoration</option>
          <option>Services Rénovation</option>
          <option>Services Informatiques</option>
          <option>Services Événements</option>
          <option>Services Professionnels</option>
          <option>Services Juridiques</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <i className="fas fa-chevron-down text-gray-400"></i>
        </div>
      </div>
      {/* Search Button */}
      <button className="bg-[#4052B4] hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
        Rechercher
      </button>
    </div>
  </div>
</div>


<div className="max-w-7xl mx-auto px-4 mb-12">
  <div className="flex gap-8">
    {/* Left Sidebar - Categories */}
    <div className="w-72">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#4052B4] mb-4">Catégories</h3>

        {/* Categories Dropdown */}
        <div className="relative mb-4">
          <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-700 bg-white mb-4">
            <option>Sélectionnez une catégorie</option>
            <option>Services Domestiques</option>
            <option>Services d &rsquo;accompagnement</option>
            <option>Services Personnels</option>
            <option>Services Décoration</option>
            <option>Services Rénovation</option>
            <option>Services Informatiques</option>
            <option>Services Événements</option>
            <option>Services Professionnels</option>
            <option>Services Juridiques</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <i className="fas fa-chevron-down text-gray-400"></i>
          </div>
        </div>

        {/* Categories Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Domestiques</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services d &rsquo;accompagnement</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Personnels</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Décoration</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Rénovation</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Informatiques</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Événements</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Professionnels</span>
          </label>
          <label className="flex items-center gap-2 text-gray-600 hover:text-[#4052B4] cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#4052B4]" />
            <span>Services Juridiques</span>
          </label>
        </div>
      </div>
    </div>

    {/* Right Side - Products Grid */}
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Card 1 - Services Informatiques */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
          <div className="h-48 bg-[#e9edf3] flex items-center justify-center">
            <svg style={{ width: '64px', height: '64px', fill: '#4052B4' }} viewBox="0 0 24 24">
              <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,17.73C4.46,17.95 4.73,18.04 4.95,17.95L7.44,16.95C7.96,17.34 8.5,17.68 9.13,17.93L9.5,20.58C9.54,20.82 9.75,21 10,21H14C14.25,21 14.46,20.82 14.5,20.58L14.87,17.93C15.5,17.68 16.04,17.34 16.56,16.95L19.05,17.95C19.27,18.04 19.54,17.95 19.66,17.73L21.66,14.27C21.78,14.05 21.73,13.78 21.54,13.63L19.43,12.97Z" />
            </svg>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-[#4052B4]">Services Informatiques</h3>
            <p className="text-gray-600">Assistance en informatique et dépannage pour particuliers et entreprises.</p>
          </div>
        </div>
        {/* Repeat Product Card for others */}
      </div>
    </div>
  </div>
</div>

<Footer/>
    </>
  )
}


//         <!-- Right Side - Products Grid -->
//         <div class="flex-1">
//             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <!-- Product Card 1 - Services Informatiques -->
//                 <div class="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
//                     <div class="h-48 bg-[#e9edf3] flex items-center justify-center">
//                         <svg style="width:64px;height:64px;fill:#4052B4" viewBox="0 0 24 24">
//                             <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
//                         </svg>
//                     </div>
//                     <div class="p-4">
//                         <div class="text-[#4052B4] text-sm mb-1">Services Informatiques</div>
//                         <h3 class="font-semibold mb-2">Kit de maintenance PC</h3>
//                         <div class="text-[#4052B4] font-bold text-xl mb-4">89.99 €</div>
//                         <a href="#" class="block bg-[#f6ad55] hover:bg-[#ed8936] text-white text-center py-2 rounded-md transition-colors">
//                             Acheter
//                         </a>
//                     </div>
//                 </div>

//                 <!-- Product Card 2 - Services Domestiques -->
//                 <div class="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
//                     <div class="h-48 bg-[#e9edf3] flex items-center justify-center">
//                         <svg style="width:64px;height:64px;fill:#4052B4" viewBox="0 0 24 24">
//                             <path d="M12,3L2,12H5V20H19V12H22L12,3M12,8.75A2.25,2.25 0 0,1 14.25,11A2.25,2.25 0 0,1 12,13.25A2.25,2.25 0 0,1 9.75,11A2.25,2.25 0 0,1 12,8.75M12,15C13.5,15 16.5,15.75 16.5,17.25V18H7.5V17.25C7.5,15.75 10.5,15 12,15Z" />
//                         </svg>
//                     </div>
//                     <div class="p-4">
//                         <div class="text-[#4052B4] text-sm mb-1">Services Domestiques</div>
//                         <h3 class="font-semibold mb-2">Kit de nettoyage premium</h3>
//                         <div class="text-[#4052B4] font-bold text-xl mb-4">49.99 €</div>
//                         <a href="#" class="block bg-[#f6ad55] hover:bg-[#ed8936] text-white text-center py-2 rounded-md transition-colors">
//                             Acheter
//                         </a>
//                     </div>
//                 </div>

//                 <!-- Product Card 3 - Services Rénovation -->
//                 <div class="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
//                     <div class="h-48 bg-[#e9edf3] flex items-center justify-center">
//                         <svg style="width:64px;height:64px;fill:#4052B4" viewBox="0 0 24 24">
//                             <path d="M13.5,17V19L12,22L10.5,19V17H13.5M19.5,3.5L18,2L16.5,3.5L15,2L13.5,3.5L12,2L10.5,3.5L9,2L7.5,3.5L6,2L4.5,3.5L3,2V14H12V12.5A2.5,2.5 0 0,1 14.5,10A2.5,2.5 0 0,1 17,12.5V14H21V2L19.5,3.5Z" />
//                         </svg>
//                     </div>
//                     <div class="p-4">
//                         <div class="text-[#4052B4] text-sm mb-1">Services Rénovation</div>
//                         <h3 class="font-semibold mb-2">Kit d'outils rénovation</h3>
//                         <div class="text-[#4052B4] font-bold text-xl mb-4">149.99 €</div>
//                         <a href="#" class="block bg-[#f6ad55] hover:bg-[#ed8936] text-white text-center py-2 rounded-md transition-colors">
//                             Acheter
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

