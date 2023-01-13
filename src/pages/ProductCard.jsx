import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <div
        data-testid="product"
      >
        <Link
          to={ {
            pathname: '/Product',
            state: {
              product,
            },
          } }
        >
          <button
            data-testid="product-detail-link"
            type="button"
          >
            <p>{product.title}</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{`R$ ${product.price.toFixed(2)}`}</p>
          </button>
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
