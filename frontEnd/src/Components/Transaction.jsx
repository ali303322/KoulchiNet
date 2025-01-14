import { useEffect, useState } from 'react'
import SIdeBar from './SIdeBar'
import DashboardHeader from './DashboardHeader'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Transaction() {
    const[transaction,setTransaction]=useState([]);
    const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
      getHistorys(currentPage);
    }, [currentPage]);

    const getHistorys=async(page)=>
    {
      await axios.get(`http://127.0.0.1:8000/api/transaction?page=${page}`)
      .then(res=>{
        setTransaction(res.data.transactions)
        setTotalPages(res.data.totalPages); // Ensure your API returns total pages
    })
      .catch(err=>console.log(err))

    }


    const deleteTransaction = (id) => {
        const confirmation = confirm('vous êtes sûr de supprimer cette transaction');
        if (confirmation) {
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `http://127.0.0.1:8000/api/deleteTransaction/${id}`,
            };

            axios.request(config)
                .then((response) => {
                    alert('Transaction deleted successfully');

                    // Remove the deleted transaction from the state
                    setTransaction((prevTransactions) =>
                        prevTransactions.filter(transaction => transaction.id !== id)
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };

      const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };


  return (
<>
<DashboardHeader/>
<div className="flex min-h-screen">

             <SIdeBar/>
            {/* Main Content Area */}
            <div className="flex-1 p-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-[#4a69bd] text-xl font-medium mb-6">Transactions</h2>

                    {/* Table */}
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Prestataire</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Client</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">date</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Service</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">

                            {transaction&& transaction.map((e,i)=>{
                                console.log(e)
                                return <tr className="border-b border-gray-200" key={i}>
                                            <td className="py-3 px-4">{e.prestataire?.nom} {e.prestataire?.prenom}</td>
                                            <td className="py-3 px-4">{e.client?.nom} {e.client?.prenom}</td>
                                            <td className="py-3 px-4">{e.date_sent}</td>
                                            <td className="py-3 px-4">{e.service_name}</td>

                                            <td className="py-3 px-4 space-x-2">
                                                <button className="text-[#4a69bd] hover:text-blue-700">
                                                <Link to={"/AdminDashboard/TransactionsDetails/"+e.id}>Details</Link>
                                                </button>
                                                <button onClick={()=>deleteTransaction(e.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                            </td>
                                        </tr>
                                })}
                            {/* Repeat for other rows */}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={handlePreviousPage}
                className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 ${
                    currentPage === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-[#4a69bd] text-white"
                  } rounded`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-[#4a69bd] text-white rounded disabled:bg-gray-400"
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
                </div>
            </div>
        </div>
</>
  )
}
