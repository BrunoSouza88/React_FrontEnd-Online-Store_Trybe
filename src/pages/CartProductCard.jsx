import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartProductCard extends Component {
  render() {
    const {
      addToCart,
      removeFromCart,
      deleteFromCart,
      cartProducts,
      product,
    } = this.props;
    return (
      <div
        data-testid="product"
      >
        <div
          data-testid="product-detail-link"
          type="button"
        >
          <button
            data-testid="remove-product"
            type="button"
            onClick={ () => deleteFromCart(product, cartProducts) }
          >
            X
          </button>
          <p data-testid="shopping-cart-product-name">{product.title}</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{`R$ ${product.price.toFixed(2)}`}</p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ () => removeFromCart(product, cartProducts) }
          >
            -
          </button>
          <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ () => addToCart(product, cartProducts) }
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

CartProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    product: PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
    }),
  })),
};

CartProductCard.defaultProps = {
  cartProducts: [],
};
