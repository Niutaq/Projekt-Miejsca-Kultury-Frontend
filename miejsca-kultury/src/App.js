import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from "./components/userNotLogged/MainPage";
import LoginPage from "./components/userNotLogged/LoginPage";
import InstytucjeKulturalne from "./components/userNotLogged/InstytucjeKulturalne"; 
import CentraKulturalne from "./components/userNotLogged/CentraKulturalne"; 
import CentraNaukowe from './components/userNotLogged/CentraNaukowe';
import MiejscaRekreacyjne from './components/userNotLogged/MiejscaRekreacyjne';
import MiejscaReligijne from './components/userNotLogged/MiejscaReligijne';
import MiejscaHistoryczne from './components/userNotLogged/MiejscaHistoryczne';
import NotLoggedNav from './components/userNotLogged/NotLoggedNav';

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
