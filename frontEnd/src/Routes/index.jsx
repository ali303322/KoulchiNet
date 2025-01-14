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
import Transaction from "../Components/Transaction";
import SendingResponce from "../Components/SendingResponce";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../Components/Unauthorized";
import ModifyClient from "../Components/ModifyClient";
import ConditionGeneral from "../Components/ConditionGeneral";
import PolitiquesPage from "../Components/PolitiquesPage";
import PresHistoryDetails from "../Components/PresHistoryDetails";
import TransactionDetails from "../Components/TransactionDetails";
import ForgotPassword from "../Components/ForgotPassword";
import ChangePassword from "../Components/ChangePassword";
import GestionPaiment from "../Components/GestionPaiment";
import PaimentDetailes from "../Components/PaimentDetailes";
import Chat from "../Components/chat/Chat";

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
        path : '/MotDePasseOublier',
        element : <ForgotPassword/>
    },
    {
        path : '/Modifier-password',
        element : <ChangePassword/>
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
        path : '/Unauthorized',
        element : <Unauthorized/>
    },
    {
        path : '/ConditionGeneral',
        element : <ConditionGeneral/>
    },
    {
        path : '/PolitiqueEtConfidentialite',
        element : <PolitiquesPage/>
    },
    {
        path : '/AdminDashboard',
        element :(
            <ProtectedRoute roleRequired="admin">
                <AdminDashboard/>
            </ProtectedRoute>
        )
    },
    {
        path : '/AdminDashboard/AddProduits',
        element : (
            <ProtectedRoute roleRequired="admin">
                <AddProduit/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/AddContenu',
        element : (
            <ProtectedRoute roleRequired="admin">
                <AddContenu/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/EditProduits/:id', //param
        element : (
            <ProtectedRoute roleRequired="admin">
                <EditProduit/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/EditContenu/:id',
        element : (
            <ProtectedRoute roleRequired="admin">
                <EditContenu/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/UpgradeDemande',
        element : (
            <ProtectedRoute roleRequired="admin">
                <UpgradeDemande/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/EditPrestataire',
        element : (
            <ProtectedRoute roleRequired="admin">
                <ModifyPrestataire/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/DemandeDetails', //param
        element : (
            <ProtectedRoute roleRequired="admin">
                <DemandeDetails/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/DetailsContenu/:id',
        element : (
            <ProtectedRoute roleRequired="admin">
                <DetailsContenu/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/GestionClient',
        element : (
            <ProtectedRoute roleRequired="admin">
                <GestionClient/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/GestionContenu',
        element : (
            <ProtectedRoute roleRequired="admin">
                <GestionContenu/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/GestionProduit',
        element : (
            <ProtectedRoute roleRequired="admin">
                <GestionProduit/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/GestionPrestataire',
        element : (
            <ProtectedRoute roleRequired="admin">
                <GestionPrestataire/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/GestionPaiment',
        element : (
            <ProtectedRoute roleRequired="admin">
                <GestionPaiment/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/PestataireDetails', //param
        element : (
            <ProtectedRoute roleRequired="admin">
                <PresDetails/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/PaimentDetaille/:id', //param
        element : (
            <ProtectedRoute roleRequired="admin">
                <PaimentDetailes/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/ClientDetails', //param
        element : (
            <ProtectedRoute roleRequired="admin">
                <ClientDetails/>
            </ProtectedRoute>)
    },
    {
        path : '/AdminDashboard/TransactionsDetails/:id', //param
        element : (
            <ProtectedRoute roleRequired="admin">
                <TransactionDetails/>
            </ProtectedRoute>)
    },




    {
        path : '/ClientDashboard',
        element : (
            <ProtectedRoute roleRequired="client">
                <ClientDashboard/>
            </ProtectedRoute>
            )
    },
    {
        path : '/ClientDashboard/Review/:id', 
        element : (
            <ProtectedRoute roleRequired="client">
                <Review/>
            </ProtectedRoute>)
    },
    {
        path : '/ClientDashboard/securityClient',
        element : (
            <ProtectedRoute roleRequired="client">
                <SecuriteClient/>
            </ProtectedRoute>)
    },
    {
        path : '/ClientDashboard/HistoriqueClient',
        element : (
            <ProtectedRoute roleRequired="client">
                <HistoriqueClient/>
            </ProtectedRoute>)
    },
    {
        path : '/ClientDashboard/modifyClient',
        element : (
            <ProtectedRoute roleRequired="client">
                <ModifyClient/>
            </ProtectedRoute>)
    },



    {
        path : '/PrestataireDashboard/security',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <Security/>
            </ProtectedRoute>
        )
    },
    {
        path : '/PrestataireDashboard/DetailsHistorie/:id',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <PresHistoryDetails/>
            </ProtectedRoute>
        )
    },
    {
        path : '/PrestataireDashboard',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <PrestataireDashboard/>
            </ProtectedRoute>
        )
    },
    {
        path : '/PrestataireDashboard/Historique',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <HistoriquePres/>
            </ProtectedRoute>
        )
    },
    {
        path : '/PrestataireDashboard/Plans',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <Plans/>
            </ProtectedRoute>
        )
    },
    {
        path : '/PrestataireDashboard/modifyPrestataire',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <ModifyPrestataire/>
            </ProtectedRoute>
        )
    },
    {
        path : '/PrestataireDashboard/Plans/submitPlan',
        element : (
            <ProtectedRoute roleRequired="prestataire">
                <ChoosePlan/>
            </ProtectedRoute>
        )
    },
    {
        path : '/InscriptionPrestataire',
        element :<InscriptionPrestataire/>
    },
    {
        path : '/InscriptionClient',
        element : <InscriptionClient/>
    },

    {
        path : '/AdminDashboard/Transaction',
        element : (
            <ProtectedRoute roleRequired="admin">
                <Transaction/>
            </ProtectedRoute>
        )
    },
    {
        path : '/sendingResponce',
        element : (
            <ProtectedRoute roleRequired="client">
                <SendingResponce/>
            </ProtectedRoute>
        )
    },
    {
        path : '/Chat',
        element :(
            <ProtectedRoute roleRequired={['client','prestataire']}>
            <Chat/>
            </ProtectedRoute>
            )
    },
])


