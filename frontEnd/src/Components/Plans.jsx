// import React from 'react'

import { Link } from "react-router-dom";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";

export default function Plans() {
  return (
    <div className="bg-gray-100 font-sans">
    <HeaderPres/>

     {/* Main Content */}
     <div className="flex min-h-screen">
       <SideBarPres/>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Services Section */}
          <h2 className="text-3xl text-center text-[#34495e] mb-8 font-semibold">
            Services ordinaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Essentiel",
                credits: "10 crédits",
                description: "Idéal pour les prestataires ayant des besoins limités",
                price: "49€",
                features: ["Accès à 10 services"],
                highlightColor: "#2980b9",
              },
              {
                title: "Standard",
                credits: "25 crédits",
                description: "Convient aux prestataires réguliers",
                price: "99€",
                features: ["Accès à 25 services"],
                highlightColor: "#3498db",
              },
              {
                title: "Avancé",
                credits: "50 crédits",
                description:
                  "Destiné aux prestataires ayant un volume d'activité plus important",
                price: "179€",
                features: ["Accès à 50 services"],
                highlightColor: "#5dade2",
                popular: true,
              },
              {
                title: "Premium",
                credits: "100 crédits",
                description: "Parfait pour les prestataires très actifs",
                price: "299€",
                features: ["Accès à 100 services"],
                highlightColor: "#7fb3d5",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 shadow-lg relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden ${
                  plan.popular ? "popular" : ""
                }`}
              >
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ backgroundColor: plan.highlightColor }}
                ></div>
                <h3 className="text-2xl text-[#34495e] mb-4 min-h-[40px] flex items-center">
                  {plan.title}
                </h3>
                <div className="text-4xl text-[#2980b9] font-semibold mb-4 text-center min-h-[50px] flex items-center justify-center">
                  {plan.credits}
                </div>
                <p className="text-[#7f8c8d] mb-6 min-h-[60px] flex items-center">
                  {plan.description}
                </p>
                <ul className="mb-8 min-h-[60px]">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-[#34495e] mb-2"
                    >
                      <span
                        className="mr-2"
                        style={{ color: plan.highlightColor }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to= '/PrestataireDashboard/Plans/submitPlan'
                  className="block  w-full bg-[#2980b9] text-white text-center py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 mb-4"
                >
                  Choisir ce plan
                </Link>
                <div className="text-2xl font-semibold text-[#34495e] text-center">
                  {plan.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
