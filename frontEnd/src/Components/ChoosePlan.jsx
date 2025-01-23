import react, { useState } from "react";
import { useLocation, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

export default function ChoosePlan() {
  const location = useLocation();
  const navigate = useNavigate();
  const planData = location.state;
  const user = JSON.parse(localStorage.getItem('user'));


  console.log('Received plan data:', planData); // Debug log

  const [paymentMethod, setPaymentMethod] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState();
  // Redirect if no plan data is present
  if (!planData) {
    return <Navigate to="/PrestataireDashboard/Plans" replace />;
  };

  const planCredits = planData.planCredits; // Example: "100 crédits"
const number = parseInt(planCredits.split(' ')[0], 10);


  const planPrice = planData.planPrice;
  const price = parseInt(planPrice.split(' ')[0], 10);




  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setIsButtonDisabled(method === 'creditCard');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  console.log(selectedFile);

  const handleBack = () => {
    navigate('/PrestataireDashboard/Plans');
  };
  const handlsubmit = () => {
    const data = new FormData();
    data.append('idPres', user.id);
    data.append('nbOffres', number);
    data.append('NomOffre', planData.planName);
    data.append('prix', price);
    data.append('file', selectedFile);

    axios.post('https://back.koulchinet.com/api/store-paiment', data)
      .then((response) => {
        // Extracting message from the response
        if (response.data && response.data.message) {
          setMessage(response.data.message);
          setSelectedFile(null); // Reset file input
        } else {
          setMessage("Paiement enregistré avec succès !");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du paiement:", error);
        setMessage("Une erreur est survenue, veuillez réessayer.");
      });
  };


  return (
    <div className="bg-gray-100 font-sans min-h-screen flex justify-center items-center">
      <div className="max-w-2xl mx-auto w-full mt-10 p-8 bg-white shadow-md rounded-md min-h-[600px] relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/PrestataireDashboard/Plans')}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour
        </button>

        {/* Offer Summary */}
        <div className="mb-6 mt-8">
        {message && (
            <p className="text-green-600 font-semibold mt-4">{message}</p>
        )}

          <h2 className="text-xl font-semibold mb-4">Résumé de l'offre</h2>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold">{planData.planName}</h3>
              <p className="text-gray-600">{planData.planCredits}</p>
              <p className="text-gray-600">{planData.planPrice} / {planData.planDuration}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-900 font-bold">Total</p>
              <p className="text-gray-900 font-semibold">{planData.planPrice}</p>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Méthode de paiement</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                checked={paymentMethod === 'bankTransfer'}
                onChange={() => handlePaymentMethodChange('bankTransfer')}
                className="mr-2"
              />
              Virement bancaire
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => handlePaymentMethodChange('creditCard')}
                className="mr-2"
              />
              Carte de crédit
            </label>
          </div>
        </div>

        {/* Credit Card Information */}
        {paymentMethod === 'creditCard' && (
          <div id="creditCardDetails" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Paiement par carte de crédit</h3>
            <p>Ce méthode de paiement n'est pas disponible pour le moment</p>
          </div>
        )}

        {/* Bank Transfer Information */}
        {paymentMethod === 'bankTransfer' && (
          <div id="bankTransferDetails" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Paiement par virement bancaire</h3>
            <p>Veuillez transférer le montant total à l'aide des informations suivantes :</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Nom de la banque : Cih Bank</li>
              <li>RIB : 230825393696221101590192</li>
              <li>I-BAN : MA642308253936966221101590192</li>
              <li>SWIFT : CIHMMAMC</li>
            </ul>
          </div>
        )}

        {/* File Upload Button */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Importer votre reçu de paiement
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-700 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#2980b9]">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span className="mt-2 text-base">Cliquez pour sélectionner un fichier</span>
              <span className="text-sm text-gray-500 mt-1">ou glissez et déposez</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
            <form>
                 <button
            type="button"
            onClick={handlsubmit}
            disabled={isButtonDisabled}
            className={`w-full py-3 text-lg rounded-lg text-white font-semibold ${
              isButtonDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2980b9] hover:bg-[#416ad8]'
            }`}
          >
            Envoyer le reçu
          </button>
            </form>

        </div>
      </div>
    </div>
  );
}
