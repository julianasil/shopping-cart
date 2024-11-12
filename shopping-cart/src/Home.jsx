import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList'; 
import Cart from './components/Cart'; 

const HomePage = ({ cart, addToCart, updateQuantity }) => {
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div
      style={{
        fontFamily: 'Courier New, Courier, monospace',
        backgroundColor: '#d9e3f0', 
        color: '#1f8aad',
        minHeight: '100vh',
        padding: '20px',
        margin: '0',
        width: '100%',
      }}
    >
      <div style={{ backgroundColor: '#1f8aad', color: '#fff', padding: '10px 20px', textAlign: 'center', borderRadius: '5px' }}>
        <h1>Shopping Cart</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', marginTop: '20px' }}>
        <div style={{ flex: '2' }}>
          <ProductList addToCart={addToCart} />
        </div>
        <div style={{ flex: '1' }}>
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            onCheckout={goToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
