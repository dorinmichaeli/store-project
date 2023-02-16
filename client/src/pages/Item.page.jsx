import {useParams} from 'react-router-dom';
import {ItemShowcase} from '../components/ItemShowcase.jsx';
import {ErrorMessage} from '../components/ErrorMessage.jsx';
import {useGetItem} from '../hooks/app.hooks.jsx';

// Lets the user see the details of a single item.
export function ItemPage() {
  // Get the item id from the URL.
  let {itemId} = useParams();
  if (typeof itemId !== 'string') {
    throw new Error('Missing ":itemId" URL param.');
  }

  const {data: item, isLoading, error} = useGetItem(itemId);

  if (isLoading) {
    return <p>Loading data for item "{itemId}"</p>;
  }

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  return <ItemShowcase item={item}/>;
}

