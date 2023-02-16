import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useApp} from '../providers/App.provider.jsx';
import {HomePage} from '../pages/Home.page.jsx';
import {ShopPage} from '../pages/Shop.page.jsx';
import {CartPage} from '../pages/Cart.page.jsx';
import {ItemPage} from '../pages/Item.page.jsx';
import {OrderHistoryPage} from '../pages/OrderHistory.page.jsx';
import {AdminPage} from '../pages/Admin.page.jsx';
import {NavBar} from './NavBar.jsx';

// The main application component.
export function App() {
  const {role} = useApp();

  const availableRoutes = [
    <Route key="home" path="/" element={<HomePage/>}/>,
    <Route key="shop" path="/shop" element={<ShopPage/>}/>,
    <Route key="cart" path="/cart" element={<CartPage/>}/>,
    <Route key="item" path="/shop/:itemId" element={<ItemPage/>}/>,
    <Route key="order-history" path="/order-history" element={<OrderHistoryPage/>}/>,
  ];

  if (role.role === 'admin') {
    availableRoutes.push(
      <Route key="admin" path="/admin" element={<AdminPage/>}/>
    );
  }

  return (
    <BrowserRouter>
      <section>
        <NavBar/>
      </section>
      <section className="m-2">
        <Routes>
          {availableRoutes}
        </Routes>
      </section>
    </BrowserRouter>
  );
}
