import React from 'react';
import PropTypes from 'prop-types';
import CartProductCard from './CartProductCard';

function Cart(props) {
  const { cartProducts } = props;
  return (
    <div>
      { cartProducts.length !== 0 ? cartProducts
        .map((product) => (
          <div key={ product.id }>
            <CartProductCard
              product={ product }
              quantity={ cartProducts
                .filter((xablau) => product.id === xablau.id).length }
            />

            {/* <button
              data-testid="product-add-to-cart"
              type="button"
              onClick={ () => this.addToCart(product, cartProducts) }
            >
              Adicionar ao Carrinho
            </button> */}
          </div>
        )) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
    </div>
  );
}

export default Cart;

Cart.propTypes = {
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
