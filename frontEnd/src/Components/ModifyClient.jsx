import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ModifyClient() {
  const [profileData, setProfileData] = useState({});
  const [Ville, setVille] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [quarties, setQuarties] = useState([]);
  const [villes, setVilles] = useState([]);
  const [photo, setPhoto] = useState(null);
  const location = useLocation();
  const { id } = location.state || {};

  // Fetch client data by ID
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getclientbyid/${id}`)
      .then(res => {
        setProfileData(res.data.client);
        setVille(res.data.client.ville); // Set Ville from profileData
        setQuartier(res.data.client.quartier); // Set Quartier from profileData
      })
      .catch(err => console.log(err));
  }, [id]);

  // Fetch available villes
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/villes")
      .then(res => { setVilles(res.data); })
      .catch(err => console.log(err));
  }, []);

  // Fetch quartiers based on selected Ville
  useEffect(() => {
    if (Ville) {
      axios.get(`http://127.0.0.1:8000/api/Districts/${Ville}`)
        .then(res => { setQuarties(res.data); })
        .catch(err => console.log(err));
    } else {
      setQuarties([]); // Reset quartiers if no Ville is selected
    }
  }, [Ville]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0]; // Assume single file upload for each input

    if (!file) {
      return;
    }

    if (e.target.accept === "image/*") {
      const maxProfileSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (file.size > maxProfileSize) {
        alert("La taille de la photo de profil dépasse 5 Mo. Veuillez télécharger un fichier plus petit.");
        setPhoto(null);
        return;
      }
      setPhoto(file); // Set profile photo
    }
  };




  // Save changes (update client)
  const saveChanges = () => {
    // Validation check if Quartier is selected
    const updatedClientData = new FormData();
    updatedClientData.append('nom',profileData.nom);
    updatedClientData.append('prenom', profileData.prenom);
    updatedClientData.append('telephone',  profileData.telephone);
    updatedClientData.append('ville', Ville);
    updatedClientData.append('quartier', document.getElementById("quartie").value); // Ensure this is being set properly
    updatedClientData.append('photo_profel', photo);
    axios.post(`http://127.0.0.1:8000/api/updateClient/${id}`, updatedClientData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        alert("Données du client mises à jour avec succès.");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating client:", err);
      });
  };

  return (
    <main className="p-8 bg-[#f0f2f5] font-sans">
      {/* Profile Information Card */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="flex items-center mb-8">
          {/* Profile Picture */}

          <div className="w-32 h-32 rounded-full overflow-hidden bg-pink-200 flex-shrink-0 mr-5">
            <img  src={`http://127.0.0.1:8000/profile_photos_Client/${profileData.photo_profel}`}  alt="Profile" className="w-full h-full object-cover" />
          </div>
          {/* Profile Info */}
          <div>
            <h1 className="text-[#333] text-2xl font-bold m-0">{profileData.nom} {profileData.prenom}</h1>
            <p className="text-[#6c757d] my-2">{profileData.statut}</p>
            <p className="text-[#6c757d] my-2">{profileData.email}</p>
          </div>
        </div>

        <h2 className="text-[#4a90e2] text-xl font-semibold mt-0 mb-6">
          Informations personnelles
        </h2>

        <form id="profile-form" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-bold text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={profileData.nom || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
              />
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm font-bold text-gray-700 mb-1">
                Prenom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={profileData.prenom || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ville" className="block text-sm font-bold text-gray-700 mb-1">
                Ville
              </label>
              <select
                onChange={(e) => setVille(e.target.value)}
                value={Ville} // Set selected Ville
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                {villes.map((e, i) => (
                  <option key={i} value={e.villePricipale}>
                    {e.villePricipale}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quartier" className="block text-sm font-bold text-gray-700 mb-1">
                Quartier
              </label>
              <select
              id='quartie'
                value={Quartier}
                onChange={(e) => setQuartier(e.target.value)} // Update Quartier
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                required>

                {quarties.length > 0
                  ? quarties.map((e, i) => <option key={i}  selected={profileData.aroundissment==e.Arrondissement} value={e.Arrondissement}>{e.Arrondissement}</option>)
                  : <option selected value={profileData.aroundissment}>{profileData.aroundissment}</option>}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="telephone" className="block text-sm font-bold text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={profileData.telephone || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#ced4da] rounded-md focus:ring-2 focus:ring-[#4a90e2] focus:border-[#4a90e2] outline-none"
            />
          </div>
          <div>
            <label htmlFor="photo_profel" className="block text-sm font-bold text-gray-700 mb-1">
              Photo de profil
            </label>
            <input
              type="file"
              id="photo_profel"
              name="photo_profel"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-[#e9ecef] flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-[#ced4da] rounded-md text-[#6c757d] hover:bg-gray-50 font-bold"
            >
                <Link to='/ClientDashboard'>Annuler</Link>
            </button>
            <button
              type="button"
              onClick={saveChanges}
              className="px-4 py-2 bg-[#4a90e2] text-white rounded-md hover:bg-[#357abd] font-bold"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
