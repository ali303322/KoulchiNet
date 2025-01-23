import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ModifyPrestataire() {
  const [profileData, setProfileData] = useState({});
  const [Ville, setVille] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [quarties, setQuarties] = useState([]);
  const [villes, setVilles] = useState([]);
  const [servicesProposes, setServicesPropes] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
    const [availability, setAvailability] = useState([]);
    const [availabilityForm, setAvailabilityForm] = useState();
    const [availabilitySet, setAvailabilitySet] = useState(false);
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const times = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });
  const location = useLocation();
  const { id } = location.state || {};
const [documente,setDocument]=useState({});
  // Load existing data when the component mounts
  useEffect(() => {
    axios.get("https://back.koulchinet.com/api/getPrestataireById/"+id)
      .then(res => {
        setProfileData(res.data.prestataire);
        setDocument(res.data.prestataire.documents[0]);
        // setDispo(res.data.prestataire.disponibility);

      })
      .catch(err => console.log(err));
  }, [id]);

  console.log(availability);
  // Fetch villes data
  useEffect(() => {
    axios.get("https://back.koulchinet.com//api/villes")
      .then(res => { setVilles(res.data); })
      .catch(err => console.log(err));
  }, []);

  // Fetch quartiers based on selected Ville
  useEffect(() => {
    if (Ville) {
      axios.get(`https://back.koulchinet.com/api/Districts/${Ville}`)
        .then(res => { setQuarties(res.data); })
        .catch(err => console.log(err));
    }
  }, [Ville]);

  // Fetch services offered
  useEffect(() => {
    axios.get("https://back.koulchinet.com/api/services")
      .then(res => { setServicesPropes(res.data); })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the 'disponibilite' field is being updated
    if (name === 'disponibilite' && value) {
      // If so, add the ':00' seconds
      const formattedValue = value.replace('T', ' ') + ':00';
      setProfileData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAvailabilitySubmit = (e) => {
    e.preventDefault();

    const availabilityData = Object.entries(availability)
      .filter(([day, data]) => data?.enabled) // Only include enabled days
      .map(([day, data]) => ({
        jour: day,
        times: data.timeSlots || [] // Include the timeSlots array
      }));

    // Log the transformed data before setting the state
    console.log('Transformed Availability Data:', availabilityData);

    const transformedData = Object.keys(availabilityData).map((key) => ({
        day: key,
        ...availabilityData[key],
    }));

    setAvailabilityForm(transformedData);
    console.log('av',availabilityForm);


    setAvailabilitySet(true);
    setShowModal(false);
  };



  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day]?.enabled,
      },
    }));
  };

  const addTimeSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [...(prev[day]?.timeSlots || []), { start: times[0], end: times[0] }],
      },
    }));
  };

  const updateTimeSlot = (day, index, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const removeTimeSlot = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter((_, i) => i !== index),
      },
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
        return;
      }
      setSelectedPhoto(file); // Set profile photo
    }
  };

  const saveChanges = () => {
    // Prepare the updated data to send to the API
    const formData = new FormData();
    formData.append('nom', profileData.nom);
    formData.append('prenom', profileData.prenom);
    formData.append('ville', Ville );
    formData.append('quartier',document.getElementById("quartie").value );
    formData.append('telephone', profileData.telephone);
    // formData.append('service', profileData.service);
    formData.append('annees_experience', profileData.annees_experience);
    formData.append('statut', profileData.statut);
    formData.append('disponibility', JSON.stringify(availabilityForm));
    formData.append('description_service', profileData.description_service);



    if (selectedPhoto) {
      formData.append('profile_photo', selectedPhoto);
    }


    axios.post(`https://back.koulchinet.com/api/updatePrestataire/${id}`, formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )
      .then(response => {
        localStorage.setItem("jwt",response.data.token);
         alert(response.data.message)
        window.location.reload();

      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <main className="p-8 bg-[#f0f2f5] font-sans">

      <div className="bg-white rounded-lg p-4 mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="flex items-center mb-8">

          <div className="w-32 h-32 rounded-full overflow-hidden bg-pink-200 flex-shrink-0 mr-5">
            <img  src={`https://back.koulchinet.com/profile_photos_perstataire/${documente && documente.photo}`}alt="Profile" className="w-full h-full object-cover" />
          </div>
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
              <select onChange={(e) => setVille(e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                {villes && villes.map((e, i) => (
                  <option key={i} value={e.villePricipale} selected={e.villePricipale === profileData.ville}>
                    {e.villePricipale}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quartier" className="block text-sm font-bold text-gray-700 mb-1">
                Quartier
              </label>
              <select id='quartie' value={Quartier} onChange={(e) => setQuartier(e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" required>
                {quarties.length > 0
                  ? quarties.map((e, i) => <option key={i} value={e.Arrondissement}>{e.Arrondissement}</option>)
                  : <option value={profileData.aroundissment}>{profileData.aroundissment}</option>}
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
              <label htmlFor="annees_experience" className="block text-sm font-bold text-gray-700 mb-1">
                Années d'expérience
              </label>
              <input
                type="number"
                id="annees_experience"
                name="annees_experience"
                value={profileData.annees_experience || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                min="0"
              />
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="statut" className="block text-sm font-bold text-gray-700 mb-1">
                Statut
              </label>
              <select
                name="statut"
                value={profileData.statut || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              >
                {["Entreprise", "Personne Physique"].map((e, i) => (
                  <option key={i} value={e} selected={e === profileData.statut}>{e}</option>
                ))}
              </select>
            </div>
  <div className="flex flex-col">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Disponibilité
          </label>
          <button
            type="button"
            id="show-availability"
            className="px-4 py-2 text-black-300 bg-white-500 hover:bg-white-100 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md border-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Click to set your weekly availability
          </button>
        </div>

        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Weekly Availability</h2>
        <button onClick={() => setShowModal(false)} className="text-2xl font-semibold">
          &times;
        </button>
      </div>

      <form onSubmit={handleAvailabilitySubmit}>
        {days.map((day) => (
          <div
            key={day}
            className="mb-6 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">{day}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={availability[day]?.enabled || false}
                  onChange={() => toggleDay(day)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {availability[day]?.enabled && (
              <>
                {availability[day]?.timeSlots?.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <select
                      value={slot.start}
                      onChange={(e) => updateTimeSlot(day, index, 'start', e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <span>to</span>
                    <select
                      value={slot.end}
                      onChange={(e) => updateTimeSlot(day, index, 'end', e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(day, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addTimeSlot(day)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Time Slot
                </button>
              </>
            )}
          </div>
        ))}
              {/* Modal closing button and form submission */}
        <button
            type="button"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5"
            onClick={handleAvailabilitySubmit}
        >
            Submit
        </button>
      </form>
    </div>
  </div>
)}
          </div>

          <div>
            <label htmlFor="description_service" className="block text-gray-900 font-bold mb-3">
              Description de vos services
            </label>
            <textarea
              name="description_service"
              value={profileData.description_service || ""}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-bold text-gray-700 mb-1">
              Change Profile Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-[#e9ecef] flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => (window.location.href = 'prestatairedash.html')}
              className="px-4 py-2 border border-[#ced4da] rounded-md text-[#6c757d] hover:bg-gray-50 font-bold"
            >
              Annuler
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
    )
}

