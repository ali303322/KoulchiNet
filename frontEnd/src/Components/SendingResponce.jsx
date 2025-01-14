import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SendingResponce() {
    const [submissionDate, setSubmissionDate] = useState("");



    let dataComes = sessionStorage.getItem('formData');
    dataComes = JSON.parse(dataComes);
    console.log(dataComes);



    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    let userId = user.id
    console.log(userId);




    const files = JSON.parse(sessionStorage.getItem('uploadedFiles'));
    console.log(files);


    let idpres = sessionStorage.getItem('idPres');






    useEffect(() => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        const currentDate = new Date().toLocaleDateString("fr-FR", options);
        setSubmissionDate(currentDate);



        const sendData = async () => {
            try {
              let requestData;
              if (dataComes) {
                // Ensure all integer fields are properly cast to integers
                requestData = {
                  client_id: user.id,
                  prestataire_id: idpres,
                  typeService: dataComes[0].SousService ? dataComes[0].SousService : null, // Convert to integer
                  Service: dataComes[0].service ? dataComes[0].service : null, // Convert to integer
                  niveauDurgence: dataComes[0].niveauDurgence,  // This field might also need validation or conversion
                  description: dataComes[0].descriptioProb,
                  date: dataComes[0].date,
                  time: dataComes[0].hour,
                  images: files,
                };



                console.log("Données envoyées:", requestData);
              }

            //   console.log("Données envoyées:", requestData);

              const response = await axios.post(
                "http://localhost:8000/api/createhistory", // URL
                requestData, // Payload
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  withCredentials: true, // Remove if not required
                }
              );

              alert("Demande envoyée avec succès:");
              sessionStorage.clear();
              
            } catch (error) {
              if (error.response) {
                console.error("Erreur réponse serveur:", error.response.data);
                console.error("Statut HTTP:", error.response.status);
              } else if (error.request) {
                console.error("Aucune réponse reçue:", error.request);
              } else {
                console.error("Erreur configuration requête:", error.message);
              }
              alert("Une erreur est survenue lors de l'envoi de la demande.");
            }
          };



          sendData(); // Call the function
      }, []);

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        {/* Success Icon */}
        <svg
          className="w-16 h-16 mx-auto text-green-500 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>

        {/* Success Message */}
        <h2 className="text-2xl font-semibold text-green-500 my-4">
          Votre demande a été envoyée avec succès
        </h2>

        {/* Details */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-left">
          <DetailItem label="Date de soumission" value={submissionDate} />

          {/* Check if data.users exists and is non-empty */}
          {dataComes && (
            <>
              <DetailItem label="Message destination" value={`${user.nom} ${user.prenom}`} />
              <DetailItem label="Type de demande" value={dataComes[0].SousService} />
              <DetailItem label="niveau Durgence" value={dataComes[0].niveauDurgence} />
              <DetailItem label="description" value={dataComes[0].descriptioProb} />
              <DetailItem label="Images" value={
              <div className="flex flex-wrap gap-4">
                {files > 0 ? (
                  files.map((image, index) => (
                    <img
                      key={index}
                      src={`http://127.0.0.1:8000/${image}`}
                      alt={`Image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />

                ))
            ) : (
              <p className="text-gray-500">Aucune image disponible</p>
            )}
            </div>
            }
          />
            </>
          )}

          <DetailItem label="Délai estimé" value="48 heures" />
        </div>
      </div>
    </div>
    </>
  )
};

const DetailItem = ({ label, value }) => {
    return (
      <div className="flex items-center mb-2 p-2 bg-gray-100 rounded">
        <span className="font-semibold text-gray-600 w-40">{label}:</span>
        <span className="text-gray-700 flex-1">{value}</span>
      </div>
    );
};
