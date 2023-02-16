import {useState, useEffect} from 'react';
import {authenticateUserWithFirebase} from '../core/firebaseAuthentication.jsx';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

// A hook that authenticates the user using Firebase and returns
// the user's information as it appears in their Google account.
export function useAuth(firebaseOptions) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authPromise = authenticateUserWithFirebase(firebaseOptions);

    authPromise
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {user, isLoading, error};
}

// Gets the role of the user from the server.
// The role is used to determine what the user can do.
// Can be either 'admin' or 'user'.
export function useRole(config, user) {
  const url = config.host + '/auth/role';

  return useQuery({
    queryKey: ['get-role', user],
    enabled: !!user,
    async queryFn({signal}) {
      const res = await axios(url, {
        headers: {
          'auth': user.accessToken,
        },
        signal,
        method: 'GET',
      });
      return res.data;
    },
  });
}
