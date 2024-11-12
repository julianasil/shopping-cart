import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, emptyCart, onClose }) => {
  const [show, setShow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const filteredCart = cart.filter(item => item.quantity > 0);
  const total = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = async () => {
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShow(true);
      emptyCart();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate('/');
  };

  return (
    <div style={{ fontFamily: 'Courier New, Courier, monospace', color: '#1f8aad', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Checkout</h2>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      {filteredCart.length === 0 ? (
        <div style={{ color: '#1f8aad', marginBottom: '20px' }}>Your cart is empty. Please add items to proceed.</div>
      ) : (
        <table style={{ width: '80%', borderCollapse: 'collapse', margin: '0 auto 20px auto' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1f8aad' }}>
              <th style={{ textAlign: 'left', padding: '10px' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Image</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Quantity</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #d9e3f0' }}>
                <td style={{ padding: '10px' }}>{item.title}</td>
                <td style={{ padding: '10px' }}>
                  <img src={item.images[0]} alt={item.title} style={{ width: '50px', marginRight: '10px' }} />
                </td>
                <td style={{ padding: '10px' }}>${item.price.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{item.quantity}</td>
                <td style={{ padding: '10px' }}>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h4 style={{ marginBottom: '20px' }}>Total Payment: ${total.toFixed(2)}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#1f8aad',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handlePay}
          disabled={processing || filteredCart.length === 0}
          style={{
            backgroundColor: processing || filteredCart.length === 0 ? '#ccc' : '#1f8aad',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            cursor: processing || filteredCart.length === 0 ? 'not-allowed' : 'pointer',
            borderRadius: '5px',
          }}
        >
          {processing ? 'Processing...' : 'Pay'}
        </button>
      </div>

      {show && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h3>Payment Successful</h3>
            <p>Your payment was successful!</p>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: '#1f8aad',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
