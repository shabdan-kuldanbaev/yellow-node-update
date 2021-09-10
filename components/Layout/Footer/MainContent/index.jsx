import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FieldsWrapper } from './FieldsWrapper';
import { footerData } from './utils/data';
import styles from './styles.module.scss';

export const MainContent = ({ footerData: footerLinksData }) => (
  <div className={styles.mainContent}>
    {footerLinksData.map(({ title, links }) => (
      <div className={cn(styles.dataContainer)}>
        <h3 className={styles.title}>{title}</h3>
        {links && links.map(({
          title: linkTitle,
          path,
          subtitle,
          type,
        }) => (
          <Fragment>
            {linkTitle && (
              <p className={cn(styles.text, styles.main)}>
                {linkTitle}
              </p>
            )}
            {path
              ? (
                <FieldsWrapper
                  type={type}
                  path={path}
                  subtitle={subtitle}
                />
              )
              : <p className={styles.text}>{subtitle}</p>}
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
