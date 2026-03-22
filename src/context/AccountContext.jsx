import { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  // Global balance state, starting at 25,000
  const [balance, setBalance] = useState(25000);

  return (
    <AccountContext.Provider value={{ balance, setBalance }}>
      {children}
    </AccountContext.Provider>
  );
};