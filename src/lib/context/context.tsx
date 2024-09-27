"use client";
import { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext<any>(undefined);

export const AppWrapper = ({ children }: any) => {
  const [searchCity, setSearchCity] = useState("surabaya");

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
