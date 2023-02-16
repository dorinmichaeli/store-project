export function socketioUserAuthMiddleware(userAuthService) {
  return (socket, next) => {
    let token = socket.handshake.headers.auth;
    if (!token) {
      next(new Error('Unauthorized, no token provided.'));
      return;
    }
    if (Array.isArray(token)) {
      // If multiple "auth" headers are provided, use the first one.
      token = token[0];
    }

    userAuthService.firebaseAuth.verifyIdToken(token)
      .then(decoded => {
        // decoded -> firebase.auth.DecodedIdToken
        socket.userInfo = decoded;
        next();
      })
      .catch(_error => {
        next(new Error('Unauthorized, no token provided.'));
      });
  };
}
