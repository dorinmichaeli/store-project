import express from 'express';
import {asyncHandler} from '../tools/asyncHandler.js';
import {
  addItemToShoppingCart,
  getItemsInShoppingCart,
  isItemInShoppingCart,
  orderCurrentCartItems,
  removeItemFromShoppingCart
} from '../controllers/cart.controller.js';
import {getAllOrdersOfUser} from '../controllers/order.controller.js';
import {createUserAuthMiddleware} from '../middleware/userAuth.middleware.js';

export function createCartRouter(modelService, userAuthService) {
  const itemIdParam = 'itemId';

  async function addItemToShoppingCartHandler(req, res) {
    // Get item id from query parameter.
    const itemId = req.query[itemIdParam];
    if (!itemId) {
      // Item id is missing.
      res.status(400).end(`Item id is missing.`);
      return;
    }
    // Get the user id from the authenticated user.
    const userId = req.userInfo.uid;
    // Add the item to the shopping cart.
    // TODO: Better error message if item doesn't exist.
    await addItemToShoppingCart(modelService, userId, itemId);
    // Return a success message.
    res.json({message: 'Item added to shopping cart.'});
  }

  async function removeItemFromShoppingCartHandler(req, res) {
    // Get item id from query parameter.
    const itemId = req.query[itemIdParam];
    if (!itemId) {
      // Item id is missing.
      res.status(400).end(`Item id is missing.`);
      return;
    }
    // Get the user id from the authenticated user.
    const userId = req.userInfo.uid;
    // Remove the item from the shopping cart.
    // TODO: Better error message if item doesn't exist.
    await removeItemFromShoppingCart(modelService, userId, itemId);
    // Return a success message.
    res.json({message: 'Item removed from shopping cart.'});
  }

  async function getItemsInShoppingCartHandler(req, res) {
    // Get the user id from the authenticated user.
    const userId = req.userInfo.uid;
    // Get the items in the shopping cart.
    const items = await getItemsInShoppingCart(modelService, userId);
    // Return the items.
    res.json(items);
  }

  async function isItemInShoppingCartHandler(req, res) {
    // Get item id from query parameter.
    const itemId = req.query[itemIdParam];
    if (!itemId) {
      // Item id is missing.
      res.status(400).end(`Item id is missing.`);
      return;
    }
    // Get the user id from the authenticated user.
    const userId = req.userInfo.uid;
    // Check if the item is in the shopping cart.
    const isInCart = await isItemInShoppingCart(modelService, userId, itemId);
    // Return the result.
    res.json({isInCart});
  }

  async function orderCurrentCartItemsHandler(req, res) {
    // Get the user id from the authenticated user.
    const userId = req.userInfo.uid;
    const userName = req.userInfo.name;
    const userEmail = req.userInfo.email;
    // Create a new order.
    const orderId = await orderCurrentCartItems(modelService, userId, userName, userEmail);
    // Return the order id.
    res.json({orderId});
  }

  async function getAllOrdersOfUserHandler(req, res) {
    // Get the user id from the authenticated user.
    const userId = req.userInfo.uid;
    // Get all orders of the user.
    const orders = await getAllOrdersOfUser(modelService, userId);
    // Return the orders.
    res.json(orders);
  }

  const router = express.Router();

  // Require user authentication for all shop routes.
  router.use(createUserAuthMiddleware(userAuthService));

  router.post('/add', asyncHandler(addItemToShoppingCartHandler));
  router.post('/remove', asyncHandler(removeItemFromShoppingCartHandler));
  router.get('/list', asyncHandler(getItemsInShoppingCartHandler));
  router.get('/check', asyncHandler(isItemInShoppingCartHandler));
  router.post('/order', asyncHandler(orderCurrentCartItemsHandler));
  router.get('/order-history', asyncHandler(getAllOrdersOfUserHandler));
  return router;
}
