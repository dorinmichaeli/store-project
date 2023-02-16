import {NavLink} from 'react-router-dom';
import {UserCount} from './UserCount.jsx';
import {useApp} from '../providers/App.provider.jsx';

// The navigation bar at the top of the page.
export function NavBar() {
  const {user, socket, role} = useApp();

  // List of links to display in the navigation bar.
  const navLinks = [
    <NavLink key="home" to="/" className="nav-link">Home</NavLink>,
    <NavLink key="shop" to="/shop" className="nav-link">Shop</NavLink>,
    <NavLink key="cart" to="/cart" className="nav-link">Cart</NavLink>,
    <NavLink key="order-history" to="/order-history" className="nav-link">Orders</NavLink>,
  ];

  // If the user is an admin, add a link to the admin page.
  if (role.role === 'admin') {
    navLinks.push(
      <NavLink key="admin" to="/admin" className="nav-link">Admin</NavLink>
    );
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark ps-2">
      <div className="container-fluid">
        <ul className="navbar-nav">
          {
            navLinks.map((link) => {
              return (
                <li className="nav-item" key={link.key}>
                  {link}
                </li>
              );
            })
          }
        </ul>
        <small className="d-flex text-light me-3">
          Connected as <span className="text-info ps-1">{user.displayName}</span>
          <span className="ps-2 pe-2 text-muted">|</span>
          <UserCount socket={socket}/>
        </small>
      </div>
    </nav>
  );
}
