export async function getCategories() {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(endPoint);
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPointIdQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const request = await fetch(endPointIdQuery);
  const response = await request.json();
  return response;
}

export async function getProductById(productId) {
  const endPointId = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(endPointId);
  const response = await request.json();
  return response;
}

// const teste = async () => {
//   const teste2 = await getProductById('MLB2623871064');
//   console.log(teste2);
// };

// teste();
