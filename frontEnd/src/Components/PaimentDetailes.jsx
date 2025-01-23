import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SIdeBar from './SIdeBar';
import { useLocation, useParams } from 'react-router-dom';

export default function PaimentDetailes() {
    const [prestataire,setPrestataire]=useState([]);
    const [document,setDocument]=useState([])
    const [service,setService]=useState()
    // const location = useLocation();
    const [diplomes,setDeplomes]=useState([]);
    // const { id } = location.state || {}
    const {id} = useParams();
    useEffect(()=>{
        axios.get("https://back.koulchinet.com/api/getPaiment/"+id)
      .then(res=>{
        setPrestataire(res.data.demande[0]);
        setDocument(res.data.prestataireDoc[0]);
        setService(res.data.service);
        // console.log(res.data);

      })
      .catch(err=>console.log(err))
    },[])

    console.log(prestataire.NbrOffres);
    // console.log(document);

    const ApprouverAdmin=()=>{
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir accepter l'offre ce prestataire ?");
      const formData = new FormData();
      formData.append('idPres',prestataire.prestataire.id);
      formData.append('NbrOffres',prestataire.NbrOffres);
      if (isConfirmed) {
       axios.post("https://back.koulchinet.com/api/ApproverPrestataire",formData)
       .then(res=>{
        alert(res.data.message)
        window.history.back();
    })
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
              <img src={`https://back.koulchinet.com/profile_photos_perstataire/${document && document.photo}`} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="space-y-4">
                {[
                 { label: "Nom", value: prestataire && prestataire.prestataire ? prestataire.prestataire.nom : 'loading...'},
                 { label: "Prenom", value: prestataire && prestataire.prestataire ? prestataire.prestataire.prenom : 'loading...'},
                 { label: "Email", value: prestataire && prestataire.prestataire ? prestataire.prestataire.email : 'loading...'},
                 { label: "Téléphone", value: prestataire && prestataire.prestataire ? prestataire.prestataire.telephone : 'loading...'},
                 { label: "service demander", value: prestataire && prestataire.NomOffre ? prestataire.NomOffre : 'loading...'},
                 { label: "prix", value: prestataire && prestataire.prix ? prestataire.prix+" MAD" : 'loading...'},

                //  { label: "Ville", value: prestataire && prestataire.prestataire ? prestataire.prestataire.ville : 'loading...'},
                //  { label: "Quartier", value : prestataire && prestataire.prestataire ? prestataire.prestataire.aroundissment : 'loading...'},
                //  { label: "Service", value: service},
                //  { label: "Années d'expérience ", value: prestataire && prestataire.prestataire ? prestataire.prestataire.annees_experience : 'loading...'},
                //  { label: "Statut", value: prestataire && prestataire.prestataire ? prestataire.prestataire.statut : 'loading...'},
                //  { label: "Disponibilite", value: prestataire && prestataire.prestataire ? prestataire.prestataire.disponibilite : 'loading...'}

                ].map((item, index) => (
                  <div className="flex items-center space-x-10" key={index}>
                    <p className="text-gray-600 w-32">{item.label}:</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <button className="px-6 py-2 bg-blue-700 text-white rounded-full text-sm hover:bg-blue-600 transition-colors" onClick={ApprouverAdmin}>
                Approuver
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-[#4a69bd] text-lg font-medium mb-4">Reçu :</h3>
   <div className="grid grid-cols-2 gap-6">


        <div >
            <iframe
              src={`https://back.koulchinet.com/`+prestataire.recipteImage}
              title="PDF Viewer"
             width={421}
             height={400}

              style={{ border: "none"}}
            />
          </div>

  </div>

          </div>
      </div>
    </div>
    )
}
