import { useState } from 'react';
import { DEFAULT_WORKS_LIMIT } from 'utils/constants';
import { getLimitedList } from 'utils/helper';
import { filterWorks } from '.';

export default ({ works, ...rest }) => {
  const [filteredWorks, setFilteredWorks] = useState(works);
  const [worksDisplay, setWorksDisplay] = useState(works.slice(0, DEFAULT_WORKS_LIMIT));
  const [filters, setFilters] = useState({
    selectedTags: [],
    selectedTypes: [],
  });

  const hasHiddenItems = worksDisplay.length !== filteredWorks.length;

  function handleFiltersChange({ name, values }) {
    const newFilters = { ...filters, [name]: values };
    setFilters(newFilters);

    const newFilteredWorks = filterWorks(works, newFilters);
    setFilteredWorks(newFilteredWorks);

    const newWorksDisplay = newFilteredWorks.slice(0, DEFAULT_WORKS_LIMIT);
    setWorksDisplay(newWorksDisplay);
  }

  function handleMoreClick() {
    const newWorksDisplay = getLimitedList(filteredWorks, { limit: worksDisplay.length + DEFAULT_WORKS_LIMIT });
    setWorksDisplay(newWorksDisplay);
  }

  return {
    filters,
    hasHiddenItems,
    works: worksDisplay,
    handleFiltersChange,
    handleMoreClick,
    ...rest,
  };
};
