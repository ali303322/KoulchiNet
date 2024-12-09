import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [users, Setusers] = useState([]);
    const [data, setData] = useState([]); // take citys
    const [city, setCity] = useState(); // take the selctioned city
    const [districts, setDistricts] = useState([]); // take the districts citys
    const [Dist, setDist] = useState(); // take the district user chosen
    const [services, setServices] = useState([]); // take all services on the data base
    const [service, setService] = useState(); // take the service of the user chose
    const navigate = useNavigate();
      // fetching for citys
      useEffect(() => {
        const fetchVilles = async () => {
            try {
                const result = await axios.get('http://127.0.0.1:8000/api/villes');
                setData(result.data);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchVilles();
    }, []);



    // get the disticts of selectionded city and store it into the districts variable
    useEffect(()=>{
        if (city) {
            let config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `http://127.0.0.1:8000/api/Districts/${city}`,
              headers: {},
            };

            axios.request(config)
              .then((response) => {
                setDistricts(response.data);
                console.log(districts);

              })
              .catch((error) => {
                console.log(error);
              });
          }
    }, [city]);



    // fetching for all services
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/services',
            headers: { }
          };

          axios.request(config)
          .then((response) => {
            setServices(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

        // fetch users
        useEffect(()=>{
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/users',
                headers: { }
              };

              axios.request(config)
              .then((response) => {
                Setusers(response.data);
              })
              .catch((error) => {
                console.log(error);
              });

        },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const rows = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].role === "prestataire" && users[i].district === Dist && users[i].ville === city && users[i].service === service){
                rows.push(users[i]);
            }
        }
        navigate(`/servicePageDesc/${service}` , {state : {users : rows , ville : city , dist : Dist , service : service}})

    }
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[95%] z-20">
    <div className="max-w-[1400px] mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-[#4052B4] mb-8">
            Trouvez votre Service
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-8">
                {/* Ville */}
                <div className="flex flex-col">
                    <label htmlFor="ville" className="text-sm text-gray-600 mb-2 ml-6">
                        Choisir votre ville
                    </label>
                    <select
                        id="ville"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-gray-300"
                    >
                        <option value="">Choisir votre ville</option>
                        {data.map((ville, index) => (
                            <option key={index} value={ville.villePricipale}>
                                {ville.villePricipale}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Secteur */}
                <div className="flex flex-col">
                    <label htmlFor="quartier" className="text-sm text-gray-600 mb-2 ml-6">
                        Choisir votre  Arrondissement
                    </label>
                    <select
                        id="quartier"
                        value={Dist}
                        onChange={(e) => setDist(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-gray-300"
                        disabled={!districts.length}
                    >
                        <option value="">Choisir votre Arrondissement</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district.Arrondissement}>
                                {district.Arrondissement}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Service */}
                <div className="flex flex-col">
                    <label htmlFor="service" className="text-sm text-gray-600 mb-2 ml-6">
                        Choisir votre service
                    </label>
                    <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-gray-300"
                    >
                        <option value="">Choisir votre service</option>
                        {services.map((serv, index) => (
                            <option key={index} value={serv.serviceName}>
                                {serv.serviceName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-[#4052B4] text-white px-6 py-2.5 rounded-full flex items-center justify-center"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        Rechercher
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
  )
}
