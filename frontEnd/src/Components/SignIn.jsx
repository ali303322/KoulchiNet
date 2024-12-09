// import React from 'react'
import img5 from './image/img5.webp'
export default function SignIn() {
  return (
    <>
    <div className="min-h-screen flex">
    {/* Left Side - Image */}
    <div className="w-1/2">
      <img src={img5} alt="Handshake" className="w-full h-screen object-cover rounded-r-3xl" />
    </div>

    {/* Right Side - Form */}
    <div className="w-1/2 flex items-center justify-center">
      <div className="w-[450px] px-8">
        <h1 className="text-[#4a69bd] text-4xl font-bold mb-12 text-center">Inscrivez-vous</h1>

        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Saisissez votre e-mail"
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#4052B4] text-gray-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#4052B4] text-gray-500"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-[#4052B4] border-gray-300 rounded focus:ring-[#4052B4]"
            />
            <label htmlFor="terms" className="ml-2 text-gray-600">
              J&rsquo;accepte les <a href="#" className="text-[#4052B4] hover:underline">conditions générales</a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#4052B4] text-xl text-white py-4 rounded-full hover:bg-[#364397] transition-colors font-bold"
          >
            S&rsquo;inscrire
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
            Vous avez déjà un compte ?
            <a href="login.html" className="text-[#4052B4] hover:underline">Se connecter</a>
          </p>
        </form>
      </div>
    </div>
  </div>
  </>
  )
}
