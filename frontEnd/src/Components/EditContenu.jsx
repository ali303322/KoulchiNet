// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditContenu() {
    const [typeInputs, setTypeInputs] = useState([]);
    const [aventages, setAventages] = useState([]);
    const [faq, setFaq] = useState([]);
    const [titre, setTitre] = useState('');
    const [slogan, setSlogan] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [description, setDescription] = useState('');
    const [pnch, setPnch] = useState('');
    const [image, setImage] = useState(null);
    const [avImage, setAvImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const [ImageTypeServices, setImageTypeServices] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedAvImageFile, setSelectedAvImageFile] = useState(null);
    const [selectedTypeServImageFile, setSelectedTypeServImageFile] = useState(null);
    const [isPro , setIsPro] = useState();
    // const [services, setServices] = useState([]);
    const maxInputs = 10;
    const { id } = useParams();

    useEffect(() => {
      showService(id);
    }, [id]);

    const showService = async (id) => {
      try {
        const response = await fetch(`https://back.koulchinet.com/api/Edit-service-content/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch service data');
        }

        const data = await response.json();

        const service = data.service;
        const typesServ = data.typesServ;
        const aventages = data.aventages;
        const faq = data.faq;
        const pnc = data.pnc;
        const serviceDesc = data.serviceDesc;

        // console.log(aventages);

        setTitre(service.titre);
        setSlogan(service.slogan);
        setIntroduction(service.introduction);
        setDescription(service.description);
        setIcon(serviceDesc.icon);
        setIsPro(serviceDesc.PRO);
        setPnch(pnc);
        setImage(service.imageHeader); // Set the default image
        setAvImage(service.imageaventage); // Set the default image
        setImageTypeServices(service.ImageTypeServices); // Set the default image
        setTypeInputs(typesServ.map((type) => type.sousService));
        // setServices(typesServ);
        setAventages(aventages);
        setFaq(faq);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedImageFile(file);
          setImage(URL.createObjectURL(file)); // Temporarily display the new image
        }
    }
    const handlSelectedIcon = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedIcon(file);
          setIcon(URL.createObjectURL(file)); // Temporarily display the new image
        }
    }
    const handleAvImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedAvImageFile(file);
          setAvImage(URL.createObjectURL(file)); // Temporarily display the new image
        }
    }
    const handleTypeSerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedTypeServImageFile(file);
            setImageTypeServices(URL.createObjectURL(file)); // Temporarily display the new image
        }
    }

    const addInput = (typeInputs, setTypeInputs) => {
        if (typeInputs.length < maxInputs) {
          setTypeInputs([...typeInputs, '']); // Add an empty input
        }
      };
    const addInputAv = (typeInputs, setAventages) => {
        if (typeInputs.length < maxInputs) {
          setAventages([...typeInputs, '']); // Add an empty input
        }
      };
    const addInputPnc = (typeInputs, setAventages) => {
        if (typeInputs.length < maxInputs) {
          setAventages([...typeInputs, '']); // Add an empty input
        }
      };

      console.log(selectedIcon);

      const removeInput = (index, typeInputs, setTypeInputs) => {
        const updatedInputs = typeInputs.filter((_, i) => i !== index);
        setTypeInputs(updatedInputs);
      };
      const removeInputAv = (index, typeInputs, setTypeInputs) => {
        const updatedInputs = typeInputs.filter((_, i) => i !== index);
        setTypeInputs(updatedInputs);
      };
      const removeInputPnc = (index, typeInputs, setAventages) => {
        const updatedInputs = typeInputs.filter((_, i) => i !== index);
        setAventages(updatedInputs);
      };

      const updateInput = (index, value) => {
        const updatedInputs = [...typeInputs];
        updatedInputs[index] = value;
        setTypeInputs(updatedInputs);
      };
      const updateInputAv = (index, value) => {
        const updatedInputs = [...aventages];
        updatedInputs[index] = value;
        setAventages(updatedInputs);
      };
      const updateInputPnc = (index, value) => {
        const updatedInputs = [...pnch];
        updatedInputs[index] = value;
        setPnch(updatedInputs);
      };


      const handleFaqChange = (e, index, field) => {
        const updatedFaqs = [...faq];
        updatedFaqs[index][field] = e.target.value;
        setFaq(updatedFaqs);
      };

      // Add new FAQ input
      const addFaqInput = () => {
        setFaq([...faq, { question: "", response: "" }]);
      };

      // Remove an FAQ input
      const removeFaqInput = (index) => {
        setFaq(faq.filter((_, i) => i !== index));
      };


      const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titre", titre);
        formData.append("slogan", slogan);
        formData.append("pro", isPro);
        formData.append("introduction", introduction);
        formData.append("description", description);
        if (selectedImageFile) { // Ensure it's a valid file
            formData.append("image", selectedImageFile);
        }
        formData.append("types", JSON.stringify(typeInputs)); // Convert types to JSON string
        if (selectedAvImageFile) { // Ensure it's a valid file
            formData.append("aventageImage", selectedAvImageFile);
        }
        if (selectedIcon) { // Ensure it's a valid file
            formData.append("icon", selectedIcon);
        }
        if (selectedTypeServImageFile) { // Ensure it's a valid file
            formData.append("imageType", selectedTypeServImageFile);
        }
        // formData.append("imageType", selectedTypeServImageFile);
        formData.append("faq", JSON.stringify(faq)); // Convert FAQ to JSON string
        formData.append("aventages", JSON.stringify(aventages)); // Convert advantages to JSON string
        formData.append("pnc", JSON.stringify(pnch)); // Convert advantages to JSON string
        // formData.append("services", JSON.stringify(services));

        // console.log(formData.pnc);



        // Afficher les données envoyées
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post(
                `https://back.koulchinet.com/api/update-service-content/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert("Service updated successfully!");
            } else {
                alert("Failed to update the service.");
            }
        } catch (error) {
            console.error("Error submitting form:", error.response);
            alert(error.response?.data?.error || "An error occurred while updating the service.");
        }
    };

console.log(aventages);




    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-80 bg-[#4a69bd] text-white">
          <nav className="pt-12 px-16">
            <a href="/admindash" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-file-alt w-6"></i>
              <span>Demande</span>
            </a>
            <a href="/gestionPres" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-users w-6"></i>
              <span>Gestion des prestataires</span>
            </a>
            <a href="/gestionClient" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-user-friends w-6"></i>
              <span>Gestion des clients</span>
            </a>
            <a href="/gestionProduit" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-box w-6"></i>
              <span>Gestion des produits</span>
            </a>
            <a href="/gestionContenu" className="flex items-center space-x-4 text-lg mb-12">
              <i className="fas fa-file-alt w-6"></i>
              <span>Gestion de contenu</span>
            </a>
            <div className="mt-auto pt-32">
              <a
                href="/apropo"
                className="flex items-center space-x-4 text-lg text-white/80 hover:text-white"
              >
                <i className="fas fa-sign-out-alt w-6"></i>
                <span>Se déconnecter</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-medium text-[#4a69bd]">Modifier le Service</h3>
            </div>

            {/* Form */}
            <div className="p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
            {/* <div className="max-h-[600px] overflow-y-auto pr-4" style={{ scrollbarWidth: 'thin' }}> */}
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
  {/* Title */}
  <div>
    <label className="block text-sm font-medium mb-2">Titre:</label>
    <input
      type="text"
      value={titre} // Use `value` instead of `defaultValue` for controlled inputs
      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
      onChange={(e) => setTitre(e.target.value)} // Update state on change
    />
  </div>

  {/* Slogan */}
  <div>
    <label className="block text-sm font-medium mb-2">Slogan:</label>
    <input
      type="text"
      value={slogan} // Use `value` instead of `defaultValue`
      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
      onChange={(e) => setSlogan(e.target.value)} // Update state on change
    />
  </div>
  {/* introduction */}
  <div>
    <label className="block text-sm font-medium mb-2">introduction:</label>
    <input
      type="text"
      value={introduction} // Use `value` instead of `defaultValue`
      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
      onChange={(e) => setIntroduction(e.target.value)} // Update state on change
    />
  </div>
  {/* description */}
  <div>
    <label className="block text-sm font-medium mb-2">description:</label>
    <input
      type="text"
      value={description} // Use `value` instead of `defaultValue`
      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
      onChange={(e) => setDescription(e.target.value)} // Update state on change
    />
  </div>
  {/* PourquoiNousChoisir
  <div>
    <label className="block text-sm font-medium mb-2">Slogan:</label>
    <input
      type="text"
      value={description} // Use `value` instead of `defaultValue`
      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
      onChange={(e) => setDescription(e.target.value)} // Update state on change
    />
  </div> */}

{/* Image */}
<div>
  <label className="block text-sm font-medium mb-2">Image:</label>
  <div className="relative">
    <input
      type="file"
      className="hidden"
      id="imageUpload"
      onChange={handleImageChange} // Handle image file selection
    />
    <label
      htmlFor="imageUpload"
      className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
    >
      <span className="text-gray-500">Télécharger l&rsquo;image</span>
      <i className="fas fa-cloud-upload-alt text-gray-400"></i>
    </label>
  </div>

  {image && (
    <div className="mt-4">
      <img
        src={image.startsWith('https') ? image : `https://back.koulchinet.com/${image}`}
        alt="Selected"
        className="w-20 h-auto rounded"
      />
    </div>
  )}
</div>
{/* icon */}
<div>
  <label className="block text-sm font-medium mb-2">Icon:</label>
  <div className="relative">
    <input
      type="file"
      className="hidden"
      id="Icon"
      onChange={handlSelectedIcon} // Handle image file selection
    />
    <label
      htmlFor="Icon"
      className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
    >
      <span className="text-gray-500">Télécharger l&rsquo;image</span>
      <i className="fas fa-cloud-upload-alt text-gray-400"></i>
    </label>
  </div>

  {icon && (
    <div className="mt-4">
      <img
        src={icon.startsWith('https') ? icon : `https://back.koulchinet.com/${icon}`}
        alt="Selected"
        className="w-20 h-auto rounded"
      />
    </div>
  )}
</div>


   {/* Image avantages */}
<div>
  <label className="block text-sm font-medium mb-2">Aventages Image:</label>
  <div className="relative">
    <input
      type="file"
      className="hidden"
      id="avantageImageUpload"
      onChange={handleAvImageChange} // Handle image file selection
    />
    <label
      htmlFor="avantageImageUpload"
      className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
    >
      <span className="text-gray-500">Télécharger l&rsquo;image</span>
      <i className="fas fa-cloud-upload-alt text-gray-400"></i>
    </label>
  </div>

  {avImage && (
    <div className="mt-4">
      <img
        src={avImage.startsWith('https') ? avImage : `https://back.koulchinet.com/${avImage}`}
        alt="Selected"
        className="w-20 h-auto rounded"
      />
    </div>
  )}
</div>
 {/* Dynamic Inputs for Types de Aventages */}
 <div className="space-y-4">
    <label className="block text-sm font-medium mb-2">Aventages:</label>
    {aventages.map((input, index) => (
      <div key={index} className="flex space-x-2">
        <input
          type="text"
          value={input.Aventage} // Bind the current value from state
          onChange={(e) => updateInputAv(index, e.target.value)} // Update state dynamically
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
        />
        {index > 0 && (
          <button
            type="button"
            onClick={() => removeInputAv(index, aventages, setAventages)} // Remove input on click
            className="text-red-500 hover:text-red-700"
          >
            <i className="fas fa-minus-circle"></i>
          </button>
        )}
      </div>
    ))}
    {aventages.length < maxInputs && (
      <button
        type="button"
        onClick={() => addInputAv(aventages, setAventages)} // Add new input on click
        className="mt-2 text-[#4a69bd] hover:text-[#364f9b] flex items-center"
      >
        <i className="fas fa-plus-circle mr-2"></i>
        Add Aventage
      </button>
    )}
  </div>
 {/* Image type service */}
<div>
  <label className="block text-sm font-medium mb-2">Type service Image:</label>
  <div className="relative">
    <input
      type="file"
      className="hidden"
      id="typeServiceImageUpload"
      onChange={handleTypeSerImageChange} // Handle image file selection
    />
    <label
      htmlFor="typeServiceImageUpload"
      className="flex items-center justify-between w-full px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-50"
    >
      <span className="text-gray-500">Télécharger l&rsquo;image</span>
      <i className="fas fa-cloud-upload-alt text-gray-400"></i>
    </label>
  </div>

  {ImageTypeServices && (
    <div className="mt-4">
      <img
        src={ImageTypeServices.startsWith('https') ? ImageTypeServices : `https://back.koulchinet.com/${ImageTypeServices}`}
        alt="Selected"
        className="w-20 h-auto rounded"
      />
    </div>
  )}
</div>
  {/* </div> */}

  {/* Dynamic Inputs for Types de services */}
  <div className="space-y-4">
    <label className="block text-sm font-medium mb-2">Types de services:</label>
    {typeInputs.map((input, index) => (
      <div key={index} className="flex space-x-2">
        <input
          type="text"
          value={input} // Bind the current value from state
          onChange={(e) => updateInput(index, e.target.value)} // Update state dynamically
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
        />
        {index > 0 && (
          <button
            type="button"
            onClick={() => removeInput(index, typeInputs, setTypeInputs)} // Remove input on click
            className="text-red-500 hover:text-red-700"
          >
            <i className="fas fa-minus-circle"></i>
          </button>
        )}
      </div>
    ))}
    {typeInputs.length < maxInputs && (
      <button
        type="button"
        onClick={() => addInput(typeInputs, setTypeInputs)} // Add new input on click
        className="mt-2 text-[#4a69bd] hover:text-[#364f9b] flex items-center"
      >
        <i className="fas fa-plus-circle mr-2"></i>
        Add Type
      </button>
    )}
  </div>


  {/* Dynamic Inputs for Pour qoui nos choisire */}
  <div className="space-y-4">
    <label className="block text-sm font-medium mb-2">Pourquoi nous choisir:</label>
    {pnch && pnch.map((input, index) => (
      <div key={index} className="flex space-x-2">
        <input
          type="text"
          value={input.porQouiNousChoisire} // Bind the current value from state
          onChange={(e) => updateInputPnc(index, e.target.value)} // Update state dynamically
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
        />
        {index > 0 && (
          <button
            type="button"
            onClick={() => removeInputPnc(index, pnch, setPnch)} // Remove input on click
            className="text-red-500 hover:text-red-700"
          >
            <i className="fas fa-minus-circle"></i>
          </button>
        )}
      </div>
    ))}
    {pnch.length < maxInputs && (
      <button
        type="button"
        onClick={() => addInputPnc(pnch, setPnch)} // Add new input on click
        className="mt-2 text-[#4a69bd] hover:text-[#364f9b] flex items-center"
      >
        <i className="fas fa-plus-circle mr-2"></i>
        Add pour qoui nos choisire
      </button>
    )}
  </div>

{/* faq */}
  <div className="space-y-4">
  <label className="block text-sm font-medium mb-2">Faq:</label>
      {faq.map((input, index) => (
        <div key={index} className="space-y-2">
          <div className="flex space-x-2">
            {/* Question Input */}
            <input
              type="text"
              value={input.questions}
              placeholder="Question"
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
              onChange={(e) => handleFaqChange(e, index, "questions")}
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeFaqInput(index)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            )}
          </div>

          {/* Response Input */}
          <textarea
            rows="4"
            value={input.reponse}
            placeholder="Réponse"
            className="w-full border rounded-2xl px-4 py-2 focus:outline-none focus:border-[#4a69bd]"
            onChange={(e) => handleFaqChange(e, index, "reponse")}
          ></textarea>
        </div>
      ))}

      {/* Add FAQ button */}
      {faq.length < maxInputs && (
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




   {/* Submit Button */}
              <div className="flex justify-center mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="px-12 py-2 bg-[#4a69bd] text-white rounded-full text-sm"
                >
                  Update
                </button>
              </div>
</form>



            </div>
          </div>
        </div>
      </div>
    )
}
