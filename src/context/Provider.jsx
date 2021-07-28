import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [tableHeaders, setTableHeaders] = useState();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [sortState, setSortState] = useState({
    sortColumn: 'name',
    sortType: 'ASC',
  });

  useEffect(() => {
    async function planetsFromAPI() {
      const results = await fetchPlanets();
      setPlanets(results);
      setTableHeaders(Object.keys(results[0]));
      setLoading(false);
    }
    planetsFromAPI();
  }, []);

  function sortPlanets(planetsSort, selector) {
    let result = planetsSort;
    const magicNumber = -1;
    if (selector === 'name') {
      result = planetsSort.sort((a, b) => {
        if (a[selector] > b[selector]) {
          return 1;
        }
        return magicNumber;
      });
    } else {
      result = planetsSort.sort((a, b) => +(a[selector]) - +(b[selector]));
    }
    return result;
  }

  const context = {
    planets,
    tableHeaders,
    loading,
    filterByName,
    setFilterByName,
    columns,
    setColumns,
    filterByNumericValues,
    setFilterByNumericValues,
    sortState,
    setSortState,
    sortPlanets,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
