import {ItemList} from '../components/ItemList.jsx';
import {ErrorMessage} from '../components/ErrorMessage.jsx';
import {useGetItemsSearch} from '../hooks/app.hooks.jsx';
import {useState} from 'react';

// Lets the user view the items available for ordering,
// and search also for specific items.
export function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const query = useGetItemsSearch(searchQuery);

  // Apply search query when the user presses the
  // Enter key while the search field is focused.
  function onInputKey(event) {
    const key = event.key;
    if (key !== 'Enter') {
      return;
    }
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  }

  // Apply search query when the search field loses focus.
  function onInputLoseFocus(event) {
    console.log(event);
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  }

  return (
    <div>
      <h1 className="text-center p-4">Shop</h1>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Search products . . ."
          onKeyUp={onInputKey}
          // Note: "onBlur" is triggered when the input loses focus.
          onBlur={onInputLoseFocus}
        />
      </div>
      <ShopPageContent query={query}/>
    </div>
  );
}

function ShopPageContent({query}) {
  const {data: items, isLoading, error} = query;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  return <ItemList items={items}/>;
}
