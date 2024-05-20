import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from "./components/userNotLogged/MainPage/MainPage";
import LoginPage from "./components/userNotLogged/LoginPage/LoginPage";
import InstytucjeKulturalne from "./components/userNotLogged/InstytucjeKulturalne/InstytucjeKulturalne"; 
import CentraKulturalne from "./components/userNotLogged/CentraKulturalne/CentraKulturalne"; 
import CentraNaukowe from './components/userNotLogged/CentraNaukowe/CentraNaukowe';
import MiejscaRekreacyjne from './components/userNotLogged/MiejscaRekreacyjne/MiejscaRekreacyjne';
import MiejscaReligijne from './components/userNotLogged/MiejscaReligijne/MiejscaReligijne';
import MiejscaHistoryczne from './components/userNotLogged/MiejscaHistoryczne/MiejscaHistoryczne';
import NotLoggedNav from './components/userNotLogged/NotLoggedNav/NotLoggedNav';
import ResetPassword from './components/userNotLogged/ResetPassword/resetPassword';
import ForgotPassword from './components/userNotLogged/ForgotPassword/forgotPassword';
import ConfirmAccount from './components/userNotLogged/ConfirmAccount/ConfirmAccount';
import "./App.css";

const router = createBrowserRouter([
 {
    
    element: <NotLoggedNav />, 
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/instytucje-kulturalne", element: <InstytucjeKulturalne /> },
      { path: "/centra-kulturalne", element: <CentraKulturalne /> },
      { path: "/centra-naukowe", element: <CentraNaukowe /> },
      { path: "/miejsca-rekreacyjne", element: <MiejscaRekreacyjne /> },
      { path: "/miejsca-religijne", element: <MiejscaReligijne /> },
      { path: "/miejsca-historyczne", element: <MiejscaHistoryczne /> },
      { path: "/forgot-password", element: <ForgotPassword/> },
      { path: "/reset-password", element: <ResetPassword/> },
      { path: "/confirm-account", element: <ConfirmAccount/> }
    ],
 },
]);

function App() {
 return (
    <div>
      <RouterProvider router={router} />
    </div>
 );
}

export default App;
