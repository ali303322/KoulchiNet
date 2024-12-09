import { useState } from 'react'

export default function DemandeService() {
    const [selectedUrgency, setSelectedUrgency] = useState(null);
    const [files, setFiles] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const handleUrgencyClick = (urgency) => {
      setSelectedUrgency(urgency);
    };

    const handleFileUpload = (event) => {
      const uploadedFiles = Array.from(event.target.files);
      setFiles([...files, ...uploadedFiles]);
    };

    const handleFileRemove = (index) => {
      setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedUrgency) {
        alert("Veuillez sélectionner un niveau d'urgence");
        return;
      }
      alert('Votre demande a été envoyée avec succès !');
    };

    return (
      <div className="bg-white-100 min-h-screen flex flex-col items-center py-8">

        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-blue-800 mb-4 border-b-2 border-orange-400 pb-2">
              Détails de votre demande
            </h2>

            <div className="mb-4">
              <label className="block text-blue-800 font-bold mb-2">
                Catégorie de service *
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="plumbing">Plomberie</option>
                <option value="electricity">Électricité</option>
                <option value="carpentry">Menuiserie</option>
                <option value="painting">Peinture</option>
                <option value="cleaning">Nettoyage</option>
              </select>
            </div>

            <h3 className="text-lg font-bold text-blue-800 mb-4">Niveau d&rsquo;urgence</h3>
            <div className="flex space-x-4 mb-6">
              {['Normal', 'Urgent', 'Immédiat'].map((urgency, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center border rounded-lg p-4 cursor-pointer transition ${
                    selectedUrgency === urgency
                      ? 'border-blue-800 bg-blue-100'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleUrgencyClick(urgency)}
                >
                  <i
                    className={`fas ${
                      urgency === 'Normal'
                        ? 'fa-clock'
                        : urgency === 'Urgent'
                        ? 'fa-running'
                        : 'fa-exclamation-circle'
                    } text-blue-800 text-2xl mb-2`}
                  ></i>
                  <div>{urgency}</div>
                  <small className="text-gray-500">
                    {urgency === 'Normal'
                      ? 'Sous 48h'
                      : urgency === 'Urgent'
                      ? 'Sous 24h'
                      : 'Dans les 2h'}
                  </small>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-blue-800 font-bold mb-2">
                Description détaillée du besoin *
              </label>
              <textarea
                required
                placeholder="Décrivez votre besoin en détail..."
                className="w-full border border-gray-300 rounded p-2"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-blue-800 font-bold mb-2">
                Date souhaitée *
              </label>
              <input
                type="date"
                required
                min={today}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-blue-800 font-bold mb-2">
                Heure souhaitée *
              </label>
              <input
                type="time"
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center mb-4">
              <i className="fas fa-cloud-upload-alt text-blue-800 text-2xl mb-2"></i>
              <p>Glissez vos fichiers ici ou cliquez pour sélectionner</p>
              <small>(Photos, documents, plans...)</small>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-gray-100 p-2 rounded"
                >
                  <i className="fas fa-file text-blue-800"></i>
                  <span>{file.name}</span>
                  <i
                    className="fas fa-times text-red-500 cursor-pointer"
                    onClick={() => handleFileRemove(index)}
                  ></i>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded mt-6 hover:bg-blue-700"
            >
              Envoyer la demande
            </button>
          </form>
        </div>
      </div>
    );
}
