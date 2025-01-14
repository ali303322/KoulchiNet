// import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Accès Refusé</h1>
        <p className="text-gray-700 text-lg mb-6">
          Vous n'êtes pas autorisé à accéder à cette page.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-200"
        >
          Retour à la Connexion
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
