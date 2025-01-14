import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
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
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword)); // Met à jour la force
    };

    const handleSubmit = async (e) => {

        if (!password) {
            setError("Le mot de passe est requis.");
        } else if (!/^[A-Z]/.test(password)) {
            setError("Le mot de passe doit commencer par une lettre majuscule.");
        } else if (!/\d/.test(password)) {
            setError("Le mot de passe doit contenir au moins un chiffre.");
        } else if (password !== passwordConfirmation) {
            setError("La confirmation du mot de passe est incorrecte.");
        } else {
            setError(""); // Pas d'erreur, le mot de passe est valide
        }


        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/reset-password", {
                token,
                password,
                password_confirmation: passwordConfirmation,
            });
            setMessage(response.data.message);
            setError("");
        } catch (err) {
            console.log(err);

            setError(err.response?.data?.error || "Une erreur est survenue.");
            setMessage("");
        }
    };

    if (!token) {
        return <p>Token invalide ou manquant.</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Réinitialisation du mot de passe
            </h1>
            {message && <p className="text-green-600 text-center mb-4">{message}</p>}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                  {/* Password Strength Bar */}
                  <div className="mb-4 rounded">
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
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Réinitialiser
                </button>
            </form>
        </div>
    </div>
    );
};

export default ChangePassword;
