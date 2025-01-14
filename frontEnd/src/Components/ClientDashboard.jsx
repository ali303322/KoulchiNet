// import React from 'react'

import { useEffect, useState } from "react";
import HeaderClient from "./HeaderClient";
import SideBarClient from "./SideBarClient"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ClientDashboard() {
   const [client,setClient]=useState([])
   const navigate=useNavigate();
   const token=localStorage.getItem("token")?localStorage.getItem("token"):"";

    const checkIsEmailVerfied=async()=>{
        if (!token) {
            navigate("login");
           return
        }
        try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/checkIfClientExists',
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

             if (response.data.client) {
                 setClient(response.data.client)
             }else{
                window.location="http://localhost:3000/login"
                return
             }
          }catch (error) {
             console.error('Error:', error);
             window.location="http://localhost:3000/login"
             return

          }

    }
     useEffect(()=>{checkIsEmailVerfied()},[])


     const { t } = useTranslation();


    return (
    <div className="bg-gray-100 font-sans">
        <HeaderClient/>

        {/* Main Content */}
        <div className="flex min-h-screen">
           <SideBarClient/>


            {/* Main Content Area */}
            <div className="flex-1 p-8 bg-gray-50">
      {/* Account Status */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <i className="fas fa-id-card text-[#4a69bd] mr-2"></i>
          <span className="text-[#4a69bd]">{t("clientDash.accountStatus")}:</span>
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm ml-2">
            {t("clientDash.confirmed")}
          </span>
        </div>
      </div>

      {/* General Information Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <i className="fas fa-user text-[#4a69bd] mr-2"></i>
            <span className="text-[#4a69bd]">{t("clientDash.generalInfo")}:</span>
          </div>
          <Link
            state={{ id: client.id }}
            to={{
              pathname: "/ClientDashboard/modifyClient",
            }}
            className="bg-[#4a69bd] text-white px-4 py-2 rounded-lg hover:bg-[#3d5aa7]"
          >
            {t("clientDash.modify")}
          </Link>
        </div>

        {/* Profile Content */}
        <div className="flex items-start gap-12">
          {/* Profile Image */}
          <div>
            <img
              src={`http://127.0.0.1:8000/profile_photos_Client/${client.photo_profel}`}
              alt={t("profileImage")}
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>

          {/* Information List */}
          <div className="flex-1 pt-4">
            <div className="space-y-4">
              <div className="flex">
                <span className="text-gray-600 w-24">{t("clientDash.name")}:</span>
                <span id="info-nom">{client.nom}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">{t("clientDash.firstName")}:</span>
                <span id="info-prenom">{client.prenom}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">{t("clientDash.email")}:</span>
                <span id="info-prenom">{client.email}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">{t("clientDash.phone")}:</span>
                <span id="info-prenom">{client.telephone}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">{t("clientDash.city")}:</span>
                <span id="info-ville">{client.ville}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">{t("clientDash.district")}:</span>
                <span id="info-quartier">{client.aroundissment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    </div>



    );
}

// function ModifyModal({ currentInfo, onClose, onSave }) {
//     const [formValues, setFormValues] = useState({ ...currentInfo });

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = () => {
//       onSave(formValues);
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <div className="bg-white p-6 rounded shadow w-96">
//           <h3 className="text-lg font-semibold mb-4">Modifier Profil</h3>
//           <form className="space-y-4">
//             {Object.entries(formValues).map(([key, value]) => (
//               <div key={key}>
//                 <label className="block text-gray-700 capitalize">{key}</label>
//                 <input
//                   type="text"
//                   name={key}
//                   value={value}
//                   onChange={handleChange}
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//             ))}
//           </form>
//           <div className="flex justify-end space-x-3 mt-4">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             >
//               Annuler
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Enregistrer
//             </button>
//           </div>
//         </div>
//       </div>
//     );


//     function ModifyModal({ currentInfo, onClose, onSave }) {
//         const [formValues, setFormValues] = useState({ ...currentInfo });

//         const handleChange = (e) => {
//           const { name, value } = e.target;
//           setFormValues((prev) => ({ ...prev, [name]: value }));
//         };

//         const handleSubmit = () => {
//           onSave(formValues);
//         };

//         return (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow w-96">
//               <h3 className="text-lg font-semibold mb-4">Modifier Profil</h3>
//               <form className="space-y-4">
//                 {Object.entries(formValues).map(([key, value]) => (
//                   <div key={key}>
//                     <label className="block text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       name={key}
//                       value={value}
//                       onChange={handleChange}
//                       className="w-full border rounded px-3 py-2"
//                     />
//                   </div>
//                 ))}
//               </form>
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={onClose}
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Enregistrer
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       }
//   }
