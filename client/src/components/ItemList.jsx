import {ItemCard} from './ItemCard';

// A list of multiple items, displayed side by side.
export function ItemList({items}) {
  return (
    <div className="d-flex flex-wrap m-2">
      {
        items.length === 0
          ? <p>No items found</p>
          : items.map(item => (
            <ItemCard key={item._id} item={item}/>
          ))}
    </div>
  );
}
