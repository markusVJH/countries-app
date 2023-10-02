const filterAndSortCountries = (countries, search, sortBy, reverseOrder) => {
  const sortCountries = (a, b) => {
    let result;
    switch (sortBy) {
      case 'population':
        result = b.population - a.population;
        break;
      case 'area':
        result = b.area - a.area;
        break;
      case 'alphabetical':
      default:
        result = a.name.common.localeCompare(b.name.common);
    }
    return reverseOrder === 'asc' ? result : -result;
  };

  return countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .sort(sortCountries);
};

export default filterAndSortCountries;