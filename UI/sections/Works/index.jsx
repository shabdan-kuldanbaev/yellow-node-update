import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Button from 'UI/components/Button';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import withScroll from 'hocs/withScroll';
import Work from 'components/PortfolioCommon/Work';
import WorksFilters from 'UI/components/WorksFilters';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Works = (props) => {
  const {
    works = [],
    hasHiddenItems,
    filters,
    tags,
    types,
    handleMoreClick,
    handleFiltersChange,
  } = useProps(props);

  return (
    <>
      <WorksFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        tags={tags}
        types={types}
      />

      <div className={styles.worksContainer}>
        {works.map((work, i) => (
          <Work
            key={work.slug}
            position={i}
            work={work}
          />
        ))}
      </div>

      {hasHiddenItems && (
        <div className={styles.bottomContainer}>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <Button
              secondary
              onClick={handleMoreClick}
            >
              Load more
            </Button>
          </Animated>
        </div>
      )}
    </>
  );
};

Works.propTypes = {
  works: PropTypes.instanceOf(Array),
  maxScrollPosition: PropTypes.instanceOf(Object).isRequired,
};

export default withScroll(Works);
