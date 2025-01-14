// import React from 'react'
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SIdeBar from "./SIdeBar";
import axios from "axios";

export default function AddContenu() {
    const [typeInputs, setTypeInputs] = useState([1]);
    const [avantageInputs, setAvantageInputs] = useState([1]);
    const [faqInputs, setFaqInputs] = useState([{ question: "", response: "" }]);
    const [titre, setTitre] = useState("");
    const [slogan, setSlogan] = useState("");
    const [nomService , setNomService] = useState("");
    const [isPro , setIsPro] = useState();
    const [message,setMessage] = useState("");
    const [icon,setIcon] = useState(null);

    const location = useLocation();
    const catId = location.state.id ;

    // service content
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTypeServiceImage, setSelectedTypeServiceImage] = useState(null);
    const [aventagesImage, setAventagesImage] = useState(null);
    const [introduction, setIntroduction] = useState("");
    const [description, setDescription] = useState("");
    const [serviceTypeValues, setServiceTypeValues] = useState([""]);
    const [avantageValues, setAvantageValues] = useState([]);
    const [pncValues, setPncValues] = useState([]);

    // porqoi nos choisir
    const [PNC, setPNC] = useState([]);
    const maxInputs = 10;

    const handlServiceType = (e, index) => {
        const newServiceTypeValues = [...serviceTypeValues];
        newServiceTypeValues[index] = e.target.value;
        setServiceTypeValues(newServiceTypeValues);
      };

      // Add a new input field
      const addTypeInput = () => {
        setTypeInputs([...typeInputs, typeInputs.length + 1]);
        setServiceTypeValues([...serviceTypeValues, ""]); // Add empty string for the new input's value
      };

      // Remove an input field
      const removeTypeInput = (index) => {
        setTypeInputs(typeInputs.filter((_, i) => i !== index));
        setServiceTypeValues(serviceTypeValues.filter((_, i) => i !== index));
      };

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedImage(file);
        }
      };

      const handleTypeImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedTypeServiceImage(file);
        }
      };
      const handleIconChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIcon(file);
        }
    };

    const handleAventageImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setAventagesImage(file);
      }
    };







    // Handle change for each "Avantage" input
  const handleAvantageChange = (e, index) => {
    const newAvantageValues = [...avantageValues];
    newAvantageValues[index] = e.target.value;
    setAvantageValues(newAvantageValues);
    console.log(newAvantageValues); // Debugging
  };

  // Add a new "Avantage" input
  const addAvantageInput = () => {
    setAvantageInputs([...avantageInputs, avantageInputs.length + 1]);
    setAvantageValues([...avantageValues, ""]); // Add an empty string for the new input's value
  };

  // Remove an "Avantage" input
  const removeAvantageInput = (index) => {
    setAvantageInputs(avantageInputs.filter((_, i) => i !== index));
    setAvantageValues(avantageValues.filter((_, i) => i !== index));
  };


  const handlePncChange = (e, index) => {
    const newPncValue = [...pncValues];
    newPncValue[index] = e.target.value;
    setPncValues(newPncValue);
    console.log(newPncValue); // Debugging
  };

  // Add a new "Avantage" input
  const addPncInput = () => {
    setPNC([...PNC, PNC.length + 1]);
    setPncValues([...pncValues, ""]); // Add an empty string for the new input's value
  };

  // Remove an "Avantage" input
  const removePncInput = (index) => {
    setPNC(PNC.filter((_, i) => i !== index));
    setPncValues(pncValues.filter((_, i) => i !== index));
  };




  const handleFaqChange = (e, index, field) => {
    const updatedFaqInputs = [...faqInputs];
    updatedFaqInputs[index][field] = e.target.value; // Update the field (question/response)
    setFaqInputs(updatedFaqInputs);
  };

  // Add a new FAQ input pair
  const addFaqInput = () => {
    setFaqInputs([...faqInputs, { question: "", response: "" }]);
  };

  // Remove a FAQ input pair
  const removeFaqInput = (index) => {
    const updatedFaqInputs = faqInputs.filter((_, i) => i !== index);
    setFaqInputs(updatedFaqInputs);
  };

  const hundleSubmit = () => {
    const formData = new FormData();
    formData.append('nomService', nomService);
    formData.append('catId', catId);
    formData.append('titre', titre);
    formData.append('slogan', slogan);
    formData.append('introduction', introduction);
    formData.append('description', description);
    formData.append('PNC', JSON.stringify(pncValues));
    formData.append('faqInputs', faqInputs);
    formData.append('isPro', isPro);

    if (selectedImage) {
        formData.append('selectedImage', selectedImage);
    }
    if (icon) {
        formData.append('icon', icon);
    }
    if (selectedTypeServiceImage) {
        formData.append('selectedTypeServiceImage', selectedTypeServiceImage);
    }
    if (aventagesImage) {
        formData.append('aventagesImage', aventagesImage);
    }

    // Append arrays
    formData.append('faqInputs', JSON.stringify(faqInputs));
    formData.append('avantageValues', JSON.stringify(avantageValues));
    formData.append('serviceTypeValues', JSON.stringify(serviceTypeValues));



    // // Axios request
    axios.post('http://127.0.0.1:8000/api/addServiceAndContent', formData)
        .then(response => {
            console.log('Service stored successfully:', response.data);
            alert("service crée avec succes");
        })
        .catch(error => {
            console.error('Error storing service:', error.response ? error.response.data : error.message);
        });
}




  return (
    <div className="bg-gray-100 min-h-screen flex">
    {/* Sidebar */}
    <div className="w-80 bg-[#4a69bd] text-white">
        <SIdeBar/>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h3 className="text-xl font-medium text-[#4a69bd]">Ajouter un Service</h3>
        </div>

        <div className="flex-1 p-8">
    <div className="bg-white rounded-lg shadow-sm">

        {/* Form Container */}
        <div className="p-6">
        <div>
            {message && <p>{message}</p>} {/* Display the success message if available */}
            {/* Your other content */}
        </div>
            <div className="max-h-[600px] overflow-y-auto pr-4" style={{ scrollbarWidth: 'thin' }}>
                <form className="space-y-4">
                <div>
            <label htmlFor="service" className="block text-gray-700 font-medium mb-2">est-il pro ? :</label>
            <select
                onChange={(e)=>setIsPro (e.target.value)}
                id="service"
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
            >
                <option value="" disabled selected>Choisir une choix</option>
                <option value={1}>pro</option>
                <option value={0}>Normal</option>
            </select>
            </div>
                    {/* Titre */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Nom Service:</label>
                        <input
                            type="text"
                            placeholder="Entrer Nom Service"
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                            onChange={(e)=>setNomService(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Titre:</label>
                        <input
                            type="text"
                            placeholder="Entrer le titre"
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                            onChange={(e)=>setTitre(e.target.value)}
                        />
                    </div>

                    {/* Slogan */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Slogan:</label>
                        <input
                            type="text"
                            placeholder="Entrer le slogan"
                            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                            onChange={(e)=>setSlogan(e.target.value)}
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Image:</label>
                        <div className="relative">
                            <input
                            type="file"
                            id="serviceImage"
                            className="hidden"
                            accept="image/*" // Restrict to image files only
                            onChange={handleImageChange}
                            />
                            <label
                            htmlFor="serviceImage"
                            className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
                            >
                            <span className="text-gray-500">Télécharger l'image</span>
                            <i className="fas fa-cloud-upload-alt text-gray-400"></i>
                            </label>
                        </div>


                        {/* Display a preview of the selected image */}
                        {selectedImage && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Fichier sélectionné: {selectedImage.name}</p>
                            <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded-md"
                            />
                        </div>
                        )}
                    </div>

                        {/* icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2">icon:</label>
                            <div className="relative">
                                <input
                                type="file"
                                id="serviceIcon"
                                className="hidden"
                                accept="image/*" // Restrict to image files only
                                onChange={handleIconChange}
                                />
                                <label
                                htmlFor="serviceIcon"
                                className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
                                >
                                <span className="text-gray-500">Télécharger l'icon</span>
                                <i className="fas fa-cloud-upload-alt text-gray-400"></i>
                                </label>
                            </div>
                        </div>

                    {/* Introduction */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Introduction:</label>
                        <textarea
                            rows="4"
                            placeholder="Entrer le texte"
                            className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                            onChange={(e)=>setIntroduction(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Description:</label>
                        <textarea
                            rows="4"
                            placeholder="Entrer le texte"
                            className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                            onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Types de services section */}
                    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Types de services:</label>
        <div className="relative">
          <input
            type="file"
            className="hidden"
            id="serviceTypeImage"
            onChange={handleTypeImageChange} // Add your image change handler
          />
          <label
            htmlFor="serviceTypeImage"
            className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
          >
            <span className="text-gray-500">Télécharger l'image</span>
            <i className="fas fa-cloud-upload-alt text-gray-400"></i>
          </label>
        </div>
      </div>

      {/* Dynamic Type inputs */}
      <div className="space-y-2">
        {typeInputs.map((_, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={serviceTypeValues[index] || ""}
              placeholder={`Type ${index + 1}`}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
              onChange={(e) => handlServiceType(e, index)} // Update value in the correct index
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTypeInput(index)} // Remove the input
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Button to add a new input */}
      <button
        type="button"
        onClick={addTypeInput}
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        Ajouter un service
      </button>
    </div>

  {/* Dynamic Inputs for Pour qoui nos choisire */}
  <div className="space-y-2">
  <label className="block text-sm font-medium mb-2">Pourqoui nos choisire:</label>
        {PNC.map((_, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={pncValues[index] || ""}
              placeholder={`Type ${index + 1}`}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
              onChange={(e) => handlePncChange(e, index)} // Update value in the correct index
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removePncInput(index)} // Remove the input
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            )}
          </div>
        ))}
      {/* </div> */}

      {/* Button to add a new input */}
      <button
        type="button"
        onClick={addPncInput}
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        Ajouter un input
      </button>
    </div>

                    {/* Avantages section */}
                    <div className="space-y-4">
      {/* Avantage Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Avantages:</label>
        <div className="relative">
          <input
            type="file"
            className="hidden"
            id="avantageImage"
            onChange={handleAventageImageChange} // Add your image change handler
          />
          <label
            htmlFor="avantageImage"
            className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
          >
            <span className="text-gray-500">Télécharger l'image</span>
            <i className="fas fa-cloud-upload-alt text-gray-400"></i>
          </label>
        </div>
      </div>

      {/* Dynamic Avantage Inputs */}
      <div className="space-y-2">
        {avantageInputs.map((_, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={avantageValues[index] || ""}
              placeholder={`Avantage ${index + 1}`}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
              onChange={(e) => handleAvantageChange(e, index)} // Update the value for this input
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeAvantageInput(index)} // Remove the input and its value
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            )}
          </div>
        ))}

        {/* Button to add a new "Avantage" input */}
        {avantageInputs.length < maxInputs && (
          <button
            type="button"
            onClick={addAvantageInput}
            className="mt-2 text-[#4a69bd] hover:text-[#364f9b] flex items-center"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            <span>Ajouter un Avantage</span>
          </button>
        )}
      </div>
    </div>

    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2">FAQs:</label>

      {/* Dynamic FAQ inputs */}
      <div className="space-y-4">
        {faqInputs.map((input, index) => (
          <div key={index} className="space-y-2">
            <div className="flex space-x-2">
              {/* Question Input */}
              <input
                type="text"
                value={input.question}
                placeholder="Question"
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
                onChange={(e) => handleFaqChange(e, index, "question")} // Update question value
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeFaqInput(index)} // Remove the current FAQ
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-minus-circle"></i>
                </button>
              )}
            </div>

            {/* Response Input */}
            <textarea
              rows="4"
              value={input.response}
              placeholder="Réponse"
              className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
              onChange={(e) => handleFaqChange(e, index, "response")} // Update response value
            ></textarea>
          </div>
        ))}

        {/* Add FAQ button */}
        {faqInputs.length < maxInputs && (
          <button
            type="button"
            onClick={addFaqInput}
            className="mt-2 text-[#4a69bd] hover:text-[#364f9b] flex items-center"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            <span>Ajouter une FAQ</span>
          </button>
        )}
      </div>
    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center mt-6 pt-4 border-t">
                        <button
                            type="button"
                            onClick={hundleSubmit}
                            className="px-12 py-2 bg-[#4a69bd] text-white rounded-full text-sm"
                        >
                            Sauvegarder
                        </button>
            </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
</div>
  </div>
)}
