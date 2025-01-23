// import React from 'react'
import { useState } from 'react'
import img5 from './image/img5.webp'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login() {

    const [email,SetEmail] = useState();
    const [password,SetPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const navigate = useNavigate();

    const handleCaptchaChange = (value) => {
        if (value) {
          setCaptchaVerified(true);
          }
      };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMessage("");

        if (!captchaVerified) {
            setErrorMessage(true);
             alert("Veuillez vérifier le captcha..");
             return;
        }

        try {
            const response = await axios.post('https://back.koulchinet.com/api/login', {
              email: email,
              password: password,
            });

            console.log('Login Successful:', response.data);

            // Store the token and user role (optional)
            const { token, role, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user', JSON.stringify(user));

            const tempData = sessionStorage.getItem('formData');

            if (tempData) {
                navigate("/sendingResponce", { state: tempData });
                sessionStorage.removeItem('tempData');
            } else if (role === "admin") {
                navigate("/AdminDashboard");
            } else if (role === "prestataire") {
                navigate("/PrestataireDashboard");
            } else if (role === "client") {
                navigate("/ClientDashboard");
            }
          } catch (error) {
            if (error.response) {
              console.error('Error:', error.response.data.error);
              alert(error.response.data.error || 'Login failed');
            } else {
              console.error('Network Error:', error.message);
              alert('Network error, please try again.');
            }
          }
  };


  return (
    <div className="min-h-screen flex">
    {/* Left Side - Image */}
    <div className="w-1/2">
      <img src={img5} alt="Handshake" className="w-full h-screen object-cover rounded-r-3xl" />
    </div>

    {/* Right Side - Form */}
    <div className="w-1/2 flex items-center justify-center">
      <div className="w-[450px] px-8">
        <h1 className="text-[#4a69bd] text-4xl font-bold mb-12 text-center">Se connecter</h1>

        <form className="space-y-6" onSubmit={handleSubmit} method='post'>
        {errorMessage && (
            <div className="text-red-600 bg-red-100 border border-red-400 p-3 rounded-md text-center font-bold">
                {errorMessage}
            </div>
        )}
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Saisissez votre e-mail"
              onChange={(e)=>SetEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#4052B4] text-gray-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              onChange={(e)=>SetPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#4052B4] text-gray-500"
              required
            />
          </div>
        <ReCAPTCHA
            sitekey="6LcDFrsqAAAAAEW4toQSAg9BT1NR4UNI6aYLYNmA" // replace with your site key from Google
            onChange={handleCaptchaChange}
        />
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#4052B4] text-xl text-white py-4 rounded-full hover:bg-[#364397] transition-colors font-bold"
          >
            Se connecter
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="absolute bg-white px-4 text-gray-500">ou</span>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Vous n&rsquo;avez pas un compte ?
            <Link to="/InscriptionClient" className="text-[#4052B4] hover:underline">S&rsquo;inscrire</Link>
          </p>
          <p className="text-center text-gray-600 mt-6">
            <Link to="/MotDePasseOublier" className="text-[#4052B4] hover:underline">Mot de passe oublié ?</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  )
}
