import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FieldsWrapper } from './FieldsWrapper';
import { footerData } from './utils/data';
import styles from './styles.module.scss';

export const MainContent = ({ footerData: footerLinksData }) => (
  <div className={styles.mainContent}>
    {footerLinksData.map(({
      title,
      links,
      type,
    }) => (
      <div
        className={cn(styles.dataContainer, styles[type])}
        key={`footer/${type}`}
      >
        <span className={styles.title}>
          {title}
        </span>
        {links && links.map(({
          title: linkTitle,
          path,
          subtitle,
          type: linkType,
        }) => (
          <Fragment key={`footer-links/${linkTitle || subtitle}`}>
            {linkTitle && (
              <p className={cn(styles.text, styles.main)}>
                {linkTitle}
              </p>
            )}
            {path
              ? (
                <FieldsWrapper
                  type={linkType}
                  path={path}
                  subtitle={subtitle}
                />
              )
              : (
                <p className={styles.text}>
                  {subtitle}
                </p>
              )}
          </Fragment>
        ))}
      </div>
    ))}
  </div>
);

MainContent.defaultProps = {
  footerData,
};

MainContent.propTypes = {
  footerData: PropTypes.instanceOf(Array),
};
