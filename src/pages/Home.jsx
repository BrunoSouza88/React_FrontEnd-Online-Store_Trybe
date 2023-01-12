import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
    results: [],
    cartProducts: [],
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

  addToCart = (product, prevState) => {
    this.setState({
      cartProducts: [...prevState, product],
    });
  };

  render() {
    const { categories, results, inputValue, cartProducts } = this.state;

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
            state: {
              cartProducts,
            },
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
                  onClick={ () => this.addToCart(product, cartProducts) }
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
