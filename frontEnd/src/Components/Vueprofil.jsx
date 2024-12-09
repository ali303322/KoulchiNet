import { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import img3 from './image/img3.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function Vueprofil() {
    const [selectedStar, setSelectedStar] = useState(0);
    const [user, setUser] = useState({});

    const toggleStar = (index) => {
        setSelectedStar(index);
    };

    const { id } = useParams();


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/users/${id}`,
            headers: { }
          };

          axios.request(config)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [id]);

    console.log(user);



    return (
        <>
        <Header/>
        <section className="bg-gray-50 py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="bg-white rounded-3xl p-6 flex gap-16">
                    {/* Left Side */}
                    <div className="flex flex-col items-center w-[400px]">
                        <img
                            src={img3}
                            alt={user.name}
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                        <p className="text-[#4052B4] font-bold text-lg mb-6">{user.service}</p>
                        <p className="text-gray-600 text-center text-lg leading-relaxed mb-8">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry &rsquo;s standard dummy text ever since the
                            1500s.
                        </p>
                        <div className="flex gap-3">
                            <button className="bg-[#FF6B00] text-white px-6 py-2 rounded-full hover:bg-orange-600 text-base">
                                Contacter
                            </button>
                            <a href='https://wa.me/0687568388' className="bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-green-600 flex items-center text-base">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                WhatsApp
                            </a>
                            <button className="bg-[#4052B4] text-white px-6 py-2 rounded-full hover:bg-blue-700 text-base">
                                Chat
                            </button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 border-l pl-12">
                        <div className="space-y-3 mb-8">
                            {/* Information Fields */}
                            <table>
                                <tr>
                                    <td  className="font-bold text-lg mb-1">Nom et Prénom :</td>
                                    <td className="text-gray-700 text-xl ml-2" >{user.name}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td className="font-bold text-lg mb-1">ville :</td>
                                    <td className="text-gray-700 text-xl ml-2" >{user.ville}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td className="font-bold text-lg mb-1">Disponibilité :</td>
                                    <td className="text-gray-700 text-xl ml-2" >Lundi - Vendredi 08:00h - 18:00h</td>
                                </tr>
                                <br />
                                <tr>
                                    <td className="font-bold text-lg mb-1">Service :</td>
                                    <td className="text-gray-700 text-xl ml-2" >{user.service}</td>
                                </tr>
                                <br />
                                <tr>
                                    <td className="font-bold text-lg mb-1">  Années d&rsquo;expérience :</td>
                                    <td className="text-gray-700 text-xl ml-2" >5 ans</td>
                                </tr>
                            </table>
                        </div>

                        {/* Reviews Section */}
                        <div className="text-center mt-32">
                            <h3 className="font-medium text-xl mb-4">Reviews:</h3>
                            <div className="flex justify-center items-center mb-4">
                                <div id="stars" className="flex gap-2">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <svg
                                            key={index}
                                            onClick={() => toggleStar(index)}
                                            className={`w-8 h-8 cursor-pointer ${
                                                index <= selectedStar
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
    );
}





//     <!-- Profile Section -->
//     <section class="bg-gray-50 py-8">
//         <div class="max-w-[1200px] mx-auto px-4">
//             <div class="bg-white rounded-3xl p-6 flex gap-16">
//                 <!-- Left Side -->
//                 <div class="flex flex-col items-center w-[400px]">
//                     <img src="image/img3.png" alt="Ahmed reda" class="w-32 h-32 rounded-full mb-4">
//                     <h2 class="text-2xl font-bold mb-2">Ahmed reda</h2>
//                     <p class="text-[#4052B4] font-bold text-lg mb-6">Plombier</p>
//                     <p class="text-gray-600 text-center text-lg leading-relaxed mb-8">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                     </p>
//                     <div class="flex gap-3">
//                         <button class="bg-[#FF6B00] text-white px-6 py-2 rounded-full hover:bg-orange-600 text-base">
//                             Contacter
//                         </button>
//                         <button class="bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-green-600 flex items-center text-base">
//                             <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                             </svg>
//                             WhatsApp
//                         </button>
//                         <button class="bg-[#4052B4] text-white px-6 py-2 rounded-full hover:bg-blue-700 text-base">
//                             Chat
//                         </button>
//                     </div>
//                 </div>

//                 <!-- Right Side -->
//                 <div class="flex-1 border-l pl-12">
//                     <div class="space-y-3 mb-8">
//                         <div class="flex items-center">
//                             <p class="font-bold text-lg mb-1">Nom:</p>
//                             <p class="text-gray-700 text-xl ml-2">Reda</p>
//                         </div>
//                         <div class="flex items-center">
//                             <p class="font-bold text-lg mb-1">Prénom:</p>
//                             <p class="text-gray-700 text-xl ml-2">Ahmed</p>
//                         </div>
//                         <div class="flex items-center">
//                             <p class="font-bold text-lg mb-1">Ville:</p>
//                             <p class="text-gray-700 text-xl ml-2">Casablanca</p>
//                         </div>
//                         <div class="flex items-center">
//                             <p class="font-bold text-lg mb-1">Disponibilité:</p>
//                             <p class="text-gray-700 text-xl ml-2">Lundi - Vendredi 08:00h - 18:00h</p>
//                         </div>
//                         <div class="flex items-center">
//                             <p class="font-bold text-lg mb-1">Service:</p>
//                             <p class="text-gray-700 text-xl ml-2">Plombier</p>
//                         </div>
//                         <div class="flex items-center">
//                             <p class="font-bold text-lg mb-1">Années d'expérience:</p>
//                             <p class="text-gray-700 text-xl ml-2">5ans</p>
//                         </div>
//                     </div>

//                     <!-- Reviews Section -->
//                     <div class="text-center mt-32">
//                         <h3 class="font-medium text-xl mb-4">Reviews:</h3>
//                         <div class="flex justify-center items-center mb-4">
//                             <div id="stars" class="flex gap-2">
//                                 <!-- Clickable stars -->
//                                 <svg onclick="toggleStar(0)" class="w-8 h-8 text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                                 </svg>
//                                 <svg onclick="toggleStar(1)" class="w-8 h-8 text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                                 </svg>
//                                 <svg onclick="toggleStar(2)" class="w-8 h-8 text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                                 </svg>
//                                 <svg onclick="toggleStar(3)" class="w-8 h-8 text-yellow-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                                 </svg>
//                                 <svg onclick="toggleStar(4)" class="w-8 h-8 text-gray-300 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                                 </svg>
//                             </div>
//                         </div>
//                         <div class="flex items-center justify-center gap-4">
//                             <button class="p-2 border rounded-lg hover:bg-gray-100">←</button>
//                             <p class="text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                             <button class="p-2 border rounded-lg hover:bg-gray-100">→</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>


//     <!-- Add this JavaScript at the end of your body tag -->
//     <script>
//         // Get the buttons and dropdowns
//         const langBtn = document.getElementById('langBtn');
//         const langDropdown = document.getElementById('langDropdown');

//         // Toggle language dropdown
//         langBtn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             langDropdown.classList.toggle('hidden');
//         });

//         // Close dropdowns when clicking outside
//         document.addEventListener('click', () => {
//             langDropdown.classList.add('hidden');
//         });
//     </script>

//     <script>
//         function toggleStar(index) {
//             const stars = document.querySelectorAll('#stars svg');
//             stars.forEach((star, i) => {
//                 if (i <= index) {
//                     star.classList.remove('text-gray-300');
//                     star.classList.add('text-yellow-400');
//                 } else {
//                     star.classList.remove('text-yellow-400');
//                     star.classList.add('text-gray-300');
//                 }
//             });
//         }
//     </script>
// </body>
// </html>
