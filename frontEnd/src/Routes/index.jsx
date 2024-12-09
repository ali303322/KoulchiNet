import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../Components/AboutPage";
import Contact from "../Components/Contact";
import Login from "../Components/Login";
import SignIn from "../Components/SignIn";
import Home from "../Components/Home";
import Findprestataire from "../Components/FindPrestataire";
import DevenirPrestataire from "../Components/DevenirPrestataire";
import Marketplace from "../Components/Marketplace";
import Service from "../Components/Service";
import Vueprofil from "../Components/Vueprofil";
import AdminDashboard from "../Components/AdminDashboard";
import AddProduit from "../Components/AddProduit";
import ClientDetails from "../Components/ClientDetails";
import DemandeDetails from "../Components/DemandeDetails";
import DetailsContenu from "../Components/DetailsContenu";
import EditProduit from "../Components/EditProduit";
import GestionClient from "../Components/GestionClient";
import GestionContenu from "../Components/GestionContenu";
import GestionPrestataire from "../Components/GestionPrestataire";
import GestionProduit from "../Components/GestionProduit";
import HistoriquePres from "../Components/HistoriquePres";
import Plans from "../Components/Plans";
import PresDetails from "../Components/PresDetails";
import Review from "../Components/Review";
import ClientDashboard from "../Components/ClientDashboard";
import SecuriteClient from "../Components/SecuriteClient";
import EditContenu from "../Components/EditContenu";
import AddContenu from "../Components/AddContenu";
import ModifyPrestataire from "../Components/ModifyPrestataire";
import UpgradeDemande from "../Components/UpgradeDemande";
import ServicePlambier from "../Components/ServicePlambier";
import PrestataireDashboard from "../Components/PrestataireDashboard";
import HistoriqueClient from "../Components/HistoriqueClient";
import Security from "../Components/Security";
import ChoosePlan from "../Components/ChoosePlan";
import InscriptionPrestataire from "../Components/InscriptionPrestataire";
import InscriptionClient from "../Components/InscriptionClient";


export const Router = createBrowserRouter([
    {
        path : '/',
        element : <Home/>
    },
    {
        path : '/Contact',
        element : <Contact/>
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/SignIn',
        element : <SignIn/>
    },
    {
        path : '/AboutUs',
        element : <AboutPage/>
    },
    {
        path : '/FindPrestataire',
        element : <Findprestataire/>
    },
    {
        path : '/DevenirePrestataire',
        element : <DevenirPrestataire/>
    },
    {
        path : '/Marketplace',
        element : <Marketplace/>
    },
    {
        path : '/Services',
        element : <Service/>
    },
    {
        path : '/servicePageDesc/:service', // will be param
        element : <ServicePlambier/>
    },
    {
        path : '/VueProfile/:id',
        element : <Vueprofil/>
    },
    {
        path : '/AdminDashboard',
        element : <AdminDashboard/>
    },
    {
        path : '/AdminDashboard/AddProduits',
        element : <AddProduit/>
    },
    {
        path : '/AdminDashboard/AddContenu',
        element : <AddContenu/>
    },
    {
        path : '/AdminDashboard/EditProduits', //param
        element : <EditProduit/>
    },
    {
        path : '/AdminDashboard/EditContenu',
        element : <EditContenu/>
    },
    {
        path : '/AdminDashboard/UpgradeDemande',
        element : <UpgradeDemande/>
    },
    {
        path : '/AdminDashboard/EditPrestataire',
        element : <ModifyPrestataire/>
    },
    {
        path : '/AdminDashboard/DemandeDetails', //param
        element : <DemandeDetails/>
    },
    {
        path : '/AdminDashboard/DetailsContenu',
        element : <DetailsContenu/>
    },
    {
        path : '/AdminDashboard/GestionClient',
        element : <GestionClient/>
    },
    {
        path : '/AdminDashboard/GestionContenu',
        element : <GestionContenu/>
    },
    {
        path : '/AdminDashboard/GestionProduit',
        element : <GestionProduit/>
    },
    {
        path : '/AdminDashboard/GestionPrestataire',
        element : <GestionPrestataire/>
    },
    {
        path : '/AdminDashboard/PestataireDetails', //param
        element : <PresDetails/>
    },
    {
        path : '/AdminDashboard/ClientDetails', //param
        element : <ClientDetails/>
    },




    {
        path : '/ClientDashboard',
        element : <ClientDashboard/>
    },
    {
        path : '/ClientDashboard/Review', //param
        element : <Review/>
    },
    {
        path : '/ClientDashboard/securityClient',
        element : <SecuriteClient/>
    },
    {
        path : '/ClientDashboard/HistoriqueClient',
        element : <HistoriqueClient/>
    },



    {
        path : '/PrestataireDashboard/security',
        element : <Security/>
    },
    {
        path : '/PrestataireDashboard',
        element : <PrestataireDashboard/>
    },
    {
        path : '/PrestataireDashboard/Historique',
        element : <HistoriquePres/>
    },
    {
        path : '/PrestataireDashboard/Plans',
        element : <Plans/>
    },
    {
        path : '/PrestataireDashboard/modifyPrestataire',
        element : <ModifyPrestataire/>
    },
    {
        path : '/PrestataireDashboard/Plans/submitPlan',
        element : <ChoosePlan/>
    },
    {
        path : '/InscriptionPrestataire',
        element : <InscriptionPrestataire/>
    },
    {
        path : '/InscriptionClient',
        element : <InscriptionClient/>
    },
])


