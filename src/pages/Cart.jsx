import React from 'react';
import PropTypes from 'prop-types';
import CartProductCard from './CartProductCard';

function Cart(props) {
  const { addToCart, removeFromCart, deleteFromCart, cartProducts } = props;
  return (
    <div>
      { cartProducts.length !== 0 ? cartProducts
        .map((product) => (
          <div key={ product.id }>
            <CartProductCard
              product={ product }
              cartProducts={ cartProducts }
              addToCart={ addToCart }
              removeFromCart={ removeFromCart }
              deleteFromCart={ deleteFromCart }
            />
          </div>
        )) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
    </div>
  );
}

export default Cart;

Cart.propTypes = {
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

Cart.defaultProps = {
  cartProducts: [],
};
