import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meal from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onOpen={showCartHandler} />
      <Meal />
    </CartProvider>
  );
}

export default App;
