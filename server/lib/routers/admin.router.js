import express from 'express';
import {asyncHandler} from '../tools/asyncHandler.js';
import {createUserAuthMiddleware} from '../middleware/userAuth.middleware.js';
import {createAdminAuthMiddleware} from '../middleware/adminAuth.middleware.js';
import {getAllOrdersFromAllUsers, getOrderCountPerDayLast14Days} from '../controllers/order.controller.js';

export function createAdminRouter(config, modelService, userAuthService) {
  async function getAllOrdersFromAllUsersHandler(req, res) {
    // Get all the orders from all the users.
    const allOrders = await getAllOrdersFromAllUsers(modelService);
    // Return the orders.
    res.json(allOrders);
  }

  async function getAllUsersOrderCountPerDayHandler(req, res) {
    // Get the number of orders per day for the last X days.
    const orderCountPerDay = await getOrderCountPerDayLast14Days(modelService, {daysBack: 14});
    // Return the order count statistics.
    res.json(orderCountPerDay);
  }

  const router = express.Router();
  // Require user authentication for all admin routes.
  router.use(createUserAuthMiddleware(userAuthService));
  // Require admin authentication for all admin routes
  router.use(createAdminAuthMiddleware(config));
  router.get('/all-orders', asyncHandler(getAllOrdersFromAllUsersHandler));
  router.get('/all-orders-count-per-day', asyncHandler(getAllUsersOrderCountPerDayHandler));
  return router;
}
