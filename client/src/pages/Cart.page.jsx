import {ErrorMessage} from '../components/ErrorMessage.jsx';
import {ItemList} from '../components/ItemList.jsx';
import {useGetItemsInCart, useOrderCurrentCart} from '../hooks/app.hooks.jsx';
import {useEffect, useState} from 'react';

// Lets the user see the items in their cart and place an order.
export function CartPage() {
  const items = useGetItemsInCart();
  const order = useOrderCurrentCart({enabled: false});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!items.data) {
      return;
    }
    // Calculate the total price of all items in the cart.
    const totalPrice = items.data.reduce((sum, item) => {
      return sum + item.price;
    }, 0);
    setPrice(totalPrice);
  }, [items.data]);

  if (order.data) {
    return (
      <div>
        <h5 className="text-center">Your order was successfully processed.</h5>
        <p className="text-center">Order number: {order.data.orderId}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center p-4">Shopping Cart</h1>
      <CartPageContent items={items} order={order} price={price}/>
    </div>
  );
}

// TODO: Organize this somehow. This content component is kinda weird. (or is it?)
function CartPageContent({items, order, price}) {
  if (items.isFetching) {
    return <p>Loading cart items</p>;
  }

  if (items.error) {
    return <ErrorMessage error={items.error}/>;
  }

  if (order.isFetching) {
    return <p>Processing order...</p>;
  }

  if (order.error) {
    return <ErrorMessage error={order.error}/>;
  }

  if (items.data.length === 0) {
    return <h5 className="text-center">Your shopping cart is empty.</h5>;
  }

  return (
    <>
      <p className="text-center">
        <button type="button" className="btn btn-info" onClick={order.refetch}>Finish order</button>
      </p>
      <p className="text-center">Total price: $ {price.toFixed(2)}</p>
      <ItemList items={items.data}/>
    </>
  );
}
