import React, { createContext, ReactNode, useContext, useEffect } from 'react';

import {
  determineAction,
  forgottenPassword,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
} from '@services/auth.service';
import { EventBus, Events } from '@services/bus.service';

import { AuthHookFragment, useAuthHookViewerQuery } from './auth.hooks.generated';

type AuthContextType = {
  viewer: AuthHookFragment | null;
  determineAction: typeof determineAction;
  login: typeof login;
  register: typeof register;
  logout: typeof logout;
  forgottenPassword: typeof forgottenPassword;
  resetPassword: typeof resetPassword;
  updatePassword: typeof updatePassword;
};

const AuthContext = createContext<AuthContextType>(null as unknown as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;

  const viewerQuery = useAuthHookViewerQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'ignore',
  });

  async function handleRefetch() {
    await viewerQuery.refetch();
  }

  useEffect(() => {
    EventBus.on(Events.UnauthorizedError, handleRefetch);

    return () => EventBus.off(Events.UnauthorizedError, handleRefetch);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        viewer: viewerQuery?.data?.viewer || null,
        login,
        register,
        logout,
        forgottenPassword,
        resetPassword,
        updatePassword,
        determineAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export type AuthProviderProps = {
  children: ReactNode;
};
