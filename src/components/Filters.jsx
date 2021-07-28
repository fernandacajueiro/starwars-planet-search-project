import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Filters.css';

function Filters() {
  const {
    setFilterByName,
    columns,
    setColumns,
    setFilterByNumericValues,
    filterByNumericValues,
    setSortState,
  } = useContext(PlanetsContext);

  const [filterByValues, setFilterByValues] = useState({
    column: 'population',
    comparison: 'menor que',
    value: '0',
  });

  const [sort, setSort] = useState({
    sortColumn: 'name',
    sortType: 'ASC',
  });

  function handleFilterByName({ target: { value } }) {
    setFilterByName({ name: value });
  }

  function handleFilterByValues({ target: { name, value } }) {
    setFilterByValues({
      ...filterByValues,
      [name]: value,
    });
  }

  function handleClick() {
    setFilterByNumericValues([
      ...filterByNumericValues,
      filterByValues,
    ]);
    const initialColumns = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    setColumns(initialColumns.filter((option) => option !== filterByValues.column));
    setFilterByValues({
      ...filterByValues,
      column: columns[0],
    });
  }

  function handleSort({ target: { name, value } }) {
    setSort({
      ...sort,
      [name]: value,
    });
  }

  function handleSortClick() {
    setSortState(sort);
  }

  return (
    <div>
      <div>
        <label htmlFor="filter-name">
          <input
            type="text"
            data-testid="name-filter"
            name="name"
            id="nameInput"
            placeholder="Search for text..."
            onChange={ handleFilterByName }
          />
        </label>

        <label htmlFor="filter-column">
          <select
            data-testid="column-filter"
            name="column"
            id="filter-column"
            onChange={ handleFilterByValues }
          >
            { columns.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
        </label>

        <label htmlFor="filter-comparison">
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="filter-comparison"
            onChange={ handleFilterByValues }
          >
            <option value="menor que">menor que</option>
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="filter-value">
          <input
            type="number"
            data-testid="value-filter"
            name="value"
            id="filter-value"
            min="0"
            onChange={ handleFilterByValues }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          id="filter-button"
          onClick={ handleClick }
        >
          Filter
        </button>
      </div>

      <div>
        <label htmlFor="sort-column">
          <select
            data-testid="column-sort"
            name="sortColumn"
            onChange={ handleSort }
            id="sort-column"
          >
            <option value="name">name</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="climate">climate</option>
            <option value="gravity">gravity</option>
            <option value="terrain">terrain</option>
            <option value="surface_water">surface_water</option>
            <option value="population">population</option>
            <option value="films">films</option>
            <option value="created">created</option>
            <option value="edited">edited</option>
            <option value="url">url</option>
          </select>
        </label>

        <label htmlFor="asc-sort" id="asc-sort">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="sortType"
            onClick={ handleSort }
          />
          Ascendente
        </label>

        <label htmlFor="desc-sort" id="desc-sort">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="sortType"
            onClick={ handleSort }
          />
          Decrescente
        </label>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSortClick }
          id="sort-button"
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default Filters;
