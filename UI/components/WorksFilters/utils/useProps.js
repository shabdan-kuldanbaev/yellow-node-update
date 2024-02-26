import {
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';

export default ({
  filters,
  onFiltersChange,
  tags,
  types,
}) => {
  const filtersListRefs = useRef([createRef(), createRef()]);
  const filtersTogglesRefs = useRef([createRef(), createRef()]);

  const [openedFilter, setOpenedFilter] = useState(null);

  const getFilterOpenToggleHandler = (name) => ({ target }) => {
    const { current: [filterListRef1, fitlerListRef2] } = (filtersListRefs || {});

    const isClickOnChildren = filterListRef1.current.contains(target) || fitlerListRef2.current.contains(target);

    if (isClickOnChildren) {
      return;
    }

    if (openedFilter === name) {
      return setOpenedFilter(null);
    }

    setOpenedFilter(name);
  };

  const getOptionToggleHandler = ({ filterType, option }) => () => {
    const updatedSelection = filters[filterType].includes(option)
      ? filters[filterType].filter((selectedOption) => selectedOption !== option)
      : [...filters[filterType], option];

    onFiltersChange({ name: filterType, values: updatedSelection });
  };

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      const { current: [filterListRef1, fitlerListRef2] } = (filtersListRefs || {});
      const { current: [filterTogglerRef1, filterTogglerRef2] } = (filtersTogglesRefs || {});

      const isClickOnToggler = filterTogglerRef1.current.contains(target) || filterTogglerRef2.current.contains(target);

      if (isClickOnToggler) {
        return;
      }

      const isClickOnChildren = filterListRef1.current.contains(target) || fitlerListRef2.current.contains(target);

      if (!isClickOnChildren) {
        setOpenedFilter(null);
      }
    };

    const handleScroll = () => {
      setOpenedFilter(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [openedFilter]);

  return {
    filtersListRefs,
    filtersTogglesRefs,
    filters,
    types,
    tags,
    openedFilter,
    getOptionToggleHandler,
    getFilterOpenToggleHandler,
  };
};
