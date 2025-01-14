// import React from 'react'

import axios from "axios";
import SIdeBar from "./SIdeBar";
// import SideBarPres from "./SideBarPres";
import img3 from "./image/img3.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function ClientDetails() {
  const location = useLocation();
  const { id } = location.state || {}
  const [cleint,setClient]=useState([]);
  const deleteClient=()=>{
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
    if (isConfirmed) {
        axios.delete("http://127.0.0.1:8000/api/deleteclient/"+id)
        .then(res=>{
          
          alert(res.data.message)
          window.location.reload();
        })
        .catch(err=>console.log(err))
        
    }
  }
 
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/getclientbyid/"+id)
    .then(res=>setClient(res.data.client))
    .catch(err=>console.log(err))
  },[])
 
  return (
    <div className="bg-gray-100 flex min-h-screen">
    <SIdeBar/>
    {/* Main Content */}
    <div className="flex-1 p-8 flex justify-center">
      <div className="max-w-5xl w-full mt-32">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Account details:</h2>

          <div className="flex items-start space-x-8">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden bg-blue-200 flex-shrink-0">
              <img src={`http://127.0.0.1:8000/profile_photos_Client/${cleint.photo_profel}`}  alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Nom:</p>
                  <p className="font-medium">{cleint&&cleint.nom}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Prenom:</p>
                  <p className="font-medium">{cleint&&cleint.prenom}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Email:</p>
                  <p className="font-medium">{cleint&&cleint.email}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Téléphone:</p>
                  <p className="font-medium">{cleint&&cleint.telephone}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Ville:</p>
                  <p className="font-medium">{cleint&&cleint.ville}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 w-32">Quartier:</p>
                  <p className="font-medium">{cleint&&cleint.aroundissment}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button onClick={deleteClient} className="px-6 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
