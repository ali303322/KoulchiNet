import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TransactionDetails() {
  const [data, setdata] = useState({
    history: {},
    clientName: "",
    prestataireName: "",
    images: [],
  });

  const { id } = useParams();

  const getHistorys = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/history/" + id);
      setdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHistorys();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        {/* Success Message */}
        <h2 className="text-2xl font-semibold text-blue-500 my-4">Details</h2>

        <div className="mt-6 border-t border-gray-200 pt-4 text-left">
          <DetailItem
            label="Date de soumission"
            value={data.history.date_sent}
          />
          <DetailItem
            label="Nom de Client"
            value={data.clientName + " " + data.ClientPrenom}
          />
          <DetailItem
            label="Nom de Prestataire"
            value={data.PrestataireName + " " + data.PrestatairePrenom}
          />
          <DetailItem label="Service" value={data.history.service_name} />
          <DetailItem label="Type de Service" value={data.history.type_service} />
          <DetailItem
            label="Niveau d'Urgence"
            value={data.history.niveauDurgence}
          />
          <DetailItem label="Description" value={data.history.description} />

          {/* Images */}
          <DetailItem
            label="Images"
            value={
              <div className="flex flex-wrap gap-4">
                {data.images && data.images.length > 0 ? (
                  data.images.map((image, index) => (
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
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value }) => {
  return (
    <div className="flex items-center mb-2 p-2 bg-gray-100 rounded">
      <span className="font-semibold text-gray-600 w-40">{label}:</span>
      <span className="text-gray-700 flex-1">{value}</span>
    </div>
  );
};
