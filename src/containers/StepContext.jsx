// StepContext.js
import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');

  return (
    <StepContext.Provider value={{ step, setStep, role, setRole }}>
      {children}
    </StepContext.Provider>
  );
};
