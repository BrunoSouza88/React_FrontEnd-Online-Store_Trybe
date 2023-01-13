import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

function Product(props) {
  const location = useLocation();
  const { product } = location.state;
  const { addToCart, cartProducts } = props;
  console.log(props);
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
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </button>
      </Link>
      <button
        data-testid="product-detail-add-to-cart"
        type="button"
        onClick={ () => addToCart(product, cartProducts) }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default Product;

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    product: PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
    }),
  })),
};

Product.defaultProps = {
  cartProducts: [],
};
