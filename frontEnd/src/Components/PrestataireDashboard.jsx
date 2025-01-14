// import React from 'react'

// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";
import img3 from "./image/img3.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
export default function PrestataireDashboard() {
    const [prestataire,setprestataire]=useState([])
    const [doc,setDoc]=useState([])
    const [dispo,setDispo]=useState([])
    const [service,setService]=useState()
    const [isAproved,setIseAproved]=useState(false)
    const navigate=useNavigate();
    const token=localStorage.getItem("token")?localStorage.getItem("token"):"";

    const { t } = useTranslation();

    if (!token) {
         navigate("login");
        return
     }
     const checkIfPrestataireExistsAndAproved=async()=>{
         try {
             const response = await axios.post(
               'http://127.0.0.1:8000/api/checkIfPrestataireExists',
               {},
               {
                 headers: {
                   Authorization: `Bearer ${token}`,
                 },
               }
             );

              if (response.data.approved) {
                  setprestataire(response.data.Prestataire)
                  setIseAproved(true);
                  setDoc(response.data.documents);
                  setService(response.data.service);
                  setDispo(response.data.dispo);
              }else{
                   setIseAproved(false);
              }
           }catch (error) {
              console.error('Error:', error);

            //   window.location="http://localhost:3000/login"
           }

     };

    useEffect(()=>{checkIfPrestataireExistsAndAproved()},[])

    // console.log(dispo);


    return (
        <>
        {isAproved?
      (  <div className="bg-gray-100 font-sans">
           <HeaderPres/>

            {/* Main Content */}
            <div className="flex min-h-screen">
        <SideBarPres />
        <div className="flex-1 p-8">
          {/* Account Status */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <i className="fas fa-user-circle text-[#4a69bd]"></i>
                <span className="text-[#4a69bd] font-medium">
                  {t("presDash.accountStatus")}:
                </span>
                <span className="bg-green-200 text-green-600 px-2 py-1 rounded text-sm">
                  {t("presDash.confirmed")}
                </span>
              </div>
            </div>
          </div>

          {/* General Information Section */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-2">
                <i className="fas fa-user-circle text-[#4a69bd]"></i>
                <span className="text-[#4a69bd] font-medium text-lg">
                  {t("presDash.generalInfo")}:
                </span>
              </div>
              <Link
                state={{ id: prestataire.id }}
                to={{
                  pathname: "/PrestataireDashboard/modifyPrestataire",
                }}
                className="bg-[#4a69bd] text-white px-4 py-2 rounded-lg hover:bg-[#3d5aa7]"
              >
                {t("presDash.edit")}
              </Link>
            </div>

            <div className="flex gap-16 px-4">
              {/* Profile Image */}
              <div className="w-[440px] h-[332px] pb-32">
                <img
                  src={`http://127.0.0.1:8000/profile_photos_perstataire/${doc && doc[0].photo}`}
                  alt="Profile"
                  className="w-80 h-80 rounded-full object-cover"
                />
              </div>

              {/* Information List */}
              <div className="flex-1 pt-4">
                <div className="space-y-6">
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.name")}:</span>
                    <span>{prestataire.nom}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.surname")}:</span>
                    <span>{prestataire.prenom}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.email")}:</span>
                    <span>{prestataire.email}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.phone")}:</span>
                    <span>{prestataire.telephone}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.city")}:</span>
                    <span>{prestataire.ville}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.district")}:</span>
                    <span>{prestataire.aroundissment}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.service")}:</span>
                    <span>{service.serviceName}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.experienceYears")}:</span>
                    <span className="ml-5">{prestataire.annees_experience}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-700">{t("presDash.status")}:</span>
                    <span>{prestataire.statut}</span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600 w-32">{t("presDash.availability")}:</p>
                    <p className="font-medium">
                      {Object.entries(
                        dispo.reduce((acc, item) => {
                          acc[item.jour] = acc[item.jour] || [];
                          acc[item.jour].push(
                            `Début: ${item.debut} | Fin: ${item.fin}`
                          );
                          return acc;
                        }, {})
                      ).map(([jour, times], index) => (
                        <div key={index} className="mb-2">
                          <p className="font-medium">
                            {jour} | {times.join(" • ")}
                          </p>
                        </div>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-[#4a69bd]"></i>
                <span className="text-[#4a69bd] font-medium">{t("presDash.description")}:</span>
              </div>
            </div>
            <p id="descriptionDisplay" className="text-gray-600">
              {prestataire.description_service}
            </p>
          </div>
        </div>
      </div>
        </div> ):(

<div className="bg-gray-100 h-screen flex justify-center items-center">

<div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-700">Vérification de l'Email en Attente</h2>
        <p className="text-gray-600 mt-4">Votre compte est en attente d'approbation. Veuillez vérifier votre email pour la validation.</p>
        <p className="text-sm text-gray-400 mt-2">Si vous n'avez pas reçu l'email, vérifiez votre dossier spam.</p>
</div>

</div>)
        }
        </>
    )
}
