import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
    results: [],
    inputValue: '',
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

  onType = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  onSearch = async () => {
    const { inputValue } = this.state;
    const { results } = await api.getProductsFromCategoryAndQuery('', inputValue);
    this.setState({
      results,
    });
  };

  render() {
    const { categories, results, inputValue } = this.state;

    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <form>
          <input
            type="text"
            name="inputValue"
            id="inputValue"
            data-testid="query-input"
            value={ inputValue }
            onChange={ this.onType }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onSearch }
          >
            Pesquisar
          </button>
        </form>
        <Link to="/Cart">
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
              <div
                data-testid="product"
                key={ product.id }
              >
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt={ product.name } />
                <p>{`R$ ${product.price.toFixed(2)}`}</p>
              </div>
            )) : 'Nenhum produto foi encontrado'}
        </div>
      </div>
    );
  }
}

export default Home;
