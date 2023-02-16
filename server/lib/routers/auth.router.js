import {createUserAuthMiddleware} from '../middleware/userAuth.middleware.js';
import express from 'express';

export function createAuthRouter(config, userAuthService) {
  function checkUserRole(req, res) {
    // Check if the user's email is listed in the admin list.
    const isAdmin = config.admins.includes(req.userInfo.email);
    // If it is - the user is an admin!
    const role = isAdmin ? 'admin' : 'user';
    // Send the role back to the client.
    res.json({
      role: role,
    });
  }

  const router = express.Router();
  // Require user authentication for all auth routes.
  router.use(createUserAuthMiddleware(userAuthService));
  // Let the users shut their mouth and know their role!
  router.get('/role', checkUserRole);
  return router;
}
