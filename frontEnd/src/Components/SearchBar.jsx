import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
    const [users, Setusers] = useState([]);
    const [data, setData] = useState([]); // take citys
    const [city, setCity] = useState(); // take the selctioned city
    const [districts, setDistricts] = useState([]); // take the districts citys
    const [Dist, setDist] = useState(); // take the district user chosen
    const [services, setServices] = useState([]); // take all services on the data base
    const [service, setService] = useState(); // take the service of the user chose
    const [serviceName, setServiceName] = useState("");
    const { t } = useTranslation();
    const navigate = useNavigate();
      // fetching for citys
      useEffect(() => {
        const fetchVilles = async () => {
            try {
                const result = await axios.get('https://back.koulchinet.com/api/villes');
                if(result){
                    let sortedIVilles = [];
                    result.data.forEach(element => {
                        sortedIVilles.push(element.villePricipale)
                    });
                    sortedIVilles.sort();
                    setData(sortedIVilles);
                }
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
              url: `https://back.koulchinet.com/api/Districts/${city}`,
              headers: {},
            };

            axios.request(config)
              .then((response) => {
                if(response){
                    let sortedDist = [];
                    response.data.forEach(element => {
                        sortedDist.push(element.Arrondissement)
                    });
                    sortedDist.sort();
                    setDistricts(sortedDist);
                }

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
            url: 'https://back.koulchinet.com/api/services',
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
                url: 'https://back.koulchinet.com/api/prestataires',
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



        const handleSubmit = async (e) => {
            e.preventDefault();

            // Filter the users based on the criteria
            const rows = users.filter(user =>
                user.aroundissment === Dist && user.ville === city && user.service_id === service
            );

            try {
                // Make the API call to get the service name
                const response = await axios.get(`https://back.koulchinet.com/api/getserviceName/${service}`);

                // Log the entire response to see its structure
                console.log('API Response:', response);

                // Get the service name from the response (adjust based on actual response structure)
                const serviceName = response.data;  // Ensure 'name' is the correct field

                // If service name exists, navigate to the new route
                if (serviceName) {
                    navigate(`/servicePageDesc/${serviceName}`, {
                        state: { users: rows, ville: city, dist: Dist, service : serviceName }
                    });
                } else {
                    console.error('Service name is undefined or invalid.');
                }
            } catch (error) {
                console.error('Error fetching service name:', error);
            }
        };


  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[95%] z-20">
    <div className="max-w-[1400px] mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-[#4052B4] mb-8">
            {t('findService')}
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-8">
                {/* Ville */}
                <div className="flex flex-col">
                    <label htmlFor="ville" className="text-sm text-gray-600 mb-2 ml-6">
                    {t('chooseCity')}
                    </label>
                    <select
                        id="ville"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-gray-300"
                    >
                        <option value="">{t('chooseCity')}</option>
                        {data.map((ville, index) => (
                            <option key={index} value={ville}>
                                {ville}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Secteur */}
                <div className="flex flex-col">
                    <label htmlFor="quartier" className="text-sm text-gray-600 mb-2 ml-6">
                    {t('chooseDistrict')}
                    </label>
                    <select
                        id="quartier"
                        value={Dist}
                        onChange={(e) => setDist(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-gray-300"
                        disabled={!districts.length}
                    >
                        <option value="">{t('chooseDistrict')}</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Service */}
                <div className="flex flex-col">
                    <label htmlFor="service" className="text-sm text-gray-600 mb-2 ml-6">
                    {t('chooseService')}
                    </label>
                    <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-gray-300"
                    >
                        <option value="">{t('chooseService')}</option>
                        {services.map((serv, index) => (
                            <option key={index} value={serv.id}>
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
                        {t('search')}
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
  )
}
