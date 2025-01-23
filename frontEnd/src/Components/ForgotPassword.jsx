import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('https://back.koulchinet.com/api/forgot-password', { email });
      setSuccess('Vérifiez votre email pour changer votre mot de passe.');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("L'email n'existe pas dans notre système.");
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="w-30 text-center mt-6">
        <h1 className="text-3xl font-bold text-blue-400">KoulchiNet</h1>
      </div>

      {/* Form Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Mot de Passe Oublié
          </h2>
          {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-sm text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Adresse Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Réinitialiser le Mot de Passe
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Vous vous souvenez de votre mot de passe ?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Connexion
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
