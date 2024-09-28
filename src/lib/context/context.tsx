"use client";
import { createContext, useContext, useState } from "react";
const AppContext = createContext<any>(undefined);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [searchCity, setSearchCity] = useState("malang");

  return (
    <AppContext.Provider
      value={{
        searchCity,
        setSearchCity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
