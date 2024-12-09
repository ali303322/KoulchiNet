// import React from 'react'

import Footer from "./Footer";
import Header from "./Header";
import img4 from "./image/img4.jpeg";
import img2 from "./image/img2.jpeg";
import img3 from "./image/img3.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
export default function ServicePlambier() {

    // const [issue,setIssue] = useState([]) ;
    const [selectedUrgency, setSelectedUrgency] = useState(null);
    const [files, setFiles] = useState([]);
    const [sousServices, setSousServices] = useState([]);
    const [formSousService, setFormSousService] = useState(); // get sousService from the dropdown
    const [Descriptionprob, setDescriptionprob] = useState(); // get problem description from the input form
    const [date, setDate] = useState(); // get date from the input form
    const [hour, sethour] = useState(); // get hour from the input form
    const today = new Date().toISOString().split('T')[0];
    const navigate =  useNavigate();

    const dataLocation = useLocation();
    let data = dataLocation.state ;


    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/services/'+data.service,
            headers: { }
          };

          axios.request(config)
          .then((response) => {
            setSousServices(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

    },[])


    const handleUrgencyClick = (urgency) => {
      setSelectedUrgency(urgency);
    };

    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);
      setFiles([...files, ...uploadedFiles]);
    };

    const triggerFileInput = () => {
      // Simulate a click on the hidden file input
      fileInputRef.current.click();
    };

    // const handleFileUpload = (event) => {
    //   const uploadedFiles = Array.from(event.target.files);
    //   setFiles([...files, ...uploadedFiles]);
    // };

    // const handleFileRemove = (index) => {
    //   setFiles(files.filter((_, i) => i !== index));
    // };



    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedUrgency) {
        alert("Veuillez sélectionner un niveau d'urgence");
        return;
      }
      navigate('/FindPrestataire' , {state: {data : data , SousService : formSousService , descriptioProb : Descriptionprob , date : date , hour : hour , files : files}})
    //   alert('Votre demande a été envoyée avec succès !');
    };


  return (
    <>
    <Header/>
    {/* Hero Section */}
    <section
      className="relative h-[434px] bg-cover bg-center"
      style={{ backgroundImage: `url(${img4})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Hero Text */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <h1 className="text-white text-6xl font-bold mb-4">services {data.service}</h1>
          <p className="text-white text-3xl">
            Une large gamme de services professionnels à votre disposition
          </p>
          <br />
          <br />
          <a
            href="#"
            className="bg-[#ed8936] hover:bg-[#f6ad55] text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
            Réservez votre service
            </a>
        </div>
      </div>
    </section>

    {/* Spacer for search box overlap */}
    <div className="h-32"></div>

    {/* Section Title and Description */}
    <div className="max-w-7xl mx-auto px-8 mb-">
      <p className="text-gray-600">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making
        it over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going
        through the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
        1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and
        Evil) by Cicero, written in 45 BC.
      </p>
    </div>

    {/* Avantages Section */}
    <div className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-16">Avantages</h2>
          <div className="flex gap-8">
            <div className="w-[300px]">
              <img
                src={img2}
                alt="Plumber Service"
                className="rounded-lg w-full h-[200px] object-cover object-center"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-[#4052B4]"></i>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-[#4052B4]"></i>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-[#4052B4]"></i>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-[#4052B4]"></i>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-[#4052B4]"></i>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-[#4052B4]"></i>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[80%] mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 items-start">
            {/* FAQ Content */}
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#4A69BD] mb-16">
                Questions fréquemment posées (FAQs)
              </h2>

              <div className="space-y-6">
                <div className="pb-6">
                  <button className="flex justify-between items-center w-full text-left">
                    <span className="font-bold text-gray-800 pr-4">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry?
                    </span>
                    <div className="bg-[#4052B4] rounded-full p-1 min-w-[28px] min-h-[28px] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      There are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour or
                      randomised words which don &rsquo;t look even slightly believable.
                    </p>
                  </div>
                </div>

                <div className="pb-4">
                  <button className="flex justify-between items-center w-full text-left">
                    <span className="font-bold text-gray-800 pr-4">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry?
                    </span>
                    <div className="bg-[#4052B4] rounded-full p-1 min-w-[28px] min-h-[28px] flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      There are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour or
                      randomised words which don &rsquo;t look even slightly believable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Image */}
            <div className="flex items-start justify-end">
              <img
                src={img2}
                alt="FAQ illustration"
                className="rounded-lg shadow-lg w-2/3 h-auto ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-32">
        <div className="max-w-[75%] mx-auto">
          <div className="relative flex items-center justify-center min-h-[200px]">
            {/* Previous Button */}
            <button className="absolute left-0 p-3 rounded-full bg-[#4052B4] text-white hover:bg-[#324092] transition-colors">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Testimonial Content */}
            <div className="text-center max-w-3xl px-4">
              <div>
                <img
                  src={img3}
                  alt="Anouar.A"
                  className="w-24 h-24 mx-auto"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#4052B4] mb-2">
                Anouar.A
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed font-light italic">
                Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old.
              </p>
            </div>

            {/* Next Button */}
            <button className="absolute right-0 p-3 rounded-full bg-[#4052B4] text-white hover:bg-[#324092] transition-colors">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* form section */}
    <section className="bg-white-100 py-32">
                    <div className="bg-white-100 min-h-screen flex flex-col items-center py-8">

        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6">
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-blue-800 mb-4 border-b-2 border-orange-400 pb-2">
            Détails de votre demande
            </h2>

            <div className="mb-4">
            <label className="block text-blue-800 font-bold mb-2">
                Catégorie de service *
            </label>
            <select
                required
                className="w-full border border-gray-300 rounded p-2"
                onChange={(e)=>setFormSousService(e.target.value)}
            >
                <option value="">Sélectionnez une catégorie</option>
                {sousServices.length > 0 ? (
                    sousServices.map((element, index) => (
                    <option key={index} value={element.sousService}>
                        {element.sousService}
                    </option>
                    ))
                ) : (
                    <option disabled>No services available</option>
                )}

            </select>
            </div>

            <h3 className="text-lg font-bold text-blue-800 mb-4">Niveau d&rsquo;urgence</h3>
            <div className="flex space-x-4 mb-6">
            {['Normal', 'Urgent', 'Immédiat'].map((urgency, index) => (
                <div
                key={index}
                className={`flex-1 text-center border rounded-lg p-4 cursor-pointer transition ${
                    selectedUrgency === urgency
                    ? 'border-blue-800 bg-blue-100'
                    : 'border-gray-300'
                }`}
                onClick={() => handleUrgencyClick(urgency)}
                >
                <i
                    className={`fas ${
                    urgency === 'Normal'
                        ? 'fa-clock'
                        : urgency === 'Urgent'
                        ? 'fa-running'
                        : 'fa-exclamation-circle'
                    } text-blue-800 text-2xl mb-2`}
                ></i>
                <div>{urgency}</div>
                <small className="text-gray-500">
                    {urgency === 'Normal'
                    ? 'Sous 48h'
                    : urgency === 'Urgent'
                    ? 'Sous 24h'
                    : 'Dans les 2h'}
                </small>
                </div>
            ))}
            </div>

            <div className="mb-4">
            <label className="block text-blue-800 font-bold mb-2">
                Description détaillée du besoin *
            </label>
            <textarea
                required
                placeholder="Décrivez votre besoin en détail..."
                className="w-full border border-gray-300 rounded p-2"
                onChange={(e)=>setDescriptionprob(e.target.value)}
            ></textarea>
            </div>

            <div className="mb-4">
            <label className="block text-blue-800 font-bold mb-2">
                Date souhaitée *
            </label>
            <input
                type="date"
                required
                min={today}
                onChange={(e)=>setDate(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
            />
            </div>

            <div className="mb-4">
            <label className="block text-blue-800 font-bold mb-2">
                Heure souhaitée *
            </label>
            <input
                type="time"
                required
                onChange={(e)=>sethour(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
            />
            </div>

            <div
      className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center mb-4 cursor-pointer"
      onClick={triggerFileInput} // Trigger file input click
      onDrop={(e) => {
        e.preventDefault();
        handleFileUpload({ target: { files: e.dataTransfer.files } });
      }}
      onDragOver={(e) => e.preventDefault()} // Allow drag events
    >
      <i className="fas fa-cloud-upload-alt text-blue-800 text-2xl mb-2"></i>
      <p>Glissez vos fichiers ici ou cliquez pour sélectionner</p>
      <small>(Photos, documents, plans...)</small>

      {/* Hidden file input */}
      <input
        type="file"
        multiple
        ref={fileInputRef} // Reference to the file input
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
            {/* <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center mb-4">
            <i className="fas fa-cloud-upload-alt text-blue-800 text-2xl mb-2"></i>
            <p>Glissez vos fichiers ici ou cliquez pour sélectionner</p>
            <small>(Photos, documents, plans...)</small>
            <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
            />
            </div>

            <div className="space-y-2">
            {files.map((file, index) => (
                <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 p-2 rounded"
                >
                <i className="fas fa-file text-blue-800"></i>
                <span>{file.name}</span>
                <i
                    className="fas fa-times text-red-500 cursor-pointer"
                    onClick={() => handleFileRemove(index)}
                ></i>
                </div>
            ))}
            </div> */}

            <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded mt-6 hover:bg-blue-700"
            >
            Envoyer la demande
            </button>
        </form>
        </div>
        </div>
            </section>
      {/* Footer Spacer */}
      <Footer/>
    </>
  )
}
