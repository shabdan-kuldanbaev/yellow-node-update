import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated, PreviewImage } from 'components';
import { withScroll } from 'hocs/withScroll';
import { ROUTES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import gaHelper from 'utils/ga';
import { animatedFields } from './utils';
import { FieldsWrapper } from './FieldsWrapper';
import styles from './styles.module.scss';

const Portfolio = ({
  works,
  maxScrollPosition,
  animatedFields: animatedFieldsList,
}) => {
  const slugs = {
    Fernwayer: 'fernwayer',
    '7pm Thursday': 'seven-pm-thursday',
    Fairy: 'fairy',
  };

  useEffect(() => () => {
    gaHelper.trackEvent(
      'Scroll',
      `${maxScrollPosition.current}%`,
      ROUTES.portfolio.path,
      maxScrollPosition.current < 50,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return works && (
    <div className={styles.worksContainer}>
      {works && works.map((work, index) => {
        const documentFields = getDocumentFields(
          work,
          ['previewImage', 'title', 'description', 'slug'],
        );
        const {
          previewImage,
          title,
          description,
        } = documentFields;
        // TODO: remove this after rebuild works page
        const slug = documentFields.slug || slugs[title];

        return (
          <div
            className={styles.work}
            key={`works/${title}`}
            data-index={index}
          >
            <div className={styles.workWrapper}>
              <div className={styles.desc}>
                {animatedFieldsList && animatedFieldsList.map((animated) => (
                  <Animated
                    {...animated}
                    key={`fields/${title}/${animated.field}`}
                  >
                    <FieldsWrapper
                      animated={animated}
                      title={title}
                      description={description}
                      slug={slug}
                    />
                  </Animated>
                ))}
              </div>
              <PreviewImage image={getFileUrl(previewImage)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

Portfolio.defaultProps = {
  animatedFields,
};

Portfolio.propTypes = {
  works: PropTypes.instanceOf(Array).isRequired,
  animatedFields: PropTypes.instanceOf(Array),
  maxScrollPosition: PropTypes.number.isRequired,
};

export default withScroll(Portfolio);
