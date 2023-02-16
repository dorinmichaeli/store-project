// Create and switch to the "college" database.
db = db.getSiblingDB('college');

// Load items.
{
  // Load the JSON as raw text.
  const itemsText = cat('./init-data/items.json');
  // Parse the JSON.
  const items = JSON.parse(itemsText);
  // Insert the items into the "items" collection.
  db.items.insert(items);
}

// Load orders.
{
  // Load the JSON as raw text.
  const ordersText = cat('./init-data/orders.json');
  // Parse the JSON.
  const orders = JSON.parse(ordersText);
  // Change date strings to date objects.
  for (const order of orders) {
    order.date = new Date(order.date.$date);
  }
  // Insert the items into the "orders" collection.
  db.orders.insert(orders);
}
