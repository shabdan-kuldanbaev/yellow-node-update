import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CaseStudyPrototype = ({ data, type }) => {
  const isMobileResolutions = useSelector(selectIsMobileResolutions);

  const contentModules = get(data, 'contentModules');

  if (!contentModules) {
    return null;
  }

  const { url } = getDocumentFields(contentModules[0]);

  return (
    <section className={cn([styles[type]])}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.prototypeWrapper}>
        <div className={styles.prototypeContainer}>
          <iframe
            height={isMobileResolutions ? '650' : '800'}
            width={isMobileResolutions ? '350' : '500'}
            src={`https://www.figma.com/embed?embed_host=astra&url=${url}`}
            title={data.title}
            // eslint-disable-next-line
          allowTransparency
            seamless
          />
        </div>
      </div>
    </section>
  );
};

CaseStudyPrototype.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseStudyPrototype;
