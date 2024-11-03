import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import FiltersAside from './pages/FiltersAside';
import ProductList from './components/ProductList';
import CartPage from './pages/CardPage';
import CheckoutPage from './pages/CheckoutPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NotFound } from './pages/Notfound';

const queryClient = new QueryClient();

const CartIcon: React.FC = () => {
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);
  
  return (
    <Link to="/cart" className="relative text-3xl font-bold">
      <AiOutlineShoppingCart />
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-yellow-600 text-white rounded-full px-2 py-1 text-xs">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app-container flex flex-col items-center">
            <nav className="w-full bg-gray-800 p-4 text-white">
              <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">Product List</Link>
                <CartIcon />
              </div>
            </nav>

            <div className="container mx-auto mt-4 flex">
              <aside className="w-1/4 border-r p-4"><FiltersAside /></aside>
              <main className="w-3/4 mt-2 ml-20">
                <Routes>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/products/:page" element={<ProductList />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
