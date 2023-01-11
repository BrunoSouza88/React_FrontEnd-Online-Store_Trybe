import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.qualquerUm();
  }

  qualquerUm = async () => {
    const categories = await api.getCategories();
    console.log(categories);
    this.setState({
      categories,
    });
  };

  render() {
    const { categories } = this.state;

    return (
      <div>
        <input type="text" name="" id="" />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
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
      </div>
    );
  }
}

export default Home;
