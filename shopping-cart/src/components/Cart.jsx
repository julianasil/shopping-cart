import React, { useState } from 'react';

const Cart = ({ cart, updateQuantity, onCheckout }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const filteredCart = cart.filter(item => item.quantity > 0);
  const total = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.12;
  const totalWithTax = total + tax;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      setItemToRemove(item);
      setShowModal(true);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const confirmRemoval = () => {
    if (itemToRemove) {
      updateQuantity(itemToRemove.id, 0);
      setItemToRemove(null);
      setShowModal(false);
    }
  };

  const cancelRemoval = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  return (
    <div style={{ fontFamily: 'Courier New, Courier, monospace', color: '#1f8aad', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Cart</h2>
      {filteredCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', color: 'black', borderColor: 'black' }}>
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
                <td style={{ padding: '10px' }}>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item, parseInt(e.target.value))}
                    style={{ width: '60px', padding: '5px' }}
                  />
                </td>
                <td style={{ padding: '10px' }}>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filteredCart.length > 0 && (
        <div style={{ padding: '10px', border: '1px solid #1f8aad', borderRadius: '5px', marginBottom: '20px', color: 'black' }}>
          <h4 style={{ marginBottom: '10px' }}>Subtotal: ${total.toFixed(2)}</h4>
          <h4 style={{ marginBottom: '10px' }}>Tax (12%): ${tax.toFixed(2)}</h4>
          <h4 style={{ marginBottom: '10px' }}>Total with Tax: ${totalWithTax.toFixed(2)}</h4>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {filteredCart.length > 0 ? (
          <button
            onClick={onCheckout}
            style={{
              backgroundColor: '#1f8aad',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Checkout
          </button>
        ) : (
          <button
            disabled
            style={{
              backgroundColor: '#ccc',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              cursor: 'not-allowed',
              borderRadius: '5px',
            }}
          >
            Checkout
          </button>
        )}
      </div>
      {showModal && (
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
            <h3>Remove Item</h3>
            {itemToRemove && (
              <p>
                Are you sure you want to remove <strong>{itemToRemove.title}</strong> from your cart?
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button
                onClick={cancelRemoval}
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
                onClick={confirmRemoval}
                style={{
                  backgroundColor: '#d9534f',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
