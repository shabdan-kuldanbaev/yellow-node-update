import PropTypes from 'prop-types';
import get from 'lodash/get';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import LinkWrapper from 'components/Common/LinkWrapper';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

export const EventSection = ({ type, data }) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = data;
  const {
    contentModules: links,
    title: listTitle,
  } = getDocumentFields(get(contentModules, '[0]', []));
  const imageUrl = getFileUrl(get(images, '[0]', ''));

  return (
    <section className={styles[type]}>
      <Animated
        delay={100}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles.sectionIntro}>
          <h3 className={styles.sectionTitle}>
            {title}
          </h3>
          <p className={styles.sectionDescription}>
            {description}
          </p>
        </div>
      </Animated>
      <Animated
        delay={150}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles.imageContainer}>
          <Illustration
            layout="responsive"
            src={imageUrl}
            alt={type}
          />
        </div>
      </Animated>
      <Animated
        delay={200}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles.sectionContent}>
          <h3 className={styles.contentTitle}>
            {listTitle}
          </h3>
          {links && links.map((module) => {
            const {
              title: linkTitle,
              url,
            } = getDocumentFields(module);

            return (
              <LinkWrapper path={url}>
                &#8226;
                {` ${linkTitle}`}
              </LinkWrapper>
            );
          })}
        </div>
      </Animated>
    </section>
  );
};

EventSection.defaultProps = {
  type: '',
};

EventSection.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};
