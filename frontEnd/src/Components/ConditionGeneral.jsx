// import React from 'react'

import { Link } from "react-router-dom";

export default function ConditionGeneral() {

    const handleScrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <div className="bg-gray-100 text-gray-800">
    <header className="bg-white shadow-md py-6 mb-8">
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-blue-600 text-center">CONTRAT D'UTILISATION ET PLITIQUE DE
CONFIDENTIALITE DU SITE WEB : (Koulchinet.com)
</h1>
            <p className="text-sm text-gray-500 text-center mt-2">Date de dernière mise à jour : 22 Novembre 2024</p>
        </div>
    </header>

    <main className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">1. Rôle de la Plateforme</h2>
                <p className="mb-4">La Plateforme est un simple intermédiaire de mise en relation entre des clients (ci-après
"Clients") et des prestataires de services (ci-après "Prestataires"). Nous facilitons la
communication entre ces deux parties et ne sommes en aucun cas partie au contrat de service
qui pourrait être conclu entre un Client et un Prestataire.</p>

                <p className="mb-4 ">Nous ne sommes pas responsables de la qualité, de l'exécution, de la légalité ou de la
sécurité des services fournis par les Prestataires.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">2. Acceptation du Contrat et Modifications</h2>
                <p className="mb-4">
                En utilisant la Plateforme, vous confirmez que vous avez l'âge légal pour conclure un contrat
dans votre pays de résidence. Vous reconnaissez avoir lu, compris et accepté toutes les
conditions de ce Contrat. Nous pouvons modifier ce Contrat à tout moment. Nous vous
informerons de toute modification importante par le biais de la Plateforme ou par e-mail.
Votre utilisation continue de la Plateforme après l'entrée en vigueur de ces modifications
signifie que vous acceptez les nouvelles conditions. Il est de votre responsabilité de consulter
régulièrement ce Contrat.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">3. Responsabilités et Obligations des Utilisateurs</h2>
                <h3 className="text-lg font-semibold text-black-600 mb-4">3.1. Généralités :</h3>
                <ul className="list-disc pl-5 mb-4">
                    <li>Vous êtes responsable de l'exactitude des informations que vous fournissez sur la Plateforme.</li>
                    <li>Vous vous engagez à utiliser la Plateforme conformément à ce Contrat et aux lois applicables.</li>
                    <li>Vous êtes responsable de la sécurité de votre compte et de votre mot de passe.</li>
                </ul>

                <h3 className="text-lg font-semibold text-black-600 mb-4">3.2. Obligations des Clients :</h3>
                <ul className="list-disc pl-5 mb-4">
                    <li>Vous vous engagez à fournir des informations précises et complètes sur vos besoins.</li>
                    <li>Vous êtes responsable du paiement des services que vous réservez via la Plateforme.</li>
                    <li>Vous êtes responsable de vérifier les qualifications et références des Prestataires.</li>
                    <li>Vous vous engagez à respecter les conditions de service convenues avec le Prestataire.</li>
                </ul>

                <h3 className="text-lg font-semibold text-black-600 mb-4">3.3. Obligations des Prestataires :</h3>
                <ul className="list-disc pl-5 mb-4">
                    <li>Vous vous engagez à fournir des informations exactes sur vos qualifications et vos services.</li>
                    <li>Vous êtes responsable de la qualité et de l'exécution des services que vous offrez.</li>
                    <li>Vous êtes responsable de respecter les lois et réglementations applicables à votre activité.</li>
                    <li>Vous vous engagez à répondre aux demandes des Clients dans un délai raisonnable.</li>
                    <li>Vous vous engagez à respecter les conditions de service convenues avec le Client.</li>
                    <li>Vous êtes responsable de la facturation et de la collecte des paiements conformément aux lois et réglementations applicables.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">4. Processus de Paiement</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>La Plateforme peut faciliter les paiements entre Clients et Prestataires.</li>
                    <li>Les prix des services sont fixés par les Prestataires.</li>
                    <li>Des frais de service peuvent être facturés par la Plateforme.</li>
                    <li>Les conditions d'annulation et de remboursement sont définies par le Prestataire et détaillées dans le contrat avec lui.</li>
                    <li>Nous utilisons des fournisseurs de services de paiement tiers sécurisés.</li>
                    <li>Vous êtes responsable des informations bancaires que vous fournissez.</li>
                    <li>Les paiements peuvent être effectués par [Moyens de paiement acceptés].</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">5. Services Récurrents et Abonnements</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>Certains services peuvent être proposés sous forme d'abonnement.</li>
                    <li>Les abonnements seront renouvelés automatiquement à la fin de chaque période, sauf si vous les annulez avant la date de renouvellement.</li>
                    <li>Vous pouvez annuler votre abonnement à tout moment, selon les modalités spécifiques du service.</li>
                    <li>Les détails de votre abonnement seront disponibles sur votre compte.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">6. Garantie Limitée de la Plateforme</h2>
                <p className="mb-4">LA PLATEFORME EST FOURNIE "TELLE QUELLE" ET "SELON DISPONIBILITÉ". NOUS NE GARANTISSONS PAS QUE LA PLATEFORME SERA EXEMPTE D'ERREURS, ININTERROMPUE OU SÉCURISÉE. NOUS N'OFFRONS AUCUNE GARANTIE DE QUALITÉ, DE FIABILITÉ OU D'ADÉQUATION DES SERVICES FOURNIS PAR LES PRESTATAIRES. NOUS DÉCLINONS EXPRESSÉMENT TOUTE GARANTIE IMPLICITE, Y COMPRIS, MAIS SANS S'Y LIMITER, LES GARANTIES DE QUALITÉ MARCHANDE ET D'ADÉQUATION À UN USAGE PARTICULIER.</p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">7. Politique d'Annulation et de Report
                </h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>Les conditions d'annulation et de report sont définies et discutées avec le Prestataire.</li>
                    <li>Vous devez contacter directement le Prestataire pour toute annulation ou report.</li>
                    <li>Nous ne sommes pas responsables des litiges liés à l'annulation ou au report.</li>
                </ul>

            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">8. Limitation de Responsabilité</h2>
                <p className="mb-4">DANS TOUTE LA MESURE PERMISE PAR LA LOI APPLICABLE, NOUS NE SERONS
PAS RESPONSABLES DES DOMMAGES DIRECTS, INDIRECTS, ACCESSOIRES,
SPÉCIAUX, CONSÉCUTIFS OU PUNITIFS DÉCOULANT DE VOTRE UTILISATION
OU DE VOTRE INCAPACITÉ À UTILISER LA PLATEFORME, OU DE TOUTE
INTERACTION AVEC LES PRESTATAIRES. </p>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">9. Résolution des Litiges</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>Tout litige entre un Client et un Prestataire doit être résolu directement entre eux.</li>
                    <li>Tout litige entre un utilisateur et la Plateforme sera soumis à un arbitrage exécutoire en vertu du règlement d'arbitrage dans le contexte de droit Marocain.</li>
                    <li>Vous renoncez à votre droit de participer à un recours collectif contre la Plateforme.</li>
                </ul>

            </section>
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">10. Collecte et Traitement des Données Personnelles</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>Nous collectons et traitons vos données personnelles conformément à notre Politique
                    de Confidentialité, disponible ici : <Link to='/PolitiqueEtConfidentialité'> Politique de Confidentialité .</Link> </li>
                    <li>En utilisant la Plateforme, vous consentez à notre Politique de Confidentialité.</li>
                </ul>

            </section>
            <section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">11. Règles de Conduite</h2>
    <ul className="list-disc pl-5 mb-4">
        <li>Vous vous engagez à ne pas utiliser la Plateforme à des fins illégales ou nuisibles.</li>
        <li>Vous vous engagez à ne pas harceler, menacer ou insulter les autres utilisateurs.</li>
        <li>Vous vous engagez à ne pas publier de contenu inapproprié, illégal ou diffamatoire.</li>
        <li>Nous nous réservons le droit de suspendre ou de supprimer votre compte en cas de violation de ces règles.</li>
    </ul>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">12. Résiliation du Contrat</h2>
    <ul className="list-disc pl-5 mb-4">
        <li>Vous pouvez résilier ce Contrat à tout moment en cessant d'utiliser la Plateforme.</li>
        <li>Nous pouvons résilier ce Contrat à tout moment, avec ou sans motif, avec un préavis raisonnable.</li>
        <li>En cas de résiliation, vous n'aurez plus accès à votre compte.</li>
    </ul>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">13. Modifications du Contrat</h2>
    <p className="mb-4">
        Nous nous réservons le droit de modifier ce Contrat à tout moment. Les modifications seront publiées sur la Plateforme et seront effectives dès leur publication. Votre utilisation continue de la Plateforme après la publication des modifications constitue votre acceptation de ces modifications.
    </p>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">14. Propriété Intellectuelle</h2>
    <ul className="list-disc pl-5 mb-4">
        <li>La Plateforme et son contenu (textes, images, logos, etc.) sont protégés par les lois sur la propriété intellectuelle.</li>
        <li>Vous vous engagez à ne pas copier, reproduire ou diffuser le contenu de la Plateforme sans notre autorisation.</li>
        <li>Vous conservez la propriété intellectuelle des contenus que vous soumettez sur la Plateforme, mais vous nous accordez une licence mondiale non exclusive pour utiliser ce contenu.</li>
    </ul>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">15. Marketplace</h2>
    <ul className="list-disc pl-5 mb-4">
        <li>La Plateforme contient un Marketplace où nous offrons à la vente des articles de tierces parties.</li>
        <li>Nous agissons uniquement en tant qu'affiliés dans ce Marketplace. Nous ne sommes pas responsables de la qualité, de la sécurité ou de la livraison des articles.</li>
        <li>Les achats sur le Marketplace sont régis par les conditions générales des vendeurs concernés.</li>
        <li>Nous ne sommes pas responsables des litiges liés à l'achat d'articles sur le Marketplace.</li>
    </ul>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">16. Applications Mobiles</h2>
    <p className="mb-4">
        Si vous utilisez nos applications mobiles, ce Contrat s'applique également. Veuillez noter que l'utilisation de nos applications peut également être soumise aux conditions générales de Google Play ou de l'App Store.
    </p>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">17. Informations de Contact</h2>
    <p className="mb-4">
        Pour toute question ou réclamation, vous pouvez nous contacter à l'adresse e-mail suivante :
        <a href="mailto:Contact@koulchinet.com" className="text-blue-600 underline">Contact@koulchinet.com</a>.
    </p>
</section>

<section className="mb-8">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">18. Droit applicable</h2>
    <p className="mb-4">
        Ce Contrat est régi et interprété conformément aux lois de Royaume du Maroc.
        En utilisant la Plateforme, vous reconnaissez avoir lu, compris et accepté tous les termes et conditions de ce Contrat.
    </p>
</section>

        </div>




    </main>

    <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md opacity-0 transition-opacity duration-300 hover:opacity-100"
        onClick={handleScrollToTop}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
    </button>
</div>
  );
}
