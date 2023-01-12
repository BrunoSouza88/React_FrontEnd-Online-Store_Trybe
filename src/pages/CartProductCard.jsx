import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartProductCard extends Component {
  render() {
    const { product, quantity } = this.props;
    return (
      <div
        data-testid="product"
      >
        <div
          data-testid="product-detail-link"
          type="button"
        >
          <p data-testid="shopping-cart-product-name">{product.title}</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{`R$ ${product.price.toFixed(2)}`}</p>
          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
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
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};
