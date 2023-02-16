export function createConnectedUsersService() {
  const connectedUsers = new Map();

  return {
    // Return the number of unique connected users.
    getConnectedUserCount() {
      return connectedUsers.size;
    },
    // Increment the connection count for a specific user.
    // Return true if this is the first connection made by that user, false otherwise.
    userConnectionAdded(userInfo) {
      let counter = connectedUsers.get(userInfo.uid);
      if (!counter) {
        counter = {count: 0};
        connectedUsers.set(userInfo.uid, counter);
      }
      counter.count++;
      return counter.count === 1;
    },
    // Decrement the connection count for a specific user.
    // Return true if this is the last connection held by the user, false otherwise.
    userConnectionRemoved(userInfo) {
      let counter = connectedUsers.get(userInfo.uid);
      counter.count--;
      if (counter.count === 0) {
        connectedUsers.delete(userInfo.uid);
      }
      return counter.count === 0;
    },
  };
}
