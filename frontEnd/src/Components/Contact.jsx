// import React from 'react'

import Footer from "./Footer";
import Header from "./Header";

export default function Contact() {
  return (
    <>
    <Header/>
        {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('image/img4.jpeg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Contact</h1>
          <p className="text-white text-xl max-w-3xl">
            Simplifiez vous la vie: Tous vos services en un click
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prendre contact</h2>
            <p className="text-gray-600">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
              literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
              Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
              source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes
              of Good and Evil) by Cicero, written in 45 BC.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Combined Contact Container */}
          <div
            className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg"
            style={{ minHeight: "600px" }}
          >
            {/* Left Column - Contact Info */}
            <div className="w-full md:w-1/2 p-12 space-y-8">
              <h2 className="text-3xl font-semibold text-[#4052B4]">Prenons contact avec nous</h2>

              {/* Email */}
              <div className="flex items-center space-x-6">
                <div className="text-[#4052B4]">
                  <i className="far fa-envelope text-3xl"></i>
                </div>
                <p className="text-gray-600 text-lg">contact@koulshinet.com</p>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-6">
                <div className="text-[#4052B4]">
                  <i className="fas fa-phone-alt text-3xl"></i>
                </div>
                <p className="text-gray-600 text-lg">06.63.99.44.09</p>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-6">
                <div className="text-[#4052B4]">
                  <i className="fas fa-map-marker-alt text-3xl"></i>
                </div>
                <p className="text-gray-600 text-lg">
                  123 rue Bahr Kazwine N 8 Harhoura,
                  <br />
                  Temara, Maroc
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-gray-600 text-lg mb-4">Contactez nous :</p>
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
              <h2 className="text-3xl font-semibold text-white mb-6">Contactez nous</h2>
              <form className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Votre nom complet"
                    className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Sujet"
                    className="w-full px-6 py-4 rounded-full bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none text-lg"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <textarea
                    placeholder="Votre message"
                    className="w-full px-6 py-4 rounded-3xl bg-[#5468C4] text-white placeholder-gray-300 focus:outline-none resize-none text-lg"
                    style={{ minHeight: "150px" }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-white text-[#4052B4] rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
                  >
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
