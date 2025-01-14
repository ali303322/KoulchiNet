import { useEffect, useState } from "react";
// import img3 from "./image/img3.png";
import HeaderClient from "./HeaderClient";
import SideBarClient from "./SideBarClient";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Review() {
    const [activeStars, setActiveStars] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    const [pres, setPres] = useState(null); // Initialize as null
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const { id } = useParams();

    const getpres = async (idpres) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/prestataire/${idpres}`);
            setPres(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getpres(id);
        };
        fetchData();
    }, [id]);

    const handleStarClick = (index) => {
        setActiveStars(index + 1); // Set the number of stars as 1-based index
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                stars: activeStars,
                commentaire: commentaire,
                prestataire_id: id,
            };
            const response = await axios.post(`http://127.0.0.1:8000/api/review`, payload);

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage("Votre avis a été enregistré avec succès !");
                setActiveStars(0); // Clear stars
                setCommentaire(''); // Clear comment
                setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'avis :", error);
        }
    };

    return (
        <div className="bg-gray-100 font-sans">
            <HeaderClient />

            {/* Main Content */}
            <div className="flex min-h-screen">
                <SideBarClient />
                <div className="flex-1 p-8">
                    <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center mb-6">
                                            {/* Success Message */}
                            {successMessage && (
                                <p className="text-green-500 text-center mb-4">{successMessage}</p>
                            )}
                                {pres && pres.docs ? (
                                    <img
                                        src={`http://127.0.0.1:8000/profile_photos_perstataire/${pres.docs[0].photo}`}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover mb-3"
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                                        <p>Loading...</p>
                                    </div>
                                )}
                            {pres && pres.user ? (
                                <>
                                    <h2 className="text-xl font-semibold">{pres.user.nom} {pres.user.prenom}</h2>
                                    <p className="text-[#4a69bd]">{pres.service.serviceName}</p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center space-x-2 mb-6">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleStarClick(index)}
                                    className={`star-btn ${index < activeStars ? "text-yellow-500" : "text-gray-400"}`}
                                >
                                    <svg className="w-8 h-8" fill="currentColor" stroke="none" viewBox="0 0 24 24">
                                        <path
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                </button>
                            ))}
                        </div>

                        {/* Comment Box */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a69bd] focus:border-[#4a69bd] outline-none resize-none"
                                    rows="4"
                                    placeholder="Ajouter un commentaire"
                                    value={commentaire}
                                    onChange={(e) => setCommentaire(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#4a69bd] text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
