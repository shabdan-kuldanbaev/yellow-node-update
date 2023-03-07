import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectMetaData } from 'redux/selectors/layout';
import MetaTags from 'components/Common/MetaTags';
import Animated from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import {
  ANIMATED_TYPE,
  PAGES,
  REVEAL_ANIMATION_PROPS,
} from 'utils/constants';
import { rootUrl } from 'utils/helper';
import json from './json/Idea.json';
import styles from './styles.module.scss';

const PageNotFound = ({ animation }) => {
  const {
    metaTitle,
    metaDescription,
  } = useSelector(selectMetaData);

  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/not-found`,
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
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={300}
          >
            <Animated
              type={ANIMATED_TYPE.isJSON}
              jsonFile={animation}
              className={styles.jsonWrapper}
            />
          </Animated>
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={250}
          >
            <p>This page could not be found</p>
          </Animated>
          <Animated
            {...REVEAL_ANIMATION_PROPS}
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
};

export default PageNotFound;
