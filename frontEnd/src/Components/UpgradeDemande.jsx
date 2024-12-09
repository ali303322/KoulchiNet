// import React from 'react'

import SIdeBar from "./SIdeBar";

export default function UpgradeDemande() {
  return (
    <div className="flex min-h-screen">
      <SIdeBar/>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="max-w-7xl mx-auto">
            {/* Standard Plans */}
            <h2 className="text-3xl text-center text-[#34495e] mb-8 font-semibold">Services ordinaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Essential Plan */}
              <div className="bg-white rounded-lg p-8 shadow-lg relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#2980b9]"></div>
                <h3 className="text-2xl text-[#34495e] mb-4 min-h-[40px] flex items-center">Essentiel</h3>
                <div className="text-4xl text-[#2980b9] font-semibold mb-4 text-center min-h-[50px] flex items-center justify-center">
                  10 crédits
                </div>
                <p className="text-[#7f8c8d] mb-6 min-h-[60px] flex items-center">
                  Idéal pour les prestataires ayant des besoins limités
                </p>
                <ul className="mb-8 min-h-[60px]">
                  <li className="flex items-center text-[#34495e] mb-2">
                    <span className="text-[#2980b9] mr-2">✓</span>
                    Accès à 10 services
                  </li>
                </ul>
                <a href="#" className="block w-full bg-[#2980b9] text-white text-center py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 mb-4">
                  Choisir ce plan
                </a>
                <div className="text-2xl font-semibold text-[#34495e] text-center">49€</div>
              </div>

              {/* Standard Plan */}
              <div className="bg-white rounded-lg p-8 shadow-lg relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#3498db]"></div>
                <h3 className="text-2xl text-[#34495e] mb-4 min-h-[40px] flex items-center">Standard</h3>
                <div className="text-4xl text-[#2980b9] font-semibold mb-4 text-center min-h-[50px] flex items-center justify-center">
                  25 crédits
                </div>
                <p className="text-[#7f8c8d] mb-6 min-h-[60px] flex items-center">
                  Convient aux prestataires réguliers
                </p>
                <ul className="mb-8 min-h-[60px]">
                  <li className="flex items-center text-[#34495e] mb-2">
                    <span className="text-[#3498db] mr-2">✓</span>
                    Accès à 25 services
                  </li>
                </ul>
                <a href="#" className="block w-full bg-[#2980b9] text-white text-center py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 mb-4">
                  Choisir ce plan
                </a>
                <div className="text-2xl font-semibold text-[#34495e] text-center">99€</div>
              </div>

              {/* Advanced Plan with Animation */}
              <div className="bg-white rounded-lg p-8 shadow-lg relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden popular">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#5dade2]"></div>
                <h3 className="text-2xl text-[#34495e] mb-4 min-h-[40px] flex items-center">Avancé</h3>
                <div className="text-4xl text-[#2980b9] font-semibold mb-4 text-center min-h-[50px] flex items-center justify-center">
                  50 crédits
                </div>
                <p className="text-[#7f8c8d] mb-6 min-h-[60px] flex items-center">
                  Destiné aux prestataires ayant un volume d &rsquo;activité plus important
                </p>
                <ul className="mb-8 min-h-[60px]">
                  <li className="flex items-center text-[#34495e] mb-2">
                    <span className="text-[#5dade2] mr-2">✓</span>
                    Accès à 50 services
                  </li>
                </ul>
                <a href="#" className="block w-full bg-[#2980b9] text-white text-center py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 mb-4">
                  Choisir ce plan
                </a>
                <div className="text-2xl font-semibold text-[#34495e] text-center">179€</div>
              </div>

              {/* Premium Plan */}
              <div className="bg-white rounded-lg p-8 shadow-lg relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#7fb3d5]"></div>
                <h3 className="text-2xl text-[#34495e] mb-4 min-h-[40px] flex items-center">Premium</h3>
                <div className="text-4xl text-[#2980b9] font-semibold mb-4 text-center min-h-[50px] flex items-center justify-center">
                  100 crédits
                </div>
                <p className="text-[#7f8c8d] mb-6 min-h-[60px] flex items-center">
                  Parfait pour les prestataires très actifs
                </p>
                <ul className="mb-8 min-h-[60px]">
                  <li className="flex items-center text-[#34495e] mb-2">
                    <span className="text-[#7fb3d5] mr-2">✓</span>
                    Accès à 100 services
                  </li>
                </ul>
                <a href="#" className="block w-full bg-[#2980b9] text-white text-center py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 mb-4">
                  Choisir ce plan
                </a>
                <div className="text-2xl font-semibold text-[#34495e] text-center">299€</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
