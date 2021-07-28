async function fetchPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets';
  const response = await fetch(endpoint);
  const { results } = await response.json();
  results.forEach((result) => delete result.residents);
  return results;
}

export default fetchPlanets;
