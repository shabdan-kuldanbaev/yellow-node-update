import {
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLoadTagsAndTypesQuery } from 'redux/apis/works';

export default ({
  filters,
  onFiltersChange,
}) => {
  const filtersListRefs = useRef([createRef(), createRef()]);

  const [openedFilter, setOpenedFilter] = useState(null);

  const { data = {} } = useLoadTagsAndTypesQuery();
  const {
    types = [],
    tags = [],
  } = data;

  const getFilterOpenToggleHandler = (name) => () => {
    console.log('🚀 ~ file: useProps.js:24 ~ getFilterOpenToggleHandler ~ name:', name);
    console.log('🚀 ~ file: useProps.js:27 ~ getFilterOpenToggleHandler ~ openedFilter:', openedFilter);

    if (openedFilter === name) {
      return setOpenedFilter(null);
    }

    console.log(123);

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
      const { current: [ref1, ref2] } = (filtersListRefs || {});

      if ((openedFilter) && target !== ref1 && target !== ref2) {
        setOpenedFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openedFilter]);

  return {
    filtersListRefs,
    filters,
    types,
    tags,
    openedFilter,
    getOptionToggleHandler,
    getFilterOpenToggleHandler,
  };
};
