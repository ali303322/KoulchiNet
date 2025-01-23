// import React from 'react'

import SIdeBar from "./SIdeBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function PresDetails() {

  const [prestataire,setPrestataire]=useState([]);
  const [document,setDocument]=useState([])
  const [service,setService]=useState();
  const [dispo,setDispo]=useState([]);
  const location = useLocation();
  const [diplomes,setDeplomes]=useState([]);
  const { id } = location.state || {}
  useEffect(()=>{
    axios.get("https://back.koulchinet.com/api/getPrestataireById/"+id)
    .then(res=>{
      setPrestataire(res.data.prestataire);
      setService(res.data.prestataire.service.serviceName);
      setDocument(res.data.prestataire.documents[0])
      setDeplomes(res.data.prestataire.documents[0].diplome_sertificat.split("#//#"));
      setDispo(res.data.prestataire.disponibility);

    })
    .catch(err=>console.log(err))
  },[])

  const deletePrestataire=()=>{
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce prestataire ?");
    if (isConfirmed) {
     axios.delete("https://back.koulchinet.com/api/deleteprestataire/"+id)
     .then(res=>alert(res.data.message))
     .catch(err=>console.log(err))
     //window.location.reload();
     }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <SIdeBar />

    {/* Main Content */}
    <div className="flex-1 p-8">

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Account details:</h2>

        <div className="flex items-start space-x-8">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-pink-200 flex-shrink-0">
            <img src={`https://back.koulchinet.com/profile_photos_perstataire/${document&&document.photo}`} alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* User Details */}
          <div className="flex-1">
            <div className="space-y-4">
              {[
                { label: "Nom", value: prestataire.nom },
                { label: "Prenom", value: prestataire.prenom },
                { label: "Email", value: prestataire.email },
                { label: "Téléphone", value: prestataire.telephone },
                { label: "Ville", value: prestataire.ville},
                { label: "Quartier", value:prestataire.aroundissment },
                { label: "Service", value: service},
                { label: "Années d'expérience ", value: prestataire.annees_experience },
                { label: "Statut", value: prestataire.statut },
                // { label: "Disponibilite", value: prestataire.disponibilite },

              ].map((item, index) => (
                <div className="flex items-center" key={index}>
                  <p className="text-gray-600 w-32">{item.label}:</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
              <div>
              <p className="text-gray-600 w-32">Disponibilité :</p>
                {Object.entries(
                    dispo.reduce((acc, item) => {
                    acc[item.jour] = acc[item.jour] || [];
                    acc[item.jour].push(`Début: ${item.debut} | Fin: ${item.fin}`);
                    return acc;
                    }, {})
                ).map(([jour, times], index) => (
                    <div key={index} className="mb-2">
                    <p className="font-medium">
                        {jour} | {times.join(" • ")}
                    </p>
                    </div>
                ))}
                </div>


            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors" onClick={deletePrestataire}>
                Supprimer
              </button>
              {/* <button className="px-6 py-2 bg-blue-700 text-white rounded-full text-sm hover:bg-blue-600 transition-colors">
              améliorer
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[#4a69bd] text-lg font-medium mb-4">Fichier telecharge:</h3>
 <div className="grid grid-cols-2 gap-6">
  {diplomes &&diplomes.map((src, index) => {

        return<div key={index}>
          <iframe
            src={`https://back.koulchinet.com/diplomes/`+src}
            title="PDF Viewer"
           width={421}
           height={400}

            style={{ border: "none"}}
          />
        </div>
})}

        </div>
    </div>
  </div>
  </div>
  )
}
