import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from "./components/userNotLogged/MainPage/MainPage";
import LoginPage from "./components/userNotLogged/LoginPage/LoginPage";
import RegisterPage from "./components/userNotLogged/RegisterPage/RegisterPage";
import ChangePassword from "./components/userNotLogged/ChangePassword/ChangePassword";
import WelcomePage from "./components/userNotLogged/WelcomePage/WelcomePage";
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
import LoggedNav from './components/userLogged/LoggedNav/LoggedNav';
import AdminPanel from './components/adminLogged/AdminPanel/AdminPanel';
import "./App.css";
import { SessionProvider, useSession } from './components/SessionContext';

const AppContent = () => {
  const { session, updateSession } = useSession();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name'); 
    const surname = localStorage.getItem('surname'); 
    const avatar = localStorage.getItem('avatar'); 
    updateSession({
      token,
      name: name || '',
      surname: surname || '',
      avatar: avatar || ''
    });
  }, [updateSession]);

  const router = createBrowserRouter([
    {
      element: session.token ? <LoggedNav name={session.name} surname={session.surname} avatar={session.avatar} /> : <NotLoggedNav />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/changepassword", element: <ChangePassword /> },
        { path: "/welcomepage", element: <WelcomePage /> },
        { path: "/instytucje-kulturalne", element: <InstytucjeKulturalne /> },
        { path: "/centra-kulturalne", element: <CentraKulturalne /> },
        { path: "/centra-naukowe", element: <CentraNaukowe /> },
        { path: "/miejsca-rekreacyjne", element: <MiejscaRekreacyjne /> },
        { path: "/miejsca-religijne", element: <MiejscaReligijne /> },
        { path: "/miejsca-historyczne", element: <MiejscaHistoryczne /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/confirm-account", element: <ConfirmAccount /> },
        { path: "/admin-panel", element: <AdminPanel name={session.name} surname={session.surname} avatar={session.avatar} /> }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

const App = () => {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}

export default App;
