import io from 'socket.io-client';
import {useEffect, useState} from 'react';

// Establish a connection to the server using socket.io.
// The connection is authenticated using the user's access token.
export function useSocket(config, user) {
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      // User not authenticated yet.
      return;
    }

    // Connect to socket.io.
    const userSocket = io(config.host, {
      extraHeaders: {
        auth: user.accessToken,
      }
    });

    // Set the socket when connection is successful.
    userSocket.on('connect', () => {
      setSocket(userSocket);
      setIsLoading(false);
    });

    // Set the error when connection fails.
    userSocket.on('connect_error', (error) => {
      setError(error);
      setIsLoading(false);
    });

    // Disconnect socket on unmount.
    return () => {
      userSocket.disconnect();
    };
  }, [user]);

  return {socket, isLoading, error};
}
