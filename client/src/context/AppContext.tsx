import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<object[]>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("token", token ? String(token) : "");
  localStorage.setItem("userId", userId ? String(userId) : "");

  return (
    <AppContext.Provider
      value={{ cart, setCart, token, setToken, userId, setUserId }}
    >
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
