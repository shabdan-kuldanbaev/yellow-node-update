import React from 'react';
import PropTypes from 'prop-types';
import { getDocumentFields } from 'utils/helper';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getCheckSocialProps } from './utils/checkSocialHelper';
import styles from './styles.module.scss';

export const CheckSocialSection = ({
  sectionData,
  type,
}) => {
  const {
    linkData,
  } = getCheckSocialProps(sectionData);

  const {
    title,
    contentModules: links,
  } = getDocumentFields(linkData);

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
