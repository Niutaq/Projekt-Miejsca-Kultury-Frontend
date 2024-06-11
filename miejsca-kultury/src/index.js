import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { SessionProvider } from './components/SessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SessionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SessionProvider>
);
