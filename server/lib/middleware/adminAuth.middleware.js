export function createAdminAuthMiddleware(config) {
  return (req, res, next) => {
    if (!config.admins.includes(req.userInfo.email)) {
      // User is NOT an admin.
      res.status(401).end('Unauthorized, insufficient permissions.');
      return;
    }

    next();
  };
}
