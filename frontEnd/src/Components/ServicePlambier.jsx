// import React from 'react'

import Footer from "./Footer";
import Header from "./Header";
import img4 from "./image/ServicesPlomberie.webp";
import img2 from "./image/img2.jpeg";
import img3 from "./image/img3.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import HeaderPres from "./HeaderPres";
import HeaderClient from "./HeaderClient";
import DashboardHeader from "./DashboardHeader";
export default function ServicePlambier() {

    // const [issue,setIssue] = useState([]) ;
    const [dataContent,setDataContent] = useState({
        serviceContent: [],
        aventages: [],
        FAQ: [],
        sousServices: [],
      });
      const [Rev, setRev] = useState([]);
      const [testimonials, setTestimonials] = useState([])
    const [selectedUrgency, setSelectedUrgency] = useState(null);
    const [files, setFiles] = useState([]);
    const [sousServices, setSousServices] = useState([]);
    const [formSousService, setFormSousService] = useState(); // get sousService from the dropdown
    const [Descriptionprob, setDescriptionprob] = useState(); // get problem description from the input form
    const [date, setDate] = useState(); // get date from the input form
    const [hour, sethour] = useState(); // get hour from the input form
    const [Ville, setVille] = useState();
    const [Villes, setVilles] = useState([]);
    const [arroundisment, setArroundisment] = useState();
    const [arroundisments, setArroundisments] = useState([]);
    const [services, setservices] = useState([]);
    const [serviceInp, setserviceInp] = useState();
    // const [isLoading, setIsLoading] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [users,setUsers] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const navigate =  useNavigate();
const fileInputRef = useRef(null);
    const dataLocation = useLocation();
    let data = dataLocation.state ;
    useEffect(() => {
        if(data){
            if (data.ville && data.dist && data.service) {
                setVille(data.ville);
                setArroundisment(data.dist);
                setserviceInp(data.service);
            }
        }

    }, []);




    const {service} = useParams();


    useEffect(() => {
        if (service) {
            let config = {
                method: 'get',
                url: 'http://localhost:8000/api/service-content/' + service,
            };

            axios.request(config)
                .then((response) => {
                    setDataContent(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [service]);

    console.log(dataContent);


        // fetching for citys
        useEffect(() => {
            const fetchVilles = async () => {
                try {
                    const result = await axios.get('http://127.0.0.1:8000/api/villes');
                    setVilles(result.data);
                } catch (error) {
                    console.log(error.response?.data || error.message);
                }
            };

            fetchVilles();
        }, []);



        // get the disticts of selectionded city and store it into the districts variable
        useEffect(()=>{
                let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://127.0.0.1:8000/api/Districts/${Ville}`,
                  headers: {},
                };

                axios.request(config)
                  .then((response) => {
                    setArroundisments(response.data);

                  })
                  .catch((error) => {
                    console.log(error);
                  });
        }, [Ville]);



        // fetching for all services
        useEffect(() => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/services',
                headers: { }
              };

              axios.request(config)
              .then((response) => {
                setservices(response.data)
              })
              .catch((error) => {
                console.log(error);
              });
        }, []);

    // console.log(dataContent);



    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/services/'+service,
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

    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);

        // Calculate the total size of new files
        const newFilesSize = uploadedFiles.reduce((total, file) => total + file.size, 0);

        // Calculate the total size of already uploaded files from session storage
        const existingFilesBase64 = JSON.parse(sessionStorage.getItem("uploadedFiles")) || [];
        const existingFilesSize = existingFilesBase64.length * 10 * 1024; // Approximation of base64 file size in bytes

        const totalSize = newFilesSize + existingFilesSize;

        // Check if the total size exceeds 60 MB
        const MAX_SIZE_MB = 60;
        if (totalSize > MAX_SIZE_MB * 1024 * 1024) {
            alert("The total size of uploaded files exceeds 60 MB.");
            return; // Stop further execution
        }

        // Convert files to base64 and store in session storage
        uploadedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                const existingFiles = JSON.parse(sessionStorage.getItem("uploadedFiles")) || [];
                sessionStorage.removeItem("uploadedFiles");
                sessionStorage.setItem("uploadedFiles", JSON.stringify([...existingFiles, base64]));
            };
            reader.readAsDataURL(file); // Convert file to base64
        });

        // Update the state
        setFiles([...files, ...uploadedFiles]);
    };


    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // const handleFileUpload = (event) => {
    //   const uploadedFiles = Array.from(event.target.files);
    //   setFiles([...files, ...uploadedFiles]);
    // };

    // const handleFileRemove = (index) => {
    //   setFiles(files.filter((_, i) => i !== index));
    // };

    const fetchPrestataireReviews = async (serviceName) => {
        try {
          const response = await axios.get(
            `/api/prestataire/reviews/service/${serviceName}`
          );
          setRev(response.data.prestataires || []);
        } catch (err) {
          console.error(err.response ? err.response.data.message : "An error occurred");
        }
      };

// console.log(Rev);


useEffect(() => {
    if (Rev.length > 0) {
      const getRandomReviews = () => {
        const allReviews = Rev.flatMap((review) =>
          review?.reviews?.map((el) => el?.commentaire) || []
        );

        // Shuffle and pick 3 random reviews
        const randomReviews = allReviews
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, 3); // Take the first 3 reviews

        setTestimonials(randomReviews); // Store 3 random reviews in the testimonials state
      };

      getRandomReviews();
    }
  }, [Rev]);



      console.log(testimonials);

      // Change to the next slide
      const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) =>
          testimonials?.length > 0 ? (prevSlide + 1) % testimonials.length : 0
        );
      }, [testimonials]);

      const prevSlide = useCallback(() => {
        setCurrentSlide((prevSlide) =>
          testimonials?.length > 0
            ? (prevSlide - 1 + testimonials.length) % testimonials.length
            : 0
        );
      }, [testimonials]);



      // Auto-slide functionality
      useEffect(() => {
        if (isAutoPlaying && Rev.length > 0) {
          const interval = setInterval(nextSlide, 5000);
          return () => clearInterval(interval);
        }
      }, [isAutoPlaying, nextSlide, Rev?.length]);

      // Fetch testimonials on mount or service change
      useEffect(() => {
        fetchPrestataireReviews(service);
      }, [service]);

    //   console.log(dataContent);


    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/prestataires',
            headers: { }
          };

          axios.request(config)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

    },[]);

// console.log(users);


    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedUrgency) {
        alert("Veuillez sélectionner un niveau d'urgence");
        return;
      }
      if(data){
        let formData = [{data : data ,service : serviceInp, SousService : formSousService , descriptioProb : Descriptionprob ,niveauDurgence : selectedUrgency, date : date , hour : hour , files : files , ville : Ville,dist: arroundisment}];
        sessionStorage.setItem('formData',JSON.stringify(formData));
        navigate('/FindPrestataire');
      }else{
        const formData = [{ service : serviceInp, SousService : formSousService , descriptioProb : Descriptionprob , date : date , hour : hour , niveauDurgence : selectedUrgency , dist: arroundisment , ville : Ville }];
        sessionStorage.setItem('formData',JSON.stringify(formData));
        navigate('/FindPrestataire');
      }


    };
    const shuffleArray = (array, count) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // Return only the first `count` items
        return shuffled.slice(0, count);
      };

      useEffect(() => {
        if (testimonials.length > 0) {
          // Set 3 random testimonials
          setTestimonials((prev) => shuffleArray(prev, 3));
        }
      }, [testimonials.length]);

      const randomSlide = useCallback(() => {
        // Ensure it picks a random index from the new 3 testimonials
        setCurrentSlide(Math.floor(Math.random() * 3));
      }, []);



    if (!dataContent?.serviceContent) {
        return <p>Loading...</p>;
      }



      console.log(
        dataContent?.serviceContent?.[0]?.imageHeader
          ? `http://127.0.0.1:8000/${encodeURIComponent(dataContent.serviceContent[0].imageHeader)}`
          : "/path/to/default-image.jpg"
      );

      const auth = localStorage.getItem('role');


  return (
    <>

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
    <section
  className="relative h-[434px] bg-cover bg-center"
  style={{
    backgroundImage: `url('http://127.0.0.1:8000/${encodeURIComponent(
      dataContent?.serviceContent?.[0]?.imageHeader || ""
    )}')`,
  }}
>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Hero Text */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <h1 className="text-white text-6xl font-bold mb-4"> Services {service}</h1>
          <p className="text-white text-3xl">
          {dataContent?.serviceContent?.[0]?.slogan || "."}
          </p>
          <br />
          <br />
          <a
            href="#"
            className="bg-[#ed8936] hover:bg-[#f6ad55] text-white px-8 py-3 rounded-full transition-colors duration-300"
            onClick={(e) => {
                e.preventDefault(); // Empêche le comportement par défaut du lien
                const section = document.getElementById("form-section");
                section?.scrollIntoView({ behavior: "smooth" }); // Défile vers la section
              }}
            >
            Réservez maintenant
            </a>
        </div>
      </div>
    </section>

    {/* Spacer for search box overlap */}
    <div className="h-32"></div>


    <div className="max-w-7xl mx-auto px-8 mb- ">
  <h2 className="text-2xl font-bold text-gray-800 mb-10">Introduction</h2>
  <p className="text-gray-600">
    {dataContent?.serviceContent?.[0]?.introduction || "Introduction non disponible."}
  </p>
</div>
<br />
{/* Section Title and Description */}
<div className="max-w-7xl mx-auto px-8 mb-">
  <h2 className="text-2xl font-bold text-gray-800 mb-10">Description</h2>
  <p className="text-gray-600">
    {dataContent?.serviceContent?.[0]?.description || "Description non disponible."}
  </p>
</div>

    {/* Avantages Section */}
    <div className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-16">Avantages</h2>
          <div className="flex gap-8">
            <div className="w-[300px]">
              <img
                src={
                    dataContent?.serviceContent?.[0]?.imageaventage
                      ? `http://127.0.0.1:8000/${dataContent.serviceContent[0].imageHeader}`
                      : "." // Fallback if no imageHeader
                  }
                alt="Plumber Service"
                className="rounded-lg w-full h-[200px] object-cover object-center"
              />
            </div>
            <div className="flex-1 space-y-4">
            {dataContent.aventages.map((av, index) => (
                <div key={index} className="flex items-center gap-2">
                    <i className="fas fa-check text-[#4052B4]"></i>
                    <p>{av.Aventage}</p>
                </div>
            ))}


            </div>
          </div>
        </div>
      </div>

    {/* Types de services */}
<div className="w-full bg-gray-100 mt-12 py-16">
    <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-16">Types de services</h2>
        <div className="flex gap-8">
            <div className="w-[300px]">
                <img
                    src={
                        dataContent?.serviceContent?.[0]?.imageTypeServices
                        ? `http://127.0.0.1:8000/${dataContent.serviceContent[0].imageTypeServices}`
                        : "." // Fallback if no imageHeader
                        }
                    alt="Plumber Service"
                    className="rounded-lg w-full h-[200px] object-cover object-center"
                />
            </div>
            <div className="flex-1 space-y-4">
                {dataContent.sousServices.map((ss, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <i className="fas fa-check text-[#4052B4]"></i>
                        <p>{ss.sousService}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>




      {/* FAQ Section */}
      <section className="py-16 bg-white">
  <div className="max-w-[80%] mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* FAQ Content (Left Side) */}
      <div className="w-full">
        <h2 className="text-3xl font-bold text-[#4A69BD] mb-16">
          Questions fréquemment posées (FAQs)
        </h2>

        <div className="space-y-6">
          {dataContent.FAQ.map((FAQ, index) => (
            <div key={index} className="pb-6">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-bold text-gray-800 pr-4">
                  {FAQ.questions}
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
                <p className="text-gray-600">{FAQ.reponse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Image (Right Side) */}
      <div className="flex items-center justify-center">
        <img
          src={
            dataContent?.serviceContent?.[0]?.imageHeader
              ? `http://127.0.0.1:8000/${dataContent.serviceContent[0].imageHeader}`
              : "." // Fallback if no imageHeader
          }
          alt="FAQ illustration"
          className="rounded-lg shadow-lg w-2/3 h-auto"
        />
      </div>
    </div>
  </div>
</section>



    {/* porqoi nos choisire */}
    <div className="w-full bg-gray-100 mt-12 py-16">
    <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-[#4A69BD] mb-16">Pourquoi nous choisir ?</h2>
        <div className="flex gap-8">
            <div className="flex-1 space-y-4">
                {dataContent.PNC?.map((ss, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <i className="fas fa-check text-[#4052B4]"></i>
                        <p>{ss.porQouiNousChoisire}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>



      {/* Testimonial Section */}
      <section className="bg-white py-32">
      <div className=" px-4 flex justify-center w-full">
              <h1 className="text-3xl font-semibold text-[#4052B4] mb-2">
              avis de nos clients
              </h1>
            </div>
  <div className="max-w-[75%] mx-auto">
    <div className="relative flex items-center justify-center min-h-[200px]">
    {testimonials.length > 0 ? (
  <div
    className="relative w-full flex items-center justify-center"
    aria-live="polite"
  >
    <button
      onClick={randomSlide}
      className="bg-blue-400 text-white p-2 rounded-full shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      aria-label="Random testimonial"
    >
      <ChevronLeftIcon className="w-6 h-6 " />
    </button>

    <blockquote
      className={`text-lg md:text-xl lg:text-2xl font-medium text-gray-900 text-center flex-grow transition-opacity duration-500`}
      aria-hidden={currentSlide !== 0}
    >
      {testimonials[currentSlide]}
    </blockquote>

    <button
      onClick={randomSlide}
      className="bg-blue-400 text-white p-2 rounded-full shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      aria-label="Random testimonial"
    >
      <ChevronRightIcon className="w-6 h-6" />
    </button>
  </div>
    ):(

        <div className="col-span-3 text-center text-gray-600">
            <p>Aucun Avis Maintenant.</p>
        </div>
    )}
</div>
</div>
{/* </section> */}


        {/* <div className="max-w-[75%] mx-auto">
          <div className="relative flex items-center justify-center min-h-[200px]"> */}
            {/* Previous Button */}
            {/* <button className="absolute left-0 p-3 rounded-full bg-[#4052B4] text-white hover:bg-[#324092] transition-colors">
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
            </button> */}

            {/* Testimonial Content */}
            {/* <div className="text-center max-w-3xl px-4">
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
            </div> */}

            {/* Next Button */}
            {/* <button className="absolute right-0 p-3 rounded-full bg-[#4052B4] text-white hover:bg-[#324092] transition-colors">
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
            </button> */}
          {/* </div>
        </div> */}
      </section>

      {/* form section */}
      <section className="bg-white-100 py-32" id="form-section">
    <div className="bg-white-100 min-h-screen flex flex-col items-center py-8">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold text-blue-800 mb-4 border-b-2 border-orange-400 pb-2">
                    Détails de votre demande
                </h2>

                <div className="mb-4">
                    {/* Select Ville */}
                    <label className="block text-blue-800 font-bold mb-2">Ville</label>
                    <select
                        required
                        className="w-full border border-gray-300 rounded p-2"
                        value={Ville}
                        onChange={(e) =>setVille(e.target.value)}
                    >
                        <option value="">Sélectionnez une ville</option>
                        {Villes.length > 0 ? (
                            Villes.map((element, index) => (
                                <option key={index} value={element.villePricipale}>
                                    {element.villePricipale}
                                </option>
                            ))
                        ) : (
                            <option disabled>No services available</option>
                        )}
                    </select>

                    {/* Select Arrondissement */}
                    <label className="block text-blue-800 font-bold mb-2 mt-4">Arrondissement</label>
                    <select
                        required
                        className="w-full border border-gray-300 rounded p-2"
                        value={arroundisment}
                        onChange={(e) => setArroundisment(e.target.value)}
                    >
                        <option value="">Sélectionnez une Arroundisment</option>
                        {arroundisments.length > 0 ? (
                            arroundisments.map((element, index) => (
                                <option key={index} value={element.Arrondissement}>
                                    {element.Arrondissement}
                                </option>
                            ))
                        ) : (
                            <option disabled>No services available</option>
                        )}
                    </select>

                    {/* Select Service */}
                    <label className="block text-blue-800 font-bold mb-2 mt-4">Service</label>
                    <select
                        required
                        className="w-full border border-gray-300 rounded p-2"
                        value={serviceInp}
                        onChange={(e) =>setserviceInp(e.target.value)}
                    >
                        <option value="">Sélectionnez une service</option>
                        {services.length > 0 ? (
                            services.map((element, index) => (
                                <option key={index} value={element.id}>
                                    {element.serviceName}
                                </option>
                            ))
                        ) : (
                            <option disabled>No services available</option>
                        )}
                    </select>

                    {/* Select Sous-Service */}
                    <label className="block text-blue-800 font-bold mb-2 mt-4">type Service</label>
                    <select
                        required
                        className="w-full border border-gray-300 rounded p-2"
                        value={formSousService}
                        onChange={(e) => setFormSousService(e.target.value)}
                    >
                        <option value="">Sélectionnez une type de service</option>
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

{/* Urgency Selection */}
<h3 className="text-lg font-bold text-blue-800 mb-4">Niveau d&rsquo;urgence</h3>
            <div className="flex space-x-4">
                {['Normal', 'Urgent', 'Immédiat'].map((urgency, index) => (
                    <div
                        key={index}
                        className={`flex-1 text-center border rounded-lg p-4 cursor-pointer transition ${
                            selectedUrgency === urgency
                                ? 'border-blue-800 bg-blue-100' // Highlight selected div
                                : 'border-gray-300'
                        }`}
                        onClick={() => handleUrgencyClick(urgency)} // Handle click event
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

            {/* Display the selected urgency */}
            <div className="mt-4">
                <p>
                    <strong>Urgence sélectionnée:</strong>{' '}
                    {selectedUrgency || 'Aucune sélection'}
                </p>
            </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label className="block text-blue-800 font-bold mb-2">
                        Description détaillée du besoin *
                    </label>
                    <textarea
                        required
                        placeholder="Décrivez votre besoin en détail..."
                        className="w-full border border-gray-300 rounded p-2"
                        onChange={(e) => setDescriptionprob(e.target.value)}
                    ></textarea>
                </div>

                {/* Date Input */}
                <div className="mb-4">
                    <label className="block text-blue-800 font-bold mb-2">Date souhaitée *</label>
                    <input
                        type="date"
                        required
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                {/* Time Input */}
                <div className="mb-4">
                    <label className="block text-blue-800 font-bold mb-2">Heure souhaitée *</label>
                    <input
                        type="time"
                        required
                        onChange={(e) => sethour(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                {/* File Upload */}
                <div
                    className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center mb-4 cursor-pointer"
                    onClick={triggerFileInput}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFileUpload({ target: { files: e.dataTransfer.files } });
                    }}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <i className="fas fa-cloud-upload-alt text-blue-800 text-2xl mb-2"></i>
                    <p>Glissez vos fichiers ici ou cliquez pour sélectionner</p>
                    <small>(Photos, documents, plans...)</small>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-800 text-white py-2 rounded mt-6 hover:bg-blue-700"
                >
                    Réservez
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
