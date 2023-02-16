// TODO: Rename this function and file to describe what it does, not what event it's registered to.

export function createSocketioConnectionHandler(io, connectedUsersService) {
  // The name of the event that the server emits to clients when a new user connects.
  const sendUserCountEvent = 'connected-user-count';
  // The name of the event that the client emits to the server when it wants to
  // immediately know the current user count, rather than it waiting until the
  // count changes.
  const getUserCountEvent = 'get-connected-user-count';

  function emitUserCount(socket = null) {
    if (socket) {
      // Emit to a specific socket.
      socket.emit(sendUserCountEvent, connectedUsersService.getConnectedUserCount());
    } else {
      // Emit to all connected sockets.
      io.sockets.emit(sendUserCountEvent, connectedUsersService.getConnectedUserCount());
    }
  }

  return async (socket) => {
    const userInfo = socket.userInfo;

    if (connectedUsersService.userConnectionAdded(userInfo)) {
      // Whenever a user connects, emit the updated
      // user count to all connected sockets.
      emitUserCount();
    }

    // The client can manually request the user count.
    // This is usually done by the client when it first
    // connects to the server.
    socket.on(getUserCountEvent, () => {
      emitUserCount(socket);
    })

    socket.on('disconnect', () => {
      if (connectedUsersService.userConnectionRemoved(userInfo)) {
        // When a user disconnects, emit the updated user count
        // to all connected sockets.
        emitUserCount();
      }
    });
  };
}
