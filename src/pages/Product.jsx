import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Product() {
  const location = useLocation();
  const { product } = location.state;
  return (
    <div>
      <p data-testid="product-detail-name">{product.title}</p>
      <img
        src={ product.thumbnail }
        alt={ product.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{`R$ ${product.price.toFixed(2)}`}</p>
      <Link to="/Cart">
        <button
          type="button"
          data-testid="product-detail-button"
        >
          Carrinho de Compras
        </button>
      </Link>
    </div>
  );
}

export default Product;
