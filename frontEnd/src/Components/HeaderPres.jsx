// import React from 'react'
import KoulshiNet from "./image/Koulshinet.com (1).png"
import React, { useState } from "react";
import img3 from "./image/img3.png"
export default function HeaderPres() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const closeDropdown = (e) => {
      if (!e.target.closest('#langBtn')) {
        setIsDropdownOpen(false);
      }
    };

    React.useEffect(() => {
      window.addEventListener('click', closeDropdown);
      return () => window.removeEventListener('click', closeDropdown);
    }, []);

    return (
      <header className="bg-white w-full h-[70px] shadow-sm">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src={KoulshiNet}
                alt="Koulchinet.com"
                className="h-[200px] w-auto absolute -top-12 left-0 object-contain
                filter contrast-125 brightness-105
                [image-rendering:crisp-edges]
                [image-rendering:-webkit-optimize-contrast]"
              />
            </a>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-10">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  id="langBtn"
                  className="flex items-center text-black hover:text-blue-600 font-bold text-lg"
                  onClick={toggleDropdown}
                >
                  Fr
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-16 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                    >
                      Fr
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                    >
                      En
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold"
                    >
                      Ar
                    </a>
                  </div>
                )}
              </div>

              {/* Notification Bell */}
              <button className="text-[#4a69bd] hover:text-blue-600 relative">
                <i className="fas fa-bell text-2xl"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Chat Icon */}
              <button className="text-[#4a69bd] hover:text-blue-600 relative">
                <i className="fas fa-comment-dots text-2xl"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Profile Picture */}
              <div className="relative">
                <button className="flex items-center space-x-3">
                  <img
                    src={img3}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}
