import React, { createContext, useContext, useEffect, useState } from 'react';

type MainContextType = {
  userRole: string | null;
  setUserRole: (role: string) => void;
  loading: boolean;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRoleState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    if (storedRole) {
      setUserRoleState(storedRole);
    }
    setLoading(false);
  }, []);

  const setUserRole = (role: string) => {
    sessionStorage.setItem('userRole', role);
    setUserRoleState(role);
  };


  return (
    <MainContext.Provider value={{ userRole, setUserRole, loading }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMain must be used within a MainProvider');
  }
  return context;
};
