// import React from 'react'
import { useEffect, useState } from 'react'
import img5 from './image/img5.webp'
import axios from 'axios';
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [users,Setusers] = useState([]);
    const [email,SetEmail] = useState();
    const [password,SetPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/users',
            headers: { }
          };

          axios.request(config)
          .then((response) => {
            Setusers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

    },[]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMessage("");
        const foundUser = users.find((u) => u.email === email);
        console.log(foundUser);
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (foundUser && isPasswordValid) {
                switch (foundUser.role) {
                    case "Admin":
                    //   console.log("Redirecting to Admin dashboard...");
                    navigate('/AdminDashboard' , {state : foundUser});
                      break;
                    case "prestataire":
                    //   console.log("Redirecting to Prestataire dashboard...");
                    navigate('/PrestataireDashboard',{state : foundUser});
                      break;
                    case "Client":
                    //   console.log("Redirecting to Client dashboard...");
                    navigate('/ClientDashboard',{state : foundUser});
                      break;
                    default:
                      setErrorMessage("Rôle utilisateur non reconnu.");
        }
        } else {
            setErrorMessage("Email or password doesn't match to our database.");
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

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-5 h-5" />
            <span className="text-gray-700">Continue avec Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Vous n &rsquo; avez pas un compte ?
            <a href="signin.html" className="text-[#4052B4] hover:underline">S &rsquo;      inscrire</a>
          </p>
        </form>
      </div>
    </div>
  </div>
  )
}
