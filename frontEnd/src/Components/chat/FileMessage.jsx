// import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function FileMessage({ fileName, fileSize, fileUrl }) {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };


  console.log('cc',`http://127.0.0.1:8000/${fileUrl}`);


  return (

    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
        <img src={`http://127.0.0.1:8000/${fileUrl}`} alt="" />
    {/* <a
        href={`http://127.0.0.1:8000/${fileUrl}`}>
      <div className="flex-grow">
        <p className="font-medium text-sm truncate">{fileName}</p>
        <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>
      </div>

        <ArrowDownTrayIcon className="w-4 h-4" />
      </a> */}
    </div>
  );
}

// Define prop types for the component
FileMessage.propTypes = {
  fileName: PropTypes.string.isRequired, // File name is a required string
  fileSize: PropTypes.number.isRequired, // File size is a required number
  fileUrl: PropTypes.string.isRequired,  // File URL is a required string
};
