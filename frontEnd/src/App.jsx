// import { useState } from 'react'
// import './App.css'
import { RouterProvider } from 'react-router-dom';
import { Router } from './Routes/index';
import { AuthProvider } from './context/ContextAuth';
function App() {

  return (
    <>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      rel="stylesheet"
    />
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </>
  )
}

export default App
