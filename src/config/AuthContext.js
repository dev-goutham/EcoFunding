import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { FaSpinner } from "react-icons/fa";
import { reuleaux } from 'ldrs'
const AuthContext = createContext();


reuleaux.register()

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
    return  <l-reuleaux
    size="37"
    stroke="5"
    stroke-length="0.15"
    bg-opacity="0.1"
    speed="1.2" 
    color="black" 
  ></l-reuleaux>; // Placeholder for loading
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
