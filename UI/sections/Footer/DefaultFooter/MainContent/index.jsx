import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from 'UI/components/Typography';
import { FieldsWrapper } from './FieldsWrapper';
import { footerData } from './utils/data';
import styles from './styles.module.scss';

const MainContent = ({ footerData: footerLinksData }) => (
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
        <Typography variant="span" className={styles.title}>
          {title}
        </Typography>
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

export default MainContent;
