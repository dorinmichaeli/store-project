import {
  useItemImageUrl,
  useAddItemToCart,
  useIsItemInCart,
  useRemoveItemFromCart
} from '../hooks/app.hooks.jsx';

// A detailed view of a single item.
export function ItemShowcase({item}) {
  const imageUrl = useItemImageUrl(item);

  return (
    <div className="container mt-3">
      <div className="card p-2 mx-auto text-center" style={{width: '36rem'}}>
        <img alt="" src={imageUrl} style={{height: '20rem', objectFit: 'contain'}}/>
        <div className="card-body">
          <h4 className="card-title">{item.name}</h4>
          <p className="card-text text-secondary small">{item.manufacturer}</p>
          <h4 className="card-text">
            <span className="small">$</span> {item.price}
          </h4>
          <CartControlButton item={item}/>
        </div>
      </div>
    </div>
  );
}

function CartControlButton({item}) {
  const queryCheck = useIsItemInCart(item._id, {enabled: true});
  const queryAdd = useAddItemToCart(item._id, {enabled: false});
  const queryRemove = useRemoveItemFromCart(item._id, {enabled: false});

  async function add() {
    await queryAdd.refetch();
    await queryCheck.refetch();
  }

  async function remove() {
    await queryRemove.refetch();
    await queryCheck.refetch();
  }

  const isAnythingFetching = queryCheck.isFetching || queryAdd.isFetching || queryRemove.isFetching;
  if (isAnythingFetching) {
    return <button type="button" className="btn btn-secondary" disabled={true}>Checking cart status...</button>;
  }

  if (!queryCheck.data.isInCart) {
    return <button type="button" className="btn btn-info" onClick={add}>Add to cart</button>;
  }

  return <button type="button" className="btn btn-danger" onClick={remove}>Remove from cart</button>;
}
