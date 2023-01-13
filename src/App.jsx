import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';

class App extends React.Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    if (localStorage.cart) {
      const cart = localStorage.getItem('cart');
      const newState = JSON.parse(cart);
      this.setState({
        cartProducts: newState,
      });
    }
  }

  // handleCart

  addToCart = (product, prevState) => {
    if (prevState.some((cartProduct) => cartProduct.id === product.id)) {
      const index = prevState
        .indexOf(prevState
          .find((cartProduct) => cartProduct.id === product.id));
      const newState = prevState;
      newState[index].quantity += 1;
      this.setState({
        cartProducts: newState,
      });
      localStorage.setItem('cart', JSON.stringify(newState));
    } else {
      this.setState({
        cartProducts: [...prevState, { ...product, quantity: 1 }],
      });
      localStorage.setItem(
        'cart',
        JSON.stringify([...prevState, { ...product, quantity: 1 }]),
      );
    }
  };

  removeFromCart = (product, prevState) => {
    const index = prevState
      .indexOf(prevState
        .find((cartProduct) => cartProduct.id === product.id));
    const newState = prevState;
    if (newState[index].quantity > 1) {
      newState[index].quantity -= 1;
    }
    this.setState({
      cartProducts: newState,
    });
    localStorage.setItem('cart', JSON.stringify(newState));
  };

  deleteFromCart = (product, prevState) => {
    const index = prevState
      .indexOf(prevState
        .find((cartProduct) => cartProduct.id === product.id));
    const newState = prevState;
    newState.splice(index, 1);
    this.setState({
      cartProducts: newState,
    });
    localStorage.setItem('cart', JSON.stringify(newState));
  };

  render() {
    const { cartProducts } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home addToCart={ this.addToCart } cartProducts={ cartProducts } />
          </Route>
          <Route exact path="/cart">
            <Cart
              addToCart={ this.addToCart }
              removeFromCart={ this.removeFromCart }
              deleteFromCart={ this.deleteFromCart }
              cartProducts={ cartProducts }
            />
          </Route>
          <Route exact path="/product">
            <Product addToCart={ this.addToCart } cartProducts={ cartProducts } />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
