// import React from 'react'

import SIdeBar from "./SIdeBar";
import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";

export default function DemandeDetails() {

  const [prestataire,setPrestataire]=useState([]);
  const [document,setDocument]=useState([])
  const location = useLocation();
  const [diplomes,setDeplomes]=useState([]);
  const [dispo,setDispo]=useState([]);
  const { id } = location.state || {}
  useEffect(()=>{
    axios.get("https://back.koulchinet.com/api/getPrestataireById/"+id)
    .then(res=>{
      setPrestataire(res.data.prestataire)
      setDocument(res.data.prestataire.documents[0])
      setDeplomes(res.data.prestataire.documents[0].diplome_sertificat.split("#//#"));
      setDispo(res.data.prestataire.disponibility);
    })
    .catch(err=>console.log(err))
  },[])
  const approvePrestataire = () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir approuver ce prestataire ?");
    if (isConfirmed) {
      axios.post(`https://back.koulchinet.com/api/activePrestataire/${id}`)
      .then(res=>{

        alert(res.data.message)
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
    }

  }

  console.log(dispo);




  const deletePrestataire=()=>{
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce prestataire ?");
    if (isConfirmed) {
     axios.delete("https://back.koulchinet.com/api/deleteprestataire/"+id)
     .then(res=>alert(res.data.message))
     .catch(err=>console.log(err))
    // window.location.reload();
     }
  }
  return (
    <div className="bg-gray-100 flex min-h-screen">
  <SIdeBar />

  {/* Main Content */}
  <div className="flex-1 p-8">
    {/* Profile Section */}
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Account details:</h2>

      <div className="flex items-start space-x-8">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-pink-200 flex-shrink-0">
          <img
            src={`https://back.koulchinet.com/profile_photos_perstataire/${document && document.photo}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="flex-1">
          <div className="space-y-4">
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Nom:</p>
              <p className="font-medium">{prestataire.nom}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Prenom:</p>
              <p className="font-medium">{prestataire.prenom}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Email:</p>
              <p className="font-medium">{prestataire.email}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Téléphone:</p>
              <p className="font-medium">{prestataire.telephone}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Ville:</p>
              <p className="font-medium">{prestataire.ville}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Quartier:</p>
              <p className="font-medium">{prestataire.aroundissment}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Service:</p>
              <p className="font-medium">{prestataire.service?.serviceName}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Années d'expérience :</p>
              <p className="font-medium">{prestataire.annees_experience}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Statut :</p>
              <p className="font-medium">{prestataire.statut}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 w-32">Disponibilité :</p>
              <p className="font-medium">{Object.entries(
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
                ))}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={deletePrestataire}
                className="px-6 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={approvePrestataire}
                className="px-6 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
              >
                Activer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Files Section */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-[#4a69bd] text-lg font-medium mb-4">Fichier telecharge:</h3>
      <div className="grid grid-cols-2 gap-6">
        {diplomes &&
          diplomes.map((src, index) => (
            <div key={index}>
              <iframe
                src={`https://back.koulchinet.com/diplomes/${src}`}
                title="PDF Viewer"
                width={421}
                height={400}
                style={{ border: "none" }}
              />
            </div>
          ))}
      </div>
    </div>
  </div>
</div>

  )
}
