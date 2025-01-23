// /* eslint-disable react/prop-types */
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { PaperClipIcon } from "@heroicons/react/24/outline";
// import AudioRecorder from "./AudioRecorder";
// import AudioPlayer from "./AudioPlayer";
// import FileMessage from "./FileMessage";

// export default function ChatContent({ conversation, role, userId }) {
//   const [messages, setMessages] = useState(conversation.messages || []); // Initialize messages from conversation
//   const [inputValue, setInputValue] = useState("");
//   const [selectedFile, setSelectedFile] = useState("");
//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null)
//   const roletest = localStorage.getItem("role");
//   const user = JSON.parse(localStorage.getItem("user"));
// //   const roletest = localStorage.getItem("role");

//   useEffect(() => {
//     setMessages(conversation.messages || []); // Update messages when conversation changes
//   }, [conversation]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   console.log(conversation);

//   const handleAudioRecorded = (audioBlob) => {
//     const audioUrl = URL.createObjectURL(audioBlob);
//     setMessages([
//       ...messages,
//       {
//         id: Date.now().toString(),
//         content: "Audio message",
//         sent: true,
//         type: "audio",
//         audioUrl,
//       },
//     ]);
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const sendMessage = async (messageContent) => {
//     try {
//       // Determine dynamic client_id, prestataire_id, and sender
//       let clientId, prestataireId, sender;
//       if (roletest === "client") {
//         clientId = user.id; // Connected user is the client
//         prestataireId = conversation.messages[0].presId; // Selected user is the prestataire
//         sender = "client";
//       } else if (roletest === "prestataire") {
//         clientId = conversation.messages[0].clientid; // Selected user is the client
//         prestataireId = user.id; // Connected user is the prestataire
//         sender = "prestataire";
//       }

//       if (!clientId || !prestataireId || !sender) {
//         console.error("Invalid message parameters:", {
//           clientId,
//           prestataireId,
//           sender,
//         });
//         return;
//       }

//       // Construct the URL with dynamic parameters
//       const url = `http://localhost:8000/api/send-message/${prestataireId}/${clientId}/${sender}/${messageContent}`;

//       // Send the request
//       const response = await axios.post(url);

//       // Update local messages if the request is successful
//       if (response.data.success) {
//         setMessages((prevMessages) => [...prevMessages, response.data.message]);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error.response?.data || error);
//     }
//   };


//   const handleSendMessage = () => {
//     if (inputValue) {
//       sendMessage(inputValue);
//       setInputValue("");
//     }
//   };

//   const handleFileSend = () => {
//     if (selectedFile) {
//       const fileUrl = URL.createObjectURL(selectedFile)
//       setMessages([
//         ...messages,
//         {
//           id: Date.now().toString(),
//           content: 'File: ' + selectedFile.name,
//           sent: true,
//           type: 'file',
//           fileUrl,
//           fileName: selectedFile.name,
//           fileSize: selectedFile.size,
//         },
//       ])
//       setSelectedFile(null)
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ''
//       }
//     }
//   }

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header Section */}
//       <div className="p-4 border-b border-gray-200 flex items-center gap-4">
//         <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg font-semibold flex-shrink-0">
//           {conversation.nom?.charAt(0)}
//         </div>
//         <h2 className="text-xl font-semibold">
//           {conversation.nom} {conversation.prenom}
//         </h2>
//       </div>

//       {/* Messages Section */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.map((message, index) => (
        //   <div
        //     key={index}
        //     className={`flex gap-4 mb-4 ${
        //       message.sender === roletest ? "justify-end" : "justify-start"
        //     }`}
        //   >
        //     {/* Left-Side Avatar */}
        //     {message.sender !== roletest && (
        //       <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold flex-shrink-0">
        //         {conversation.nom?.charAt(0)}
        //       </div>
        //     )}
//             {/* Message Content */}
//             <div
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 message.sender === roletest
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {message.message && <p>{message.message}</p>}
//               {message.audio && <AudioPlayer audioUrl={message.audio} />}
//               {message.file && (
//                 <FileMessage
//                   fileName={message.fileName || "File"}
//                   fileSize={message.fileSize || ""}
//                   fileUrl={message.file}
//                 />
//               )}


//             </div>
//             {message.sender === roletest && (
//               <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold flex-shrink-0">
//                 {conversation.nom?.charAt(0)}
//               </div>
//             )}
//           </div>
//         ))}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Section */}
//       <div className="p-4 border-t border-gray-200 flex gap-4 items-center">
//   <input
//     type="file"
//     // ref={fileInputRef}
//     onChange={handleFileSelect}
//     className="hidden"
//     id="file-input"
//   />
//   <label
//     htmlFor="file-input"
//     className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
//   >
//     <PaperClipIcon className="w-6 h-6" />
//   </label>
//   <AudioRecorder onAudioRecorded={handleAudioRecorded} />
//   <textarea
//     className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//     placeholder="Type a message..."
//     rows={1}
//     value={inputValue}
//     onChange={(e) => setInputValue(e.target.value)}
//     onKeyPress={(e) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         handleSendMessage();
//       }
//     }}
//   />
//   {selectedFile ? (
//     <button
//       className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
//       onClick={handleFileSend}
//     >
//       Send File
//     </button>
//   ) : (
//     <button
//       className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
//       onClick={handleSendMessage}
//     >
//       Send
//     </button>
//   )}
// </div>
//     </div>
//   );
// }



/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import AudioRecorder from "./AudioRecorder";
import AudioPlayer from "./AudioPlayer";
import FileMessage from "./FileMessage";

export default function ChatContent({ conversation, role, userId , audioBlob}) {
  const [messages, setMessages] = useState(conversation.messages || []); // Initialize messages from conversation
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const roletest = localStorage.getItem("role");
  console.log("messages",messages);


  const handleAudioRecorded = async (audioBlob) => {
    const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });
    setSelectedAudio(audioFile);

    // Automatically send audio after recording
    try {

        // let clientId, prestataireId, sender;
        // if (role === "client") {
        //   clientId = userId;
        //   prestataireId = messages[0].presId;
        //   sender = "client";
        // } else if (role === "prestataire") {
        //   clientId = messages[0].clientid;
        //   prestataireId = userId;
        //   sender = "prestataire";
        // }

        console.log(audioFile.type); // Should output "audio/wav"


      const formData = new FormData();
      formData.append("client_id", messages[0].clientid);
      formData.append("prestataire_id",messages[0].presId);
      formData.append("sender", roletest);
      formData.append("audio", audioFile);

      console.log('cc',audioFile);

      const response = await axios.post(
        "https://back.koulchinet.com/api/send-message",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
      }
    } catch (error) {
      console.error("Error uploading audio:", error.response?.data || error);
    }
  };


  useEffect(() => {
    setMessages(conversation.messages || []); // Update messages when conversation changes
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try{
      const formData = new FormData();
      formData.append("client_id", messages[0].clientid);
      formData.append("prestataire_id",messages[0].presId);
      formData.append("sender", roletest);
      formData.append("file", selectedFile);

      console.log('cc',selectedFile);

      const response = axios.post(
        "https://back.koulchinet.com/api/send-message",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
      }
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error);
    }


    }
  };

//   const handleAudioRecorded = (audioBlob) => {
//     const audioFile = new File([audioBlob], "audio.mp3", { type: "audio/mpeg" });
//     setSelectedAudio(audioFile);
//   };

  const sendMessage = async () => {
    try {
      if (!inputValue && !selectedFile && !selectedAudio) {
        console.error("No message, file, or audio to send");
        return;
      }



      // Determine dynamic client_id, prestataire_id, and sender
    //   let clientIdInp, prestataireId, sender;
    //   if (role === "client") {
    //     clientIdInp = messages[0].clientid;
    //     prestataireId = messages[0].presId;
    //     sender = "client";
    //   } else if (role === "prestataire") {
    //     prestataireId = messages[0].presId;
    //     clientIdInp = messages[0].clientid;
    //     sender = "prestataire";
    //   }

    //   console.log("messages sub",messages);
      console.log("id", roletest );

      const formData = new FormData();
      formData.append("client_id", messages[0].clientid);
      formData.append("prestataire_id",messages[0].presId);
      formData.append("sender", roletest);
      if (inputValue) formData.append("message", inputValue);
      if (selectedFile) formData.append("file", selectedFile);
      if (selectedAudio) formData.append("audio", selectedAudio);

      const response = await axios.post("https://back.koulchinet.com/api/send-message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
      }

      // Reset input values
      setInputValue("");
      setSelectedFile(null);
      setSelectedAudio(null);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg font-semibold flex-shrink-0">
          {conversation.nom?.charAt(0)}
        </div>
        <h2 className="text-xl font-semibold">
          {conversation.nom} {conversation.prenom}
        </h2>
      </div>

      {/* Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
          key={index}
          className={`flex gap-4 mb-4 ${
            message.sender === roletest ? "justify-end" : "justify-start"
          }`}
        >
          {/* Left-Side Avatar */}
          {message.sender !== roletest && (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold flex-shrink-0">
              {conversation.nom?.charAt(0)}
            </div>
          )}
            {/* Message Content */}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === roletest ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {message.message && <p>{message.message}</p>}
              {message.audio && <AudioPlayer audioUrl={message.audio} />}
              {message.file && (
                <FileMessage
                  fileName={message.file.split("/").pop()}
                  fileUrl={message.file}
                />
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-200 flex gap-4 items-center">
        <input
          type="file"
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx"
          className="hidden"
          id="file-input"
        />

        <label
          htmlFor="file-input"
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <PaperClipIcon className="w-6 h-6" />
        </label>
        <AudioRecorder onAudioRecorded={handleAudioRecorded} />
        <textarea
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type a message..."
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
