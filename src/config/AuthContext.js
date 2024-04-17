import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase.js';
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once authentication state is determined
    });

    return unsubscribe;
  }, []);

  // Render loading spinner or placeholder until loading is complete
  if (loading) {
    return <h1> Carregando... </h1>; // Placeholder for loading
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
