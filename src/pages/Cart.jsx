import React from 'react';
import { useLocation } from 'react-router-dom';
import CartProductCard from './CartProductCard';

function Cart() {
  const location = useLocation();
  const { cartProducts } = location.state;
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
