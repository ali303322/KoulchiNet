// import React from 'react'
import Header from './Header';
import Footer from './Footer';
import img3 from './image/img3.png'
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from 'axios';
// import { useEffect } from 'react';

export default function Findprestataire() {
    const location = useLocation();
    const dataComes = location.state ;

    const fetchUsers = async () => {
        try {
            const response = await axios.post('/api/users', {
                filter: dataComes
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    fetchUsers();


  return (
    <div className='bg-gray-100 '>
    <Header />

   {/* Hero Section */}
   <section
        className="relative h-[150px] bg-cover bg-center bg-gray-100"
    >

        <SearchBar/>
    </section>
    {/* Main Content Section */}
    <main className="bg-gray-100 py-10 mt-20">

        {/* Cards Section */}
        <section className="py-4">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="grid grid-cols-3 gap-4">

                {dataComes.users && dataComes.users.length > 0 ? (
                // If users exist, map over them and display their information
                dataComes.users.map((user, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center justify-between h-[381px] w-[285px]"
                    >
                        <img
                            src={img3}
                            alt={user.name} // Display user.name for the alt text
                            className="w-32 h-32 rounded-full mb-6"
                        />
                        <h3 className="font-medium text-xl mb-4">{user.name}</h3>
                        <p className="text-gray-600 text-center text-base mb-6">
                            {user.service}
                        </p>
                        <button className="bg-[#4052B4] text-white px-8 py-2.5 rounded-full hover:bg-blue-700">
                            <Link to={`/VueProfile/${user.id}`} >Voir le profil</Link>
                        </button>
                    </div>
                ))
            ) : (
                // If no users are found, display a message
                <div className="col-span-3 text-center text-gray-600">
                    <p>Aucun prestataire trouvé.</p>
                </div>
            )}
                </div>
            </div>
        </section>
    </main>

    <Footer />
</div>
  )
}





