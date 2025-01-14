import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderPres from "./HeaderPres";
import SideBarPres from "./SideBarPres";
import { useAuth } from "../context/ContextAuth";

export default function Plans() {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasProServices, setHasProServices] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));


  const standardPlans = [
    {
      title: "Essentiel",
      credits: "10 crédits",
      description: "Idéal pour les prestataires ayant des besoins limités",
      price: "199 MAD",
      features: ["Accès à 10 services"],
      highlightColor: "#2980b9",
    },
    {
      title: "Standard",
      credits: "25 crédits",
      description: "Convient aux prestataires réguliers",
      price: "450 MAD",
      features: ["Accès à 25 services"],
      highlightColor: "#2980b9",
    },
    {
      title: "Avancé",
      credits: "50 crédits",
      description: "Destiné aux prestataires ayant un volume d'activité plus important",
      price: "850 MAD",
      features: ["Accès à 50 services"],
      highlightColor: "#2980b9",
      popular: true,
    },
    {
      title: "Premium",
      credits: "100 crédits",
      description: "Parfait pour les prestataires très actifs",
      price: "1500 MAD",
      features: ["Accès à 100 services"],
      highlightColor: "#2980b9",
    },
  ];

  const proPlans = [
    {
      title: "Essentiel Pro",
      credits: "10 crédits",
      description: "Services professionnels de base",
      price: "490 MAD",
      features: ["Accès à 10 services pro"],
      highlightColor: "#2c3e50",
    },
    {
      title: "Standard Pro",
      credits: "25 crédits",
      description: "Services professionnels standards",
      price: "1000 MAD",
      features: ["Accès à 25 services pro"],
      highlightColor: "#2c3e50",
    },
    {
      title: "Avancé Pro",
      credits: "50 crédits",
      description: "Services professionnels avancés",
      price: "1800 MAD",
      features: ["Accès à 50 services pro"],
      highlightColor: "#2c3e50",
      popular: true,
    },
    {
      title: "Premium Pro",
      credits: "100 crédits",
      description: "Services professionnels premium",
      price: "3000 MAD",
      features: ["Accès à 100 services pro"],
      highlightColor: "#2c3e50",
    },
  ];

  useEffect(() => {
    const fetchCurrentPrestataire = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/current-prestataire', {id : user.id});
        setCurrentUser(response.data.prestataire);
        setHasProServices(response.data.has_pro_services);
        console.log(response.data);

        console.log('Current Prestataire:', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prestataire:', error);
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCurrentPrestataire();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      setCurrentUser(userData);

      // Add debugging
      console.log('User Data:', userData);

      // Check if user has PRO services
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/prestataire/${userData.id}/check-pro`)
        .then(response => {
          console.log('PRO Status Response:', response.data); // Add debugging
          setHasProServices(response.data.isPro);
        })
        .catch(error => {
          console.error('Error checking PRO status:', error);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const plans = hasProServices ? proPlans : standardPlans;

  const handleChoosePlan = (plan) => {
    console.log('Selected plan:', plan);
    navigate('/PrestataireDashboard/Plans/submitPlan', {
      state: {
        planName: plan.title,
        planPrice: plan.price,
        planCredits: plan.credits,
        planDuration: 'mois'
      }
    });
  };

  return (
    <div className="bg-gray-100 font-sans">
      <HeaderPres/>
      <div className="flex min-h-screen">
        <SideBarPres/>
        <div className="p-8">
          {/* Display user info and PRO status */}
          {currentUser ? (
            <div className="mb-8 bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl text-[#34495e] mb-2">
                Welcome, {currentUser.nom} {currentUser.prenom}
              </h3>
            </div>
          ) : (
            <div className="mb-8 bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Please log in to view your account status</p>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {/* <h2 className="text-3xl text-center text-[#34495e] mb-8 font-semibold">
              {hasProServices ? 'Services professionnels' : 'Services ordinaires'}
            </h2> */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 ${hasProServices ? 'pro' : 'standard'}`}>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-8 shadow-lg relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden ${
                    plan.popular ? "popular" : ""
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ backgroundColor: plan.highlightColor }}
                  ></div>
                  <h3 className="text-2xl text-[#34495e] mb-4 min-h-[40px] flex items-center">
                    {plan.title}
                  </h3>
                  <div
                    className={`text-4xl font-semibold mb-4 text-center min-h-[50px] flex items-center justify-center ${
                      hasProServices ? 'text-[#2c3e50]' : 'text-[#2980b9]'
                    }`}
                  >
                    {plan.credits}
                  </div>
                  <p className="text-[#7f8c8d] mb-6 min-h-[60px] flex items-center">
                    {plan.description}
                  </p>
                  <ul className="mb-8 min-h-[60px]">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-[#34495e] mb-2"
                      >
                        <span
                          className="mr-2"
                          style={{ color: plan.highlightColor }}
                        >
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleChoosePlan(plan)}
                    className={`block w-full text-white text-center py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 mb-4`}
                    style={{ backgroundColor: plan.highlightColor }}
                  >
                    Choisir ce plan
                  </button>
                  <div className="text-2xl font-semibold text-[#34495e] text-center">
                    {plan.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
