import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    name: localStorage.getItem("name") || "",
    surname: localStorage.getItem("surname") || "",
    avatar: localStorage.getItem("avatar") || "",
    token: localStorage.getItem("token") || null,
    //isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  });

  const updateSession = (newSession) => {
    setSession(newSession);
    localStorage.setItem("name", newSession.name);
    localStorage.setItem("surname", newSession.surname);
    localStorage.setItem("avatar", newSession.avatar);
    if (newSession.token) {
      localStorage.setItem("token", newSession.token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
