import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InscriptionClient() {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [nom,setNom]=useState("");
    const [Prénom,setPrénom]=useState("");
    const [Email,setEmail]=useState("");
    const [Téléphone,setTéléphone]=useState("");
    const [MotPasse,setMotPasse]=useState("");
    const [ConMotPasse,setConMotPasse]=useState("");
    const [Ville,setVille]=useState("");
    const [Quartier,setQuartier]=useState("");
    const[messageError,setMessageError]=useState("");
   const [captchaVerified, setCaptchaVerified] = useState(false);
   const [PhotoProfel, setPhotoProfel] = useState(null);
    const[ExistError,SetIxeistError]=useState(false);
    const Navigate=useNavigate();
    function scrollTop()
    {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // For smooth scrolling
    });
    }

    const handleCaptchaChange = (value) => {
      if (value) {
        setCaptchaVerified(true);
        }
    };
  const handleFileUpload = (e) => {
     
   if (e.target.accept=="image/*") {
    setPhotoProfel(e.target.files[0]);
   }
   else{
    setDiplome(e.target.files[0])
   }
    const files = Array.from(e.target.files);
    setUploadedFiles(files);

 
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const handleSubmit = async(e) => {
     e.preventDefault();
     if (MotPasse.length<8) {
      SetIxeistError(true)
      setMessageError(" Le mot de passe doit contenir au moins :8 caractères")
      scrollTop();

    return
     }
    if (MotPasse!=ConMotPasse) {
      SetIxeistError(true);
        setMessageError("Le mot de passe et la confirmation du mot de passe ne correspondent pas. Veuillez vérifier et réessayer.");
        scrollTop
    }

    if (!captchaVerified) {
       setMessageError(true);
        alert("Veuillez vérifier le captcha.");
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
    formData.append("profile_photo", PhotoProfel);

    
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register_client', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },   
      }
    ); 
    } catch (error) {
      if (error.response) {
        // Access the 'message' from the server response
          SetIxeistError(true);
         const errorMessage = error.response.data.message;
         setMessageError(errorMessage);
         scrollTop();

      } else {
        console.error('Error:', error.message); // Handle network or unexpected errors
      }
      return 
    }

    Navigate('/ClientDashboard');
    alert("Vérifiez votre e-mail pour le confirmer.")
    return;
    
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
          <div class="error-message bg-red-100 border border-red-200 p-5 flex items-center mb-5">
                  <span class="error-text text-red-600 font-bold text-sm leading-5 text-shadow-sm">
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
                      onChange={(e)=>setMotPasse(e.target.value)}
                type="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
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
                <option value="case" >Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marakech">Marrakech</option>
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
                <option  value="Maarif">Maarif</option>
                <option value="Anfa">Anfa</option>
                <option value="Bourgogne">Bourgogne</option>
              </select>
            </div>
          </div>
        </div>

    
 
 
 
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-2 mb-4">
              Documents
            </h2>
            <div>
              <label className="bg-blue-500 text-white p-5 rounded-md cursor-pointer flex items-center gap-2 mt-10"style={{ width:"240px" }}>
                <i className="fas fa-upload"></i> Photo de profil
                <input  
                  type="file"
                  className="hidden"
                  accept="image/*"
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
      sitekey="6LfwYpUqAAAAAA93-dRYjO5GuGBXspxx6mtEHY5N" // replace with your site key from Google
      onChange={handleCaptchaChange}
         /> 
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 w-full rounded-md hover:bg-blue-500 mt-5"
        >
          <i className="fas fa-check mr-2"></i> S'inscrire
        </button>
      </form>
    </div>
  </div>

  )
}
