import {useGetOwnOrderHistory} from '../hooks/app.hooks.jsx';
import {ErrorMessage} from '../components/ErrorMessage.jsx';

// Lets the user see their order history.
export function OrderHistoryPage() {
  const ownHistory = useGetOwnOrderHistory();

  if (ownHistory.isLoading) {
    return <div>Loading your order history...</div>;
  }

  if (ownHistory.error) {
    return <ErrorMessage error={ownHistory.error}/>;
  }

  return (
    <div className="text-center">
      <h1 className="p-4">Your order History</h1>
      <div className="px-5">
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">Order #</th>
            <th scope="col">Price</th>
            <th scope="col">Date</th>
          </tr>
          </thead>
          <tbody>
          {ownHistory.data.map((order) => (
            <tr key={order._id}>
              <th scope="row">{order._id}</th>
              <td>$ {order.price}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
