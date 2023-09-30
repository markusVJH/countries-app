const filterAndSortCountries = (countries, search, sortBy) => {
  const sortCountries = (a, b) => {
    switch (sortBy) {
      case 'population':
        return b.population - a.population;
      case 'area':
        return b.area - a.area;
      case 'alphabetical':
      default:
        return a.name.common.localeCompare(b.name.common);
    }
  };

  return countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .sort(sortCountries);
};

export default filterAndSortCountries;