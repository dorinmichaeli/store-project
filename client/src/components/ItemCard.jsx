import {useNavigate} from 'react-router-dom';
import {useItemImageUrl} from '../hooks/app.hooks.jsx';

// A minimal view of a single item, used when
// multiple items are displayed side by side.
export function ItemCard({item}) {
  const navigate = useNavigate();
  const imageUrl = useItemImageUrl(item);

  function viewItem() {
    const url = '/shop/' + item._id;
    navigate(url);
  }

  return (
    <div className="card m-2" style={{width: '18rem'}} onClick={viewItem}>
      <img alt="" src={imageUrl} style={{height: '10rem', objectFit: 'contain'}}/>
      <div className="card-body mt-4">
        <h4 className="card-text">
          <span className="small">$</span> {item.price}
        </h4>
        <div className="card-title">{item.name}</div>
        <div className="card-text text-secondary small">{item.manufacturer}</div>
      </div>
      <div className="card-footer text-muted small">{item.tags.join(', ')}</div>
    </div>
  );
}
