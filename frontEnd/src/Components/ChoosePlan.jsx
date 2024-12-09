// import React, { useState } from 'react';

import { useState } from "react";

export default function ChoosePlan() {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex justify-center items-center">
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-md">
        {/* Offer Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Résumé de l &rsquo; offre</h2>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold">Plan Premium</h3>
              <p className="text-gray-600">MAD 99.00 / mois</p>
            </div>
            <div className="text-right">
              <p className="text-gray-900 font-bold">Total</p>
              <p className="text-gray-900 font-semibold">MAD 99.00</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Vous autorisez notre service à vous facturer automatiquement chaque mois jusqu &rsquo; à ce que vous annuliez votre abonnement. Note : Le prix indiqué inclut 20% de TVA.
          </p>
        </div>

        {/* Payment Method Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Méthode de paiement</h2>
          <div className="space-y-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                className="mr-4"
                onChange={() => setPaymentMethod('creditCard')}
              />
              <span className="text-gray-700">Carte de crédit ou de débit</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                className="mr-4"
                onChange={() => setPaymentMethod('bankTransfer')}
              />
              <span className="text-gray-700">Virement bancaire</span>
            </label>
          </div>
        </div>

        {/* Credit Card Information */}
        {paymentMethod === 'creditCard' && (
          <div id="creditCardDetails" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Paiement par carte de crédit</h3>
            <p>ce methode de Paiement n&rsquo;est pas diponible ce moment </p>
          </div>
        )}

        {/* Bank Transfer Information */}
        {paymentMethod === 'bankTransfer' && (
          <div id="bankTransferDetails" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Paiement par virement bancaire</h3>
            <p>Veuillez transférer le montant total à l &rsquo; aide des informations suivantes :</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Nom de la banque : Exemple Banque</li>
              <li>IBAN : FR76 1234 5678 9101 1121 3141</li>
              <li>Code BIC : EXAMPLFR</li>
            </ul>
            <p className="mt-4">Une fois le paiement effectué, envoyez-nous le reçu via WhatsApp :</p>
            <a
              href="https://wa.me/0687568388"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-600 underline"
            >
              Envoyer le reçu via WhatsApp
            </a>
          </div>
        )}

        {/* Confirmation Button */}
        <div className="mt-6">
          <button className="w-full py-3 bg-[#2980b9] text-white font-semibold text-lg rounded-lg hover:bg-[#416ad8]">
            Envoyer le code PIN
          </button>
        </div>
      </div>
    </div>
  );
}
