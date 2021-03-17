import React, { createContext } from 'react';
import useUserAuthentication from '../hooks/useUserAuthentication';
import { ReactChildrenComponent } from '../types';

type UserContextData = {
  user: ReturnType<typeof useUserAuthentication>['0'],
  setUser: ReturnType<typeof useUserAuthentication>['1'],
};

export const UserContext = createContext<UserContextData>({
  user: null,
  setUser: (_) => {
  },
});

export const UserProvider = ({ children }: { children: ReactChildrenComponent }) => {
  const [user, setUser] = useUserAuthentication();

  return (
    <UserContext.Provider value={{
      user,
      setUser,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};
