import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Header from './Header'
import Footer from './Footer'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

export default function Vueprofil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [averageRating, setAverageRating] = useState(0)
  const [reviews, setReviews] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [dispo,setDispo]=useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`https://back.koulchinet.com/api/prestataire/${id}`);
      const data = await response.json();
      console.log(data); // Vérifiez ici les données retournées
      setUser(data.user);
      setAverageRating(data.averageRating);
      setReviews(data.reviews);
      setDispo(data.Disponibility);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, [id]);

//   console.log(dispo);


  useEffect(() => {
    const reviewsToArray = () => {
      return reviews.map((review) => review.commentaire);
    };
    setTestimonials(reviewsToArray());
  }, [reviews]);

  // Handlers for next and previous slides
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, nextSlide]);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('idPres', id);
    navigate('/sendingResponce', { state: id });
  };
  return (
    <>
      <Header />
      <section className="bg-gray-50 py-8">
        <div className=" mx-auto px-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : user ? (
            <div className="bg-white rounded-3x1 p-6 flex gap-16 ">
              {/* Left Side */}
              <div className="flex flex-col items-center w-[500px]">
                <img
                  src={`https://back.koulchinet.com/profile_photos_perstataire/${user.documents[0]?.photo}`}
                  alt={user?.nom || 'Profile'}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">
                  {user?.nom} {user?.prenom}
                </h2>
                <p className="text-gray-600 text-center text-lg mb-8">
                  {user?.description_service}
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="submit"
                    className="bg-[#FF6B00] text-white px-6 py-2 rounded-full hover:bg-orange-600 text-base"
                    value="Contacter"
                  />
                </form>

                <div className="flex justify-center items-center mt-6">

                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-8 h-8 ${
                        index < averageRating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div
  onMouseEnter={() => setIsAutoPlaying(false)}
  onMouseLeave={() => setIsAutoPlaying(true)}
  className="relative w-full"
>
  <div className="w-full">
    {testimonials.map((testimonial, index) => (
      <div
        key={index}
        className={`duration-500 flex items-center justify-between gap-4 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '150px', // Set a consistent height for the slide
          transition: 'opacity 0.5s',
          position: index === currentSlide ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        aria-hidden={index !== currentSlide}
      >
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Testimonial Content */}
        <blockquote className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 text-center flex-grow">
          {testimonial}
        </blockquote>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    ))}
  </div>
</div>
</div>
              {/* Right Side */}
              <div className="flex-1 border-l pl-12">
                <table className="mt-8">
                  <tbody>
                    <tr>
                      <td className="font-bold text-lg mb-1">Nom et Prénom:</td>
                      <td className="text-gray-700 text-xl px-6 ml-2">
                        {user?.nom} {user?.prenom}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-lg mb-1">Ville:</td>
                      <td className="text-gray-700 text-xl ml-2 px-6">{user?.ville}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-lg mb-1">Service:</td>
                      <td className="text-gray-700 text-xl ml-2 px-6">
                        {user?.service.serviceName}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-lg mb-1">Années d&rsquo;expérience:</td>
                      <td className="text-gray-700 text-xl ml-2 px-6">
                        {user?.annees_experience} ans
                      </td>
                    </tr>
                    <tr>
  <td className="font-bold text-lg mb-1">Disponibilité:</td>
  <td className="text-gray-700 ml-2 px-6">
    {Object.entries(
      dispo?.reduce((acc, item) => {
        const formatTime = (time) => time.split(':').slice(0, 2).join(':'); // Format to hh:mm
        acc[item.jour] = acc[item.jour] || [];
        acc[item.jour].push(`Début: ${formatTime(item.debut)} | Fin: ${formatTime(item.fin)}`);
        return acc;
      }, {})
    )
      .sort(
        ([dayA], [dayB]) =>
          ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"].indexOf(dayA) -
          ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"].indexOf(dayB)
      )
      .map(([jour, times], index) => (
        <div key={index} className="mb-2">
          <p className="font-sm">
            {jour} | {times.join(" • ")}
          </p>
        </div>
      ))}
  </td>
</tr>


                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Données utilisateur introuvables.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
