import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import dynamic from 'next/dynamic';
import Images from 'components/CaseStudiesCommon/Images';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import { getBackgroundStyle } from './utils/designHelper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const DesignSection = ({ data, type }) => {
  if (!get(data, 'contentModules')) {
    return null;
  }

  const sectionBackgroundImage = getBackgroundStyle(type, data);

  const { view } = data;

  return (
    <section
      className={cn([styles[type]], [styles[view]])}
      style={sectionBackgroundImage}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      {data.contentModules.map((content, index) => {
        const contentItem = getDocumentFields(content);

        return (
          <div
            key={index}
            className={styles.container}
          >
            {contentItem.title && (
              <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                <h2 className={styles.title}>
                  {contentItem.title}
                </h2>
              </Animated>
            )}
            <Animated
              delay={100}
              {...ANIMATION_CASE_STUDY_PROPS}
            >
              <Images
                data={contentItem}
                type="scaled"
              />
            </Animated>
          </div>
        );
      })}
    </section>
  );
};

DesignSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default DesignSection;
