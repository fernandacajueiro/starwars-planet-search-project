import React, { useContext } from 'react';
import Loading from './Loading';
import Filters from './Filters';
import ActiveFilters from './ActiveFilters';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Table.css';

function Table() {
  const {
    planets,
    tableHeaders,
    loading,
    filterByName: { name },
    filterByNumericValues,
    sortPlanets,
    sortState,
  } = useContext(PlanetsContext);

  if (loading) return <Loading />;

  function tableHead() {
    return (
      <tr>
        { tableHeaders.map((header) => (
          <th key={ header }>{header}</th>
        ))}
      </tr>
    );
  }

  function tableRows() {
    let filteredPlanets = planets
      .filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()));

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        if (comparison === 'menor que') {
          filteredPlanets = filteredPlanets
            .filter((planet) => +(planet[column]) < +(value));
        }

        if (comparison === 'maior que') {
          filteredPlanets = filteredPlanets
            .filter((planet) => +(planet[column]) > +(value));
        }

        if (comparison === 'igual a') {
          filteredPlanets = filteredPlanets
            .filter((planet) => +(planet[column]) === +(value));
        }
      });
    }

    if (sortState.sortType === 'ASC') {
      filteredPlanets = sortPlanets(filteredPlanets, sortState.sortColumn);
    } else {
      filteredPlanets = sortPlanets(filteredPlanets, sortState.sortColumn).reverse();
    }

    return filteredPlanets
      .map((planet, index) => (
        <tr key={ index }>
          <td id="planetsName" data-testid="planet-name">{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ));
  }

  return (
    <div>
      <h1>Star Wars Planet Search</h1>

      <Filters />
      <ActiveFilters />

      <table id="planetsTable">
        <thead>
          {tableHead()}
        </thead>

        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
