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

  addToCart = (product, prevState) => {
    this.setState({
      cartProducts: [...prevState, product],
    });
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
            <Cart cartProducts={ cartProducts } />
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
