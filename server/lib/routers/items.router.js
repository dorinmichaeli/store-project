import express from 'express';
import {asyncHandler} from '../tools/asyncHandler.js';
import {getItemDetails, searchItems} from '../controllers/items.controller.js';
import {createUserAuthMiddleware} from '../middleware/userAuth.middleware.js';

export function createItemsRouter(modelService, userAuthService) {
  async function getItemDetailsHandler(req, res) {
    // Get item id from query parameter.
    const itemId = req.query['itemId'];
    if (!itemId) {
      // Item id is missing.
      res.status(400).end(`Item id is missing.`);
      return;
    }
    // Try to get the item from the database.
    const item = await getItemDetails(modelService, itemId);
    if (item === null) {
      // Item doesn't exist.
      res.status(404).end(`Item with id "${itemId}" doesn't exist.`);
      return;
    }
    // Return the item.
    res.json(item);
  }

  async function searchItemsHandler(req, res) {
    // Get the search query from query parameters.
    const searchQuery = req.query['searchQuery'];
    if (searchQuery === undefined) {
      // Search query is missing.
      res.status(400).end('Search query is missing.');
      return;
    }

    // Get the search results from the database.
    const items = await searchItems(modelService, searchQuery);
    // Return the search results.
    res.json(items);
  }

  const router = express.Router();

  // Require user authentication for all shop routes.
  router.use(createUserAuthMiddleware(userAuthService));

  router.get('/get', asyncHandler(getItemDetailsHandler));
  router.get('/search', asyncHandler(searchItemsHandler));
  return router;
}
