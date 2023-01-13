import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
    results: [],
    inputValue: '',
    chosenCategory: '',
  };

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const categories = await api.getCategories();
    this.setState({
      categories,
    });
  };

  onSearch = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onCategory = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.renderCategoryProducts);
  };

  renderSearchProducts = async (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    const { results } = await api.getProductsFromCategoryAndQuery('', inputValue);
    this.setState({
      results,
    });
  };

  renderCategoryProducts = async () => {
    const { chosenCategory } = this.state;
    const { results } = await api.getProductsFromCategoryAndQuery(chosenCategory);
    this.setState({
      results,
    });
  };

  // // Modificado de https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-70.php
  // countOccurrences = (arr, val) => arr.reduce((a, v) => (v['id'] === val['id'] ? a + 1 : a), 0);

  // addToCart = (product, prevState) => {
  //   // console.log(prevState.some((cartProduct) => cartProduct.id === product.id));
  //   // if (!prevState.some((cartProduct) => cartProduct.id === product.id)) {
  //   //   this.setState({
  //   //     cartProducts: [...prevState, { product, quantity: 1 }],
  //   //   });
  //   // }

  //   if (this.countOccurrences(prevState, product) > 0) {
  //     // quantity={ cartProducts.filter((xablau) => product.id === xablau.id).length }
  //   } else {
  //     this.setState({
  //       cartProducts: [...prevState, { product, quantity: 1 }],
  //     });
  //   }
  // }

  render() {
    const { categories, results, inputValue } = this.state;
    const { cartProducts, addToCart } = this.props;

    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <form onSubmit={ this.renderSearchProducts }>
          <input
            type="text"
            name="inputValue"
            id="inputValue"
            data-testid="query-input"
            value={ inputValue }
            onChange={ this.onSearch }
          />
          <button
            type="submit"
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </form>
        <Link
          to={ {
            pathname: '/Cart',
          } }
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho de Compras
          </button>
        </Link>
        <div>
          <h2>
            Categorias:
          </h2>
          <div>
            { categories
              .map((category) => (
                <button
                  type="button"
                  data-testid="category"
                  key={ category.id }
                  value={ category.id }
                  name="chosenCategory"
                  onClick={ this.onCategory }
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>

        <div>
          {/* { results[0] === '' ? '' : results.length !== 0 ? results */}
          { results.length !== 0 ? results
            .map((product) => (
              <div key={ product.id }>
                <ProductCard product={ product } />
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => addToCart(product, cartProducts) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>

            )) : 'Nenhum produto foi encontrado'}
        </div>
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    product: PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      price: PropTypes.number,
    }),
  })),
};

Home.defaultProps = {
  cartProducts: [],
};
