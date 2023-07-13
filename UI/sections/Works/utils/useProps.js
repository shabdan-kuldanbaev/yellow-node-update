import { useState } from 'react';
import { useLoadTagsAndTypesQuery } from 'redux/apis/works';
import { DEFAULT_WORKS_LIMIT } from 'utils/constants';
import { getLimitedList } from 'utils/helper';
import { filterWorks } from '.';

export default ({ works, initialWorksList }) => {
  const [filteredWorks, setFilteredWorks] = useState(works);
  const [worksDisplay, setWorksDisplay] = useState(initialWorksList);
  const [filters, setFilters] = useState({
    selectedTags: [],
    selectedTypes: [],
  });

  const { data = {} } = useLoadTagsAndTypesQuery();
  const {
    types = [],
    tags = [],
  } = data;

  const hasHiddenItems = worksDisplay.length !== filteredWorks.length;

  function handleFiltersChange({ name, values }) {
    const newFilters = { ...filters, [name]: values };
    setFilters(newFilters);

    const newFilteredWorks = filterWorks(works, newFilters);
    setFilteredWorks(newFilteredWorks);

    const newWorksDisplay = newFilteredWorks.slice(0, DEFAULT_WORKS_LIMIT);
    setWorksDisplay(newWorksDisplay);
  }

  function hendleMoreClick() {
    const newWorksDisplay = getLimitedList(filteredWorks, { limit: worksDisplay.length + DEFAULT_WORKS_LIMIT });
    setWorksDisplay(newWorksDisplay);
  }

  // -------------------------------------------------------------------------------------

  // useEffect(() => () => {
  //   gaHelper.trackEvent(
  //     'Scroll',
  //     `${maxScrollPosition.current}%`,
  //     ROUTES.portfolio.path,
  //     maxScrollPosition.current < 50,
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return {
    filters,
    hasHiddenItems,
    works: worksDisplay,
    handleFiltersChange,
    hendleMoreClick,
  };
};
