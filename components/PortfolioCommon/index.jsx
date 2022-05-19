import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, PreviewImage } from 'components';
import { withScroll } from 'hocs/withScroll';
import { ROUTES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import gaHelper from 'utils/ga';
import { animatedFields, WORK_TYPES } from './utils';
import { FieldsWrapper } from './FieldsWrapper';
import styles from './styles.module.scss';
import TypeSelector from './TypeSelector';

const Portfolio = ({
  works,
  maxScrollPosition,
  animatedFields: animatedFieldsList,
}) => {
  const [selectedType, setSelectedType] = useState(WORK_TYPES.all);

  const slugs = {
    Fernwayer: 'fernwayer',
    '7pm Thursday': 'seven-pm-thursday',
    Fairy: 'fairy',
  };

  const selectorChangeHandler = useCallback((type) => {
    setSelectedType(WORK_TYPES[type]);
  }, []);

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
    <>
      <TypeSelector
        selectedType={selectedType}
        onSelectedTypeChange={selectorChangeHandler}
      />
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
    </>
  );
};

Portfolio.defaultProps = {
  animatedFields,
  works: [],
};

Portfolio.propTypes = {
  works: PropTypes.instanceOf(Array),
  animatedFields: PropTypes.instanceOf(Array),
  maxScrollPosition: PropTypes.instanceOf(Object).isRequired,
};

export default withScroll(Portfolio);
