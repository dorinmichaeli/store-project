import {useAdminGetAllOrdersCountPerDay, useAdminGetAllOrdersFromAllUsers} from '../hooks/app.hooks.jsx';
import {ErrorMessage} from '../components/ErrorMessage.jsx';
import {OrderHistoryChart} from '../components/OrderHistoryChart.jsx';

// Lets the admin see the order history of all users.
// This page is shown only to the admin.
export function AdminPage() {
  const fullHistory = useAdminGetAllOrdersFromAllUsers();
  const ordersCountPerDay = useAdminGetAllOrdersCountPerDay();

  if (fullHistory.error || ordersCountPerDay.error) {
    return <ErrorMessage error={fullHistory.error}/>;
  }

  if (fullHistory.isLoading || ordersCountPerDay.isLoading) {
    return <div>Loading order history of all users...</div>;
  }

  return (
    <div className="text-center pb-4">
      <h1>You're an admin!</h1>
      <h3 className="px-4 pt-4">Orders per day</h3>
      <div><small>Last 14 days</small></div>
      <OrderHistoryChart ordersCountPerDay={ordersCountPerDay.data}/>
      <h3 className="p-4">Shop order History of all users</h3>
      <div className="px-5">
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">Order #</th>
            <th scope="col">User id</th>
            <th scope="col">User name</th>
            <th scope="col">User email</th>
            <th scope="col">Price</th>
            <th scope="col">Date</th>
          </tr>
          </thead>
          <tbody>
          {fullHistory.data.map((order) => (
            <tr key={order._id}>
              <th scope="row">{order._id}</th>
              <td>{order.userId}</td>
              <td>{order.userName}</td>
              <td>{order.userEmail}</td>
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
