import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 32;

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1000);
  };

  return (
    <div style={{ backgroundColor: '#001f3f', padding: '20px', borderRadius: '10px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filter products by name"
          value={filter}
          onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {currentProducts.map(product => (
            <div key={product.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <img src={product.images[0]} alt={product.title} style={{ borderRadius: '5px', marginBottom: '10px' }} />
              <h4 style={{ marginBottom: '10px' }}>{product.title}</h4>
              <p style={{ flexGrow: '1', marginBottom: '10px' }}>${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={addedToCart === product.id}
                style={{
                  backgroundColor: addedToCart === product.id ? '#6c757d' : '#007bff',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: addedToCart === product.id ? 'not-allowed' : 'pointer',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {addedToCart === product.id ? "Added!" : <FontAwesomeIcon icon={faShoppingCart} />}
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => paginate(1)} disabled={currentPage === 1} style={{ margin: '0 5px' }}>
          First
        </button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{ margin: '0 5px' }}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx + 1} onClick={() => paginate(idx + 1)} disabled={idx + 1 === currentPage} style={{ margin: '0 5px' }}>
            {idx + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{ margin: '0 5px' }}>
          Next
        </button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} style={{ margin: '0 5px' }}>
          Last
        </button>
      </div>
    </div>
  );
};

export default ProductList;
