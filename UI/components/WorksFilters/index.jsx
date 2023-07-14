import cn from 'classnames';
import Svg from 'UI/components/Svg';
import Checkbox from 'UI/components/Checkbox';
import useProps from './utils/useProps';
import styles from './WorksFilter.module.scss';

export default function WorksFilters(props) {
  const {
    filters,
    types,
    tags,
    openedFilter,
    filtersListRefs,
    getOptionToggleHandler,
    getFilterOpenToggleHandler,
  } = useProps(props);

  return (
    <div className={styles.container}>
      <div
        role="button"
        tabIndex={0}
        className={cn(styles.filter, { [styles.visible]: openedFilter === 'type' })}
        onClick={getFilterOpenToggleHandler('type')}
        ref={filtersListRefs.current[0]}
      >
        <span className={styles.filterTitle}>Types</span>

        <Svg type="chevronDown" />

        <div
          className={styles.filterItems}

        >
          {types.map((type) => (
            <Checkbox
              id={`type/${type.slug}`}
              checked={filters.selectedTypes.includes(type)}
              onChange={getOptionToggleHandler({ filterType: 'selectedTypes', option: type })}
            >
              {type.displayName}
            </Checkbox>
          ))}
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className={cn(styles.filter, { [styles.visible]: openedFilter === 'tag' })}
        onClick={getFilterOpenToggleHandler('tag')}
      >
        <span className={styles.filterTitle}>Tags</span>

        <Svg type="chevronDown" />

        <div
          className={styles.filterItems}
          ref={filtersListRefs.current[1]}
        >
          {tags.map((tag) => (
            <Checkbox
              id={`tag/${tag.slug}`}
              checked={filters.selectedTags.includes(tag)}
              onChange={getOptionToggleHandler({ filterType: 'selectedTags', option: tag })}
            >
              {tag.title}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
}
