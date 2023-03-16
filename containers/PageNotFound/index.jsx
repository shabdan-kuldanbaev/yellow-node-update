import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { selectMetaData } from 'redux/selectors/layout';
import MetaTags from 'components/Common/MetaTags';
import ButtonMore from 'components/Common/ButtonMore';
import { ANIMATED_TYPE, PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import json from './json/Idea.json';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const PageNotFound = ({
  animation,
  metaData: {
    metaTitle,
    metaDescription,
  },
}) => {
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/not-found`,
  };
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
    percentIntersection: 0.1,
  };

  return (
    <>
      <MetaTags
        page={PAGES.notFound}
        pageMetadata={pageMetadata}
      />
      {animation && (
        <div className={styles.pageNotFound}>
          <Animated
            {...animatedProps}
            transitionDelay={300}
          >
            <Animated
              type={ANIMATED_TYPE.isJSON}
              jsonFile={animation}
              className={styles.jsonWrapper}
            />
          </Animated>
          <Animated
            {...animatedProps}
            transitionDelay={250}
          >
            <p>This page could not be found</p>
          </Animated>
          <Animated
            {...animatedProps}
            transitionDelay={200}
          >
            <ButtonMore
              title="BACK TO HOME"
              buttonStyle={styles.button}
              href="/"
            />
          </Animated>
        </div>
      )}
    </>
  );
};

PageNotFound.defaultProps = {
  animation: json,
};

PageNotFound.propTypes = {
  animation: PropTypes.instanceOf(Object),
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({ metaData: selectMetaData(state) }),
)(PageNotFound);
