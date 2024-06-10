import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    name: Cookies.get('name') || '',
    surname: Cookies.get('surname') || '',
    avatar: Cookies.get('avatar') || '',
    token: Cookies.get('token') || null,
  });

  const updateSession = (newSession) => {
    setSession(newSession);
    Cookies.set('name', newSession.name);
    Cookies.set('surname', newSession.surname);
    Cookies.set('avatar', newSession.avatarUrl);

    //localStorage.setItem("name", data.name);
    //localStorage.setItem("surname", data.surname);
    //localStorage.setItem("avatar", data.avatarUrl);

    if (newSession.token) {
      Cookies.set('token', newSession.token);
      //localStorage.setItem("token", data.accessToken);
    } else {
      Cookies.remove('token');
      //localStorage.removeItem('token');
    }
  };

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
