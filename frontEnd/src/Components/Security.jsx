import { useEffect, useState } from "react";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [prestataire, setPrestataire] = useState(null);
    const [strength, setStrength] = useState(0);
    const {t} = useTranslation();

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
          setNewPassword(newPassword);
          setStrength(calculateStrength(newPassword)); // Met à jour la force
      };

  // Fetch Prestataire
  const checkIfPrestataireExistsAndAproved = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/checkIfPrestataireExists",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.approved) {
        setPrestataire(response.data.Prestataire);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkIfPrestataireExistsAndAproved();
  }, []);

  const handleChangePassword = (e) => {

    if (!newPassword) {
        setError("Le mot de passe est requis.");
    } else if (!/^[A-Z]/.test(newPassword)) {
        setError("Le mot de passe doit commencer par une lettre majuscule.");
    } else if (!/\d/.test(newPassword)) {
        setError("Le mot de passe doit contenir au moins un chiffre.");
    } else if (newPassword !== confirmPassword) {
        setError("La confirmation du mot de passe est incorrecte.");
    } else {
        setError(""); // Pas d'erreur, le mot de passe est valide
    }

    e.preventDefault();

    if (!prestataire || !prestataire.id) {
      setError("Impossible de récupérer les informations du prestataire.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Le nouveau mot de passe et la confirmation doivent correspondre.");
      setMessage("");
      return;
    }

    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      setMessage("");
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/prestataire/${prestataire.id}/change-password`,
        {
          password_actuel: currentPassword,
          password_nouveau: newPassword,
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setError("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setStrength(0);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error || err.response.data.message);
        } else {
          setError("Une erreur s'est produite. Veuillez réessayer.");
        }
        setMessage("");
      });
  };

  return (
    <div className="bg-gray-100 font-sans">
      <HeaderPres />

      {/* Main Content */}
      <div className="flex min-h-screen">
        <SideBarPres />

        {/* Main Content Area */}
        <div className="flex-1 p-8">
      <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
        <div className="flex items-center text-[#4a69bd] mb-8">
          <i className="fas fa-lock mr-3"></i>
          <h2 className="text-xl font-medium">{t("presDash.passwordChange.changePassword")}</h2>
        </div>
        <form className="space-y-6" onSubmit={handleChangePassword}>
          <div>
            <label className="block text-gray-700 mb-2">{t("presDash.passwordChange.currentPassword")}:</label>
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              placeholder={t("presDash.passwordChange.enterCurrentPassword")}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">{t("presDash.passwordChange.newPassword")}:</label>
            <input
              value={newPassword}
              onChange={handlePasswordChange}
              type="password"
              placeholder={t("presDash.passwordChange.enterNewPassword")}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
            />
          </div>
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
                ? t("presDash.passwordChange.passwordStrength.veryWeak")
                : strength === 2
                ? t("presDash.passwordChange.passwordStrength.weak")
                : strength === 3
                ? t("presDash.passwordChange.passwordStrength.medium")
                : t("presDash.passwordChange.passwordStrength.strong")}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">{t("presDash.passwordChange.confirmNewPassword")}:</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder={t("presDash.passwordChange.retypeNewPassword")}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {message && <div className="text-green-500">{message}</div>}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-[#4a69bd] text-white px-12 py-2 rounded-full hover:bg-[#3d5aa7] font-medium"
            >
              {t("presDash.passwordChange.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
  );
}
