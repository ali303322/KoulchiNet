const DetailItem = ({ label, value }) => {
    return (
      <div className="flex items-center mb-2 p-2 bg-gray-100 rounded">
        <span className="font-semibold text-gray-600 w-40">{label}:</span>
        <span className="text-gray-700 flex-1">{value}</span>
      </div>
    );
  };

  export default DetailItem ;
