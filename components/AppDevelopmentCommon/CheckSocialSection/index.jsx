import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'UI/components/Svg';
import { getDocumentFields } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getCheckSocialProps } from './utils/checkSocialHelper';
import styles from './styles.module.scss';

const CheckSocialSection = ({
  sectionData,
  type,
}) => {
  const {
    title,
    contentModules: links,
  } = getCheckSocialProps(sectionData);

  return (
    <section className={styles[type]}>
      {links && (
        <div className={styles.linksBlock}>
          <h3 className={styles.linksBlockTitle}>
            {title}
          </h3>
          <div className={styles.linksList}>
            {links && links.map((link) => {
              const {
                slug: linkSvgType,
                title: linkText,
                url,
              } = getDocumentFields(link);

              return (
                <div
                  className={styles.linkContainer}
                  key={`gallery-cta/${linkText}`}
                >
                  <LinkWrapper path={url}>
                    <Svg type={linkSvgType} />
                    <p className={styles.linkText}>
                      {linkText}
                    </p>
                    <Svg
                      type={SVG_IMAGES_TYPES.nearbyArrow}
                      className={styles.arrow}
                    />
                  </LinkWrapper>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

CheckSocialSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CheckSocialSection;
