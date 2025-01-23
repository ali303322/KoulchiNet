import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
export default function InscriptionPrestataire() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [nom,setNom]=useState("");
    const [Prénom,setPrénom]=useState("");
    const [Email,setEmail]=useState("");
    const [Téléphone,setTéléphone]=useState("");
    const [MotPasse,setMotPasse]=useState("");
    const [ConMotPasse,setConMotPasse]=useState("");
    const [Ville,setVille]=useState("");
    const [Quartier,setQuartier]=useState("");
    const [ServiceProposé,setServiceProposé]=useState("");
    const [AnneExp,setAnneExp]=useState("");
    const [Statut,setStatut]=useState("");
    const [Disponibilite,setDisponibilite]=useState("");
    const [Description,setDescription]=useState("");
    const[messageError,setMessageError]=useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [Diplome, setDiplome] = useState(null);
    const [PhotoProfel, setPhotoProfel] = useState(null);
    const[ExistError,SetIxeistError]=useState(false);

    const [showModal, setShowModal] = useState(false);
    const [availability, setAvailability] = useState([]);
    const [availabilityForm, setAvailabilityForm] = useState();
    const [availabilitySet, setAvailabilitySet] = useState(false);
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

 const [strength, setStrength] = useState(0);

    // Fonction pour évaluer la force du mot de passe
    const calculateStrength = (password) => {
        let strength = 0;

        // Critères de force
        if (password.length >= 6) strength++; // Longueur minimale
        if (/[A-Z]/.test(password)) strength++; // Contient une majuscule
        if (/[a-z]/.test(password)) strength++; // Contient une minuscule
        if (/\d/.test(password)) strength++; // Contient un chiffre
        if (/[@$!%*?&]/.test(password)) strength++; // Contient un caractère spécial

        return strength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setMotPasse(newPassword);
        setStrength(calculateStrength(newPassword)); // Met à jour la force
    };
    function generateTimes() {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
          for (let minute of ['00', '30']) {
            const period = hour < 12 ? 'AM' : 'PM';
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            times.push(`${displayHour}:${minute} ${period}`);
          }
        }
        return times;
      }

      const times = generateTimes();


    const [villes,setVilles]=useState([]);
    const [quarties,setQuarties]=useState([]);

   const [servicesProposes,setServicesPropes]=useState([]);
  useEffect(()=>{
    axios.get("https://back.koulchinet.com/api/villes")
    .then(res=>{setVilles(res.data)})
    .catch(err=>console.log(err))
  },[])

  useEffect(()=>{
    axios.get("https://back.koulchinet.com/api/services")
    .then(res=>{setServicesPropes(res.data)})
    .catch(err=>console.log(err))
  },[])

  useEffect(()=>{
    axios.get(`https://back.koulchinet.com/api/Districts/${Ville}`)
    .then(res=>{setQuarties(res.data)})
    .catch(err=>console.log(err))
  },[Ville])



    function validatePhoneNumber() {
      const phoneRegex = /^(06|07)[0-9]{8}$/;
      if (!phoneRegex.test(Téléphone)) {
        SetIxeistError(true)
         setMessageError("Veuillez entrer un numéro de téléphone valide (commençant par 06 ou 07 et 10 chiffres).");
         return true;
      }
      return false;
      }



    function scrollTop()
    {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // For smooth scrolling
    });
    }
   const Navigate=useNavigate();
    const handleCaptchaChange = (value) => {
      if (value) {
        setCaptchaVerified(true);
        }
    };
    const handleFileUpload = (e) => {
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
          setPhotoProfel(file); // Set profile photo
        } else {
          const maxDiplomeSize = 25 * 1024 * 1024; // 25 MB in bytes
          if (file.size > maxDiplomeSize) {
            alert("La taille du diplôme dépasse 25 Mo. Veuillez télécharger un fichier plus petit.");
            return;
          }
          setDiplome(file); // Set diploma
        }

        setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Add file to uploaded files
      };


  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
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
    console.log(Array.isArray(availabilityData)); // Should return true


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

//   console.log(availabilityForm);


  const handleSubmit = async (e) => {

    if (!messageError) {
        setMessageError("Le mot de passe est requis.");
    } else if (!/^[A-Z]/.test(MotPasse)) {
        setMessageError("Le mot de passe doit commencer par une lettre majuscule.");
    } else if (!/\d/.test(MotPasse)) {
        setMessageError("Le mot de passe doit contenir au moins un chiffre.");
    } else if (MotPasse !== ConMotPasse) {
        setMessageError("La confirmation du mot de passe est incorrecte.");
    } else {
        setMessageError(""); // Pas d'erreur, le mot de passe est valide
    }

    e.preventDefault();
    if (validatePhoneNumber()) {
      scrollTop();
      return;
    }

    if (MotPasse.length < 8) {
      SetIxeistError(true);
      setMessageError("Le mot de passe doit contenir au moins 8 caractères");
      scrollTop();
      return;
    }

    if (MotPasse !== ConMotPasse) {
      SetIxeistError(true);
      setMessageError("Le mot de passe et la confirmation du mot de passe ne correspondent pas. Veuillez vérifier et réessayer.");
      scrollTop();
      return;
    }

    if (!captchaVerified) {
      setMessageError(true);
      alert("Veuillez vérifier le captcha..");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", Prénom);
    formData.append("email", Email);
    formData.append("telephone", Téléphone);
    formData.append("mot_de_passe", MotPasse);
    formData.append("mot_de_passe_confirmation", ConMotPasse);
    formData.append("ville", Ville);
    formData.append("quartier", Quartier);
    formData.append("name_service", ServiceProposé);
    formData.append("annees_experience", AnneExp);
    formData.append("statut", Statut);
    formData.append("description_service", Description);
    formData.append("profile_photo", PhotoProfel);
    formData.append("diplome", Diplome);
    formData.append("disponibility",  JSON.stringify(availabilityForm));



    try {
      const response = await axios.post('https://back.koulchinet.com/api/register_prestataire', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });

      alert("Vérifiez votre e-mail pour le confirmer.");

      const token = response.data.token;
      localStorage.setItem("jwt", token);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        SetIxeistError(true);
        const errorMessage = error.response.data.message;
        setMessageError(errorMessage);
        scrollTop();
      } else {
        console.error('Error:', error.message);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">


      <div className="container mx-auto max-w-4xl p-4">
        <form
          className="bg-white shadow-md rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-2 mb-4">
              Informations Personnelles
            </h2>
            {ExistError ?
            <div className="error-message bg-red-100 border border-red-200 p-5 flex items-center mb-5">
                    <span className="error-text text-red-600 font-bold text-sm leading-5 text-shadow-sm">
                       {messageError}
                    </span>
            </div>:""}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input  value={nom}
                        onChange={(e)=>setNom(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input  value={Prénom}
                        onChange={(e)=>setPrénom(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Email <span className="text-red-500">*</span>
                </label>
                <input  value={Email}
                        onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input   value={Téléphone}
                        onChange={(e)=>setTéléphone(e.target.value)}
                  type="tel"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>


                <label className="block text-gray-900 font-bold mb-3">
                    Mot de passe <span className="text-red-500">*</span>
                </label>
                <input  value={MotPasse}
                        onChange={handlePasswordChange}
                  type="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                 {/* Password Strength Bar */}
                 <div className="mt-2 rounded">
                    <div className="h-2 bg-gray-200 rounded">
                        <div
                            className={`h-full rounded ${
                                strength <= 1
                                    ? "bg-red-500"
                                    : strength === 2
                                    ? "bg-yellow-500"
                                    : strength === 3
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                            }`}
                            style={{ width: `${(strength / 5) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                        {strength <= 1
                            ? "Très faible"
                            : strength === 2
                            ? "Faible"
                            : strength === 3
                            ? "Moyen"
                            : "Fort"}
                    </p>
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-3">
                confirmation du mot de passe <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"  value={ConMotPasse}
                  onChange={(e)=>setConMotPasse(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Ville <span className="text-red-500">*</span>
                </label>
                <select  value={Ville}
                        onChange={(e)=>setVille(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez une ville</option>
                  { villes && villes.map((e,i)=>{
                      return <option   key={i} value={e.villePricipale} >{e.villePricipale}</option>
                  })}
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Quartier <span className="text-red-500">*</span>
                </label>
                <select   value={Quartier}
                        onChange={(e)=>setQuartier(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez un quartier</option>

                  {quarties && quarties.map((e,i)=>{
                    return  <option key={i} value={e.Arrondissement}>{e.Arrondissement}</option>
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-2 mb-4">
              Informations Professionnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Service Proposé <span className="text-red-500">*</span>
                </label>
                <select  value={ServiceProposé}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 mb-3"
                  required
                  onChange={e=>setServiceProposé(e.target.value)}
                >


                  <option value="">Sélectionnez un service</option>
                  {servicesProposes && servicesProposes.map((e,i)=>{
                    return  <option  key={i} value={e.id}>{e.serviceName}</option>
                  })}
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                  Années d'expérience <span className="text-red-500">*</span>
                </label>
                <input   value={AnneExp}
                        onChange={(e)=>setAnneExp(e.target.value)}
                  type="number"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-3">
                Statut <span className="text-red-500">*</span>
                </label>
                <select  value={Statut}
                        onChange={(e)=>setStatut(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez un Statut</option>
                  <option value="Entreprise">Entreprise</option>
                  <option value="Personne Physique">Personne Physique</option>
                </select>
              </div>
              {/* <div className="mb-6">


  <label className="block mb-2 font-medium text-gray-700">Disponibilité</label>
  <input
    type="date"
    onChange={(e) => setDisponibilite(e.target.value)}
    className="w-full p-3 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
  />
    {availabilitySet ? 'Availability Schedule Set ✓' : 'Click to set your weekly availability'}
</div> */}

<div className="flex flex-col space-y-4">
<label className="block text-gray-900 font-bold ">
                Disponibilité <span className="text-red-500">*</span>
</label>
  <button
    type="button"
    id="show-availability"
    className="px-4 py-2 text-black-300 bg-white-500 hover:bg-white-100 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md border-2"
    onClick={() => setShowModal(true)}
  >
    Click to set your weekly availability
  </button>
</div>


{/* Modal for availability */}
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

<div>
        <label className="block text-gray-900 font-bold mb-3">
          Description de vos services
        </label>
        <textarea
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
</div>

          {/* Documents Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-2 mb-4">
              Documents
            </h2>
            <div>
              <label className="bg-blue-500 text-white p-5 rounded-md cursor-pointer flex items-center gap-2"style={{ width:"240px" }}>
                <i className="fas fa-upload"></i> Photo de profil
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <div>
              <label className="bg-blue-500 text-white p-5 rounded-md cursor-pointer flex items-center gap-2 mt-5" style={{ width:"240px" }}>
                <i className="fas fa-upload"></i> Diplômes/Certifications
                <input
                  type="file"
                  className="hidden"
                  accept="image/*, application/pdf"
                  multiple
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <div className="mt-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white border rounded-md p-2 mb-2"
                >
                  <i className="fas fa-file mr-2"></i>
                  <span className="flex-1">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

           <ReCAPTCHA
        sitekey="6LcDFrsqAAAAAEW4toQSAg9BT1NR4UNI6aYLYNmA" // replace with your site key from Google
        onChange={handleCaptchaChange}
      />

       <br />
               <input type="checkbox" id="condition_general" name="condition_general" required/>
          <label htmlFor="condition_general">   j'accepte les <Link to="/ConditionGeneral" className='text-blue-500 '>conditions générales </Link>et la  <Link className='text-blue-500 ' to='/PolitiqueEtConfidentialite'>politique de confidentialité</Link></label>
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-4 w-full rounded-md hover:bg-blue-500 mt-5"
          >
            <i className="fas fa-check mr-2"></i> S'inscrire
          </button>

        </div>
        </form>
      </div>
    </div>


  )
}
