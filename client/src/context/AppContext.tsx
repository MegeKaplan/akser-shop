import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<object[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [count, setCount] = useState(0);

  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <AppContext.Provider value={{ cart, setCart, count, setCount }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
