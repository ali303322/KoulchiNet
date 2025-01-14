// import React from 'react'
import Header from './Header';
import Footer from './Footer';
import img3 from './image/img3.png'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import SearchBar from './SearchBar';
// import axios from 'axios';
// import { useEffect } from 'react';

export default function Findprestataire() {
    const [prestataire,setPrestataire] = useState();
    const [prestataireByCity,setPrestataireByCity] = useState();
    const [prestataireByRegion,setPrestataireByRegion] = useState();


    let dataComes = sessionStorage.getItem('formData');
    dataComes = JSON.parse(dataComes);


useEffect(()=>{
  const fetchPrestataires = () => {
        // Données à envoyer dans le body
        const data = {
            'ville': dataComes[0].ville,
            'arroundisment': dataComes[0].dist,
            'service_id': dataComes[0].service
        };

        axios.post('http://127.0.0.1:8000/api/prestataire', data)
            .then((response) => {
                // Traitement des données des prestataires reçues
                setPrestataire(response.data);
            })
            .catch((error) => {
                // Gestion des erreurs
                console.error("Erreur lors de la récupération des prestataires :", error);
            });
    };

    // Exemple d'appel à la fonction avec des valeurs spécifiques
    fetchPrestataires();
},[]);
useEffect(()=>{
  const fetchPrestataires = () => {
        // Données à envoyer dans le body
        const data = {
            'ville': dataComes[0].ville,
            // 'arroundisment': dataComes[0].dist,
            'service_id': dataComes[0].service
        };

        axios.post('http://127.0.0.1:8000/api/prestataireByCity', data)
            .then((response) => {
                // Traitement des données des prestataires reçues
                setPrestataireByCity(response.data);
            })
            .catch((error) => {
                // Gestion des erreurs
                console.error("Erreur lors de la récupération des prestataires :", error);
            });
    };

    // Exemple d'appel à la fonction avec des valeurs spécifiques
    fetchPrestataires();
},[]);
useEffect(()=>{
  const fetchPrestataires = () => {
        // Données à envoyer dans le body
        const data = {
            'ville': dataComes[0].ville,
            // 'arroundisment': dataComes[0].dist,
            'service_id': dataComes[0].service
        };

        axios.post('http://127.0.0.1:8000/api/prestataireByRegion', data)
            .then((response) => {
                // Traitement des données des prestataires reçues
                setPrestataireByRegion(response.data);
            })
            .catch((error) => {
                // Gestion des erreurs
                console.error("Erreur lors de la récupération des prestataires :", error);
            });
    };

    // Exemple d'appel à la fonction avec des valeurs spécifiques
    fetchPrestataires();
},[]);


console.log(prestataireByCity);

  return (
    <div className='bg-gray-100 '>
    <Header />

     {/* Main Content Section */}
     <main className="bg-gray-100 py-10 mt-20">

{/* Cards Section */}
<section className="py-4">
    <div className="max-w-[1200px] mx-auto px-4">
    <div className="grid grid-cols-3 gap-4">
    {prestataire && prestataire.length > 0 ? (
        prestataire.map((pres, index) => (
            <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center justify-between h-[381px] w-[285px]"
            >
                <img
                    src={`http://127.0.0.1:8000/profile_photos_perstataire/${pres.documents[0].photo}`}
                    alt={pres.nom}
                    className="w-32 h-32 rounded-full mb-6"
                />
                <h3 className="font-medium text-xl mb-4">
                    {pres.nom} {pres.prenom}
                </h3>
                <p className="text-gray-600 text-center text-base mb-6">
                    {pres.serviceName}
                </p>
                <p className="text-gray-600 text-center text-base mb-6">
                    {pres.description.length > 30
                        ? `${pres.description.slice(0, 30)}...`
                        : pres.description}
                </p>
                <button className="bg-[#4052B4] text-white px-8 py-2.5 rounded-full hover:bg-blue-700">
                    <Link to={`/VueProfile/${pres.id}`}>Voir le profil</Link>
                </button>
            </div>
        ))
    ) : prestataireByCity && prestataireByCity.length > 0 ? (
        <>
            <h1 className="col-span-3 text-center text-gray-800 text-xl font-semibold mb-4">
            il n'a pas les prestataires dans votre arrondissement voici Les prestataires dans votre ville
            </h1>
            {prestataireByCity.map((pres, index) => (
                <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center justify-between "
                >
                    <img
                        src={`http://127.0.0.1:8000/profile_photos_perstataire/${pres.documents[0].photo}`}
                        alt={pres.nom}
                        className="w-32 h-32 rounded-full mb-6"
                    />
                    <h3 className="font-medium text-xl mb-4">
                        {pres.nom} {pres.prenom}
                    </h3>
                    <p className="text-gray-600 text-center text-base mb-6">
                        {pres.serviceName}
                    </p>
                    <p className="text-gray-600 text-center text-base mb-6">
                        {pres.ville}
                    </p>
                    <p className="text-gray-600 text-center text-base mb-6">
                        {pres.description.length > 30
                            ? `${pres.description.slice(0, 30)}...`
                            : pres.description}
                    </p>
                    <button className="bg-[#4052B4] text-white px-8 py-2.5 rounded-full hover:bg-blue-700">
                        <Link to={`/VueProfile/${pres.id}`}>Voir le profil</Link>
                    </button>
                </div>
            ))}
        </>
    ): prestataireByRegion && prestataireByRegion.length > 0 ? (
        <>
            <h1 className="col-span-3 text-center text-gray-800 text-xl font-semibold mb-4">
            il n'a pas les prestataires dans votre arrondissement et votre ville voici Les prestataires dans votre Region
            </h1>
            {prestataireByRegion.map((pres, index) => (
                <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center justify-between "
                >
                    <img
                        src={`http://127.0.0.1:8000/profile_photos_perstataire/${pres.documents[0].photo}`}
                        alt={pres.nom}
                        className="w-32 h-32 rounded-full mb-6"
                    />
                    <h3 className="font-medium text-xl mb-4">
                        {pres.nom} {pres.prenom}
                    </h3>
                    <p className="text-gray-600 text-center text-base mb-6">
                        {pres.serviceName}
                    </p>
                    <p className="text-gray-600 text-center text-base mb-6">
                        {pres.ville}
                    </p>
                    <p className="text-gray-600 text-center text-base mb-6">
                        {pres.description.length > 30
                            ? `${pres.description.slice(0, 30)}...`
                            : pres.description}
                    </p>
                    <button className="bg-[#4052B4] text-white px-8 py-2.5 rounded-full hover:bg-blue-700">
                        <Link to={`/VueProfile/${pres.id}`}>Voir le profil</Link>
                    </button>
                </div>
            ))}
        </>

    ) : (
        <div className="col-span-3 text-center text-gray-600">
            <p>Aucun prestataire trouvé.</p>
        </div>
    )}
</div>

    </div>
</section>
</main>


    <Footer />
</div>
  )
}





