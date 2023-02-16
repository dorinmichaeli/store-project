import {useEffect, useState} from 'react';

// Show the number of users currently connected to the server.
export function UserCount({socket}) {
  const [userCount, setUserCount] = useState('unknown');

  useEffect(() => {
    // The name of the event that the server emits to clients when a new user connects.
    const receiveUserCountEvent = 'connected-user-count';
    // The name of the event that the client emits to the server when it wants to
    // immediately know the current user count, rather than it waiting until the
    // count changes.
    const getUserCountEvent = 'get-connected-user-count';

    const updateCount = count => {
      setUserCount(count);
    };

    // Update the user count when the server lets us know that it has changed.
    socket.on(receiveUserCountEvent, updateCount);

    // Ask the server for the current user count.
    socket.emit(getUserCountEvent);

    return () => {
      // Clean up on unmount.
      socket.off(receiveUserCountEvent, updateCount);
    };
  }, []);

  return (
    <span>{userCount} users online</span>
  );
}
