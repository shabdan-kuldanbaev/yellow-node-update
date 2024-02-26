import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import MetaTags from 'components/Common/MetaTags';
import ButtonMore from 'components/Common/ButtonMore';
import {
  ANIMATED_TYPE,
  PAGES,
  REVEAL_ANIMATION_PROPS,
} from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { getPage } from 'utils/dataFetching/getPage';
import json from './json/Idea.json';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const PageNotFound = async ({ animation = json }) => {
  const {
    data: {
      metaData: {
        metaTitle,
        metaDescription,
      },
    } = {},
  } = await getPage(PAGES.notFound);

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

PageNotFound.propTypes = {
  animation: PropTypes.instanceOf(Object),
};

export default PageNotFound;
