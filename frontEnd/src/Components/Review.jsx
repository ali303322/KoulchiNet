// import React from 'react'

import { useState } from "react";
import img3 from "./image/img3.png";
import HeaderClient from "./HeaderClient";
import SideBarClient from "./SideBarClient";

export default function Review() {
    const [activeStars, setActiveStars] = useState(0);

    const handleStarClick = (index) => {
        if (index < activeStars) {
            setActiveStars(index);
        } else {
            setActiveStars(index + 1);
        }
    };

    return (
        <div className="bg-gray-100 font-sans">
        <HeaderClient/>

        {/* Main Content */}
        <div className="flex min-h-screen">
        <SideBarClient/>
                <div className="flex-1 p-8">
                    <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center mb-6">
                            <img src={img3} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-3" />
                            <h2 className="text-xl font-semibold">Ahmed reda</h2>
                            <p className="text-[#4a69bd]">Plombier</p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center space-x-2 mb-6">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleStarClick(index)}
                                    className={`star-btn ${index < activeStars ? 'active' : ''}`}
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                </button>
                            ))}
                        </div>

                        {/* Comment Box */}
                        <div className="mb-6">
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none resize-none"
                                rows="4"
                                placeholder="ajouter un commentaire"
                            ></textarea>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-center">
                            <button className="bg-[#4a69bd] text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
