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
    works,
    hasHiddenItems,
    filters,
    hendleMoreClick,
    handleFiltersChange,
  } = useProps(props);

  return (
    <>
      <WorksFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
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
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <Button
            className={styles.showMoreButton}
            onClick={hendleMoreClick}
            secondary
          >
            Load more
          </Button>
        </Animated>
      )}
    </>
  );
};

Works.defaultProps = {
  works: [],
};

Works.propTypes = {
  works: PropTypes.instanceOf(Array),
  maxScrollPosition: PropTypes.instanceOf(Object).isRequired,
};

export default withScroll(Works);
