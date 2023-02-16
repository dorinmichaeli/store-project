import {createContext, useContext} from 'react';
import {useAuth, useRole} from '../hooks/auth.hooks.jsx';
import {useSocket} from '../hooks/socket.hooks.jsx';
import {ErrorMessage} from '../components/ErrorMessage.jsx';

export class AppConfig {
  constructor({host}) {
    this.host = host;
  }
}

const AppContext = createContext(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp() must be used within a AppContext.');
  }
  return context;
}

// Contains the app's configuration, user data, and other app-wide services.
export function AppProvider({children, config, firebaseOptions}) {
  const {user, isLoading: authIsLoading, error: authError} = useAuth(firebaseOptions);
  const {socket, isLoading: socketIsLoading, error: socketError} = useSocket(config, user);
  const {data: role, isLoading: roleIsLoading, error: roleError} = useRole(config, user);

  const anyError = authError || socketError || roleError;
  if (anyError) {
    return <ErrorMessage error={anyError}/>;
  }

  const isAnythingLoading = authIsLoading || socketIsLoading || roleIsLoading;
  if (isAnythingLoading) {
    return <p>Loading website...</p>;
  }

  return (
    <AppContext.Provider value={{config, user, socket, role}}>
      {children}
    </AppContext.Provider>
  );
}
