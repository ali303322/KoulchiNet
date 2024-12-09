// import React from 'react'
import Header from './Header'
import Footer from './Footer'
import img4 from './image/img4.jpeg'
export default function DevenirPrestataire() {
  return (
    <div className='bg-gray-100 font-sans'>
        <Header/>
        <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${img4})` }}
        >
        {/* Dark overlay with more opacity to match image */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-5xl font-bold mb-4">
            Devenez prestataire sur Koulchinet
            </h1>
            <p className="text-white text-xl mb-8">
            Rejoignez notre communauté d&rsquo;experts et développez votre activité
            </p>
            <a
            href="#"
            className="bg-[#ed8936] hover:bg-[#f6ad55] text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
            Commencer maintenant
            </a>
        </div>
        </section>

        <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Pourquoi nous rejoindre ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Développez votre activité Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                    <svg className="w-12 h-12 text-[#4299e1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" />
                    </svg>
                </div>
                <h3 className="text-[#4a69bd] font-bold text-xl mb-2">Développez votre activité</h3>
                <p className="text-sm text-gray-600">
                    Accédez à une clientèle qualifiée et augmentez vos revenus
                </p>
                </div>
            </div>

            {/* Flexibilité totale Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                    <svg className="w-12 h-12 text-[#4299e1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z" />
                    </svg>
                </div>
                <h3 className="text-[#4a69bd] font-bold text-xl mb-2">Flexibilité totale</h3>
                <p className="text-sm text-gray-600">
                    Gérez votre emploi du temps en toute liberté
                </p>
                </div>
            </div>

            {/* Support dédié Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                    <svg className="w-12 h-12 text-[#4299e1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
                    </svg>
                </div>
                <h3 className="text-[#4a69bd] font-bold text-xl mb-2">Support dédié</h3>
                <p className="text-sm text-gray-600">
                    Bénéficiez d&rsquo;un accompagnement personnalisé pour réussir
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-black mb-12">Comment ça marche ?</h2>

            <div className="max-w-3xl space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                1
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">Inscrivez-vous gratuitement</h3>
                <p className="text-gray-600 text-sm">
                    Créez votre profil professionnel en quelques minutes et présentez vos services
                </p>
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                2
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">Complétez votre profil</h3>
                <p className="text-gray-600 text-sm">
                    Ajoutez vos compétences, tarifs et disponibilités pour vous démarquer
                </p>
                </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                3
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">Recevez des demandes</h3>
                <p className="text-gray-600 text-sm">
                    Soyez notifié des nouvelles opportunités dans votre zone
                </p>
                </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-[#4299e1] text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                4
                </div>
                <div>
                <h3 className="text-[#4a69bd] font-medium text-lg mb-1">Développez votre activité</h3>
                <p className="text-gray-600 text-sm">
                    Fidélisez vos clients et augmentez votre visibilité grâce aux avis
                </p>
                </div>
            </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12">
            <a
                href="#"
                className="inline-block bg-[#ed8936] hover:bg-[#f6ad55] text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
                Commencer maintenant
            </a>
            </div>
        </div>
        </section>
        <section className="py-16 bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services Domestiques</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {/* Service Links */}
      {[
        { icon: "fas fa-broom", label: "Ménage" },
        { icon: "fas fa-leaf", label: "Jardinage" },
        { icon: "fas fa-bolt", label: "Electricité" },
        { icon: "fas fa-faucet", label: "Plomberie" },
        { icon: "fas fa-hammer", label: "Menuiserie Bois" },
        { icon: "fas fa-window-maximize", label: "Menuiserie Aluminium" },
        { icon: "fas fa-paint-roller", label: "Peinture et décoration" },
        { icon: "fas fa-bug", label: "Contrôle des nuisibles" },
        { icon: "fas fa-blender", label: "Réparation appareil électroménager" },
        { icon: "fas fa-couch", label: "Assemblage des meubles" },
        { icon: "fas fa-tv", label: "Installation TV et accessoires électroniques" },
        { icon: "fas fa-clone", label: "Miroiterie" },
        { icon: "fas fa-truck", label: "Déménagement" },
        { icon: "fas fa-solar-panel", label: "Energie solaire" },
        { icon: "fas fa-scroll", label: "Tapisserie" },
        { icon: "fas fa-key", label: "Serrurier" },
        { icon: "fas fa-car", label: "Mécanique Auto" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
        </div>
        </div>
        </section>

        <section className="bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services d&rsquo;accompagnement</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {/* Service Links */}
      {[
        { icon: "fas fa-baby", label: "Garde d'enfants" },
        { icon: "fas fa-paw", label: "Garde d'animaux" },
        { icon: "fas fa-cut", label: "Toilettage d'animaux" },
        { icon: "fas fa-user-nurse", label: "Aide aux personnes âgées" },
        { icon: "fas fa-hand-holding-medical", label: "Kinésithérapie" },
        { icon: "fas fa-heartbeat", label: "Soins à domicile" },
        { icon: "fas fa-book", label: "Cours à domicile" },
        { icon: "fas fa-music", label: "Cours de musique" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>


<section className="py-16 bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Rénovations résidentielles</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {/* Service Links */}
      {[
        { icon: "fas fa-hard-hat", label: "Maçonnerie" },
        { icon: "fas fa-utensils", label: "Rénovations cuisines" },
        { icon: "fas fa-bath", label: "Rénovations salle de Bains" },
        { icon: "fas fa-border-all", label: "Carrelage" },
        { icon: "fas fa-square", label: "Parquet" },
        { icon: "fas fa-window-restore", label: "Installation fenêtres et rideaux" },
        { icon: "fas fa-layer-group", label: "Plâtre" },
        { icon: "fas fa-hot-tub", label: "Installation chauffe à eaux" },
        { icon: "fas fa-brush", label: "Peinture Intérieure et extérieure" },
        { icon: "fas fa-snowflake", label: "Climatisation et froid" },
        { icon: "fas fa-square", label: "Marbre" },
        { icon: "fas fa-shield-alt", label: "Inox" },
        { icon: "fas fa-tint", label: "Etanchéité" },
        { icon: "fas fa-solar-panel", label: "Energie Solaire" },
        { icon: "fas fa-video", label: "Vidéo-surveillance" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>

<section className="bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services Personnels et Bien-être</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {[
        { icon: "fas fa-running", label: "Coaching Sportif" },
        { icon: "fas fa-brain", label: "Coaching mental" },
        { icon: "fas fa-apple-alt", label: "Diététique et nutrition" },
        { icon: "fas fa-spa", label: "Thérapie par massage" },
        { icon: "fas fa-hand-holding-medical", label: "Kinésithérapie" },
        { icon: "fas fa-cut", label: "Coiffeur à domicile" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services Evénements</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {[
        { icon: "fas fa-female", label: "Hôtesses" },
        { icon: "fas fa-concierge-bell", label: "Serveurs" },
        { icon: "fas fa-hat-chef", label: "Chef à domicile" },
        { icon: "fas fa-utensils", label: "Traiteurs" },
        { icon: "fas fa-guitar", label: "Orchestres" },
        { icon: "fas fa-music", label: "Disc Jockey (DJ)" },
        { icon: "fas fa-gem", label: "Negafa et cérémonies de mariage" },
        { icon: "fas fa-camera", label: "Photographes et cameraman" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>

<section className="bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services Informatiques</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {[
        { icon: "fas fa-laptop-medical", label: "Assistance Informatique" },
        { icon: "fas fa-code", label: "Design des sites Web" },
        { icon: "fas fa-pencil-alt", label: "Copywriting et SEO" },
        { icon: "fas fa-shopping-cart", label: "e-Commerce" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services Professionnels</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {[
        { icon: "fas fa-drafting-compass", label: "Architectes" },
        { icon: "fas fa-palette", label: "Design Graphique" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>



<section className="mb-8 bg-gray-100">
  <div className="max-w-[1400px] mx-auto bg-white rounded-xl p-8">
    {/* Section Title */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#4052B4] mb-4">Services Juridiques</h2>
      <div className="h-0.5 bg-orange-400"></div>
    </div>

    {/* Services Layout */}
    <div className="flex flex-wrap gap-6">
      {[
        { icon: "fas fa-balance-scale", label: "Avocats" },
        { icon: "fas fa-stamp", label: "Notaires" },
        { icon: "fas fa-file-signature", label: "Adoul" },
        { icon: "fas fa-gavel", label: "Huissier de justice" },
        { icon: "fas fa-calculator", label: "Comptabilité et tenue des livres" },
      ].map((service, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 px-4 py-2 bg-[#f8fafc] rounded-lg border border-gray-200 hover:shadow-md transition-all"
        >
          <i className={`${service.icon} text-blue-500 w-5 h-5`}></i>
          <span className="text-gray-700 text-sm">{service.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>
        <Footer/>
    </div>
  )
}

