import mongoose from 'mongoose';

export async function getItemsInShoppingCart(modelService, userId) {
  const cart = await modelService.cartModel.findOne(
    // Find the cart of the user.
    {_id: userId},
  ).populate('items');
  // ^^^^ Call [.populate()] to convert the item
  // references to the actual item data.

  if (!cart) {
    // Return an empty array instead of null if
    // the user doesn't have a shopping cart.
    return [];
  }
  // Return the items in the shopping cart.
  return cart.items;
}

export async function addItemToShoppingCart(modelService, userId, itemId) {
  await modelService.cartModel.updateOne(
    // Find the cart of the user.
    {_id: userId},
    // Add the item to the cart.
    {
      $addToSet: {
        items: {_id: itemId},
      },
    },
    // Create the cart if it doesn't exist.
    {upsert: true},
  );
}

export async function removeItemFromShoppingCart(modelService, userId, itemId) {
  await modelService.cartModel.updateOne(
    // Find the cart of the user.
    {_id: userId},
    // Remove the item from the cart.
    // Do nothing if the item is not in the cart.
    {
      $pull: {
        items: itemId,
      },
    },
  );
}

export async function isItemInShoppingCart(modelService, userId, itemId) {
  const cart = await modelService.cartModel.findOne(
    // Find the cart of the user.
    {_id: userId},
  );

  if (!cart) {
    // Return false if the user doesn't have a shopping cart.
    return false;
  }
  // Return true if the item is in the shopping cart.
  return cart.items.includes(itemId);
}

export async function orderCurrentCartItems(modelService, userId, userName, userEmail) {
  const items = await getItemsInShoppingCart(modelService, userId);
  if (items.length === 0) {
    throw new Error('Cannot make order, user has no items in their shopping cart.');
  }

  // Calculate total price of the items in the cart.
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  // Generate a new id for the order.
  const orderId = new mongoose.Types.ObjectId();
  // Create the new order.
  await modelService.orderModel.create({
    _id: orderId,
    userId: userId,
    userName: userName,
    userEmail: userEmail,
    date: new Date(),
    price: totalPrice,
    items: items,
  });
  // Clear the shopping cart.
  await modelService.cartModel.updateOne(
    {_id: userId},
    {items: []},
  );
  // Return the order id.
  return orderId;
}
