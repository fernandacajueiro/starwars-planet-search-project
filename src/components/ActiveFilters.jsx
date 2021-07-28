import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function ActiveFilters() {
  const { filterByNumericValues, setFilterByNumericValues } = useContext(PlanetsContext);

  function removeFilters(filtered) {
    setFilterByNumericValues(filterByNumericValues
      .filter((filter) => filter !== filtered));
  }

  function createList() {
    return (
      <fieldset>
        <h4>Filtros ativos</h4>
        <ul>
          { filterByNumericValues.map((filter, index) => (
            <li
              data-testid="filter"
              key={ index }
            >
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                type="button"
                id="remove-filter-button"
                onClick={ () => removeFilters(filter) }
              >
                X
              </button>
            </li>
          )) }
        </ul>
      </fieldset>
    );
  }

  return (
    <div>
      { filterByNumericValues.length > 0 && createList() }
    </div>
  );
}

export default ActiveFilters;
