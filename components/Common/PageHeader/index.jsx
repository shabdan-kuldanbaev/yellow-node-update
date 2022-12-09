import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import Breadcrumbs from 'UI/components/Breadcrumbs';
import { formatDate } from 'utils/helper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const PageHeader = ({
  title,
  breadcrumbs,
  titleStyles,
  breadcrumbsStyles,
  breadcrumbsTheme,
  updatedAt,
  type,
}) => (
  <>
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      className={breadcrumbsStyles}
      type={type}
      dark={breadcrumbsTheme === 'dark'}
    />
    {title && (
      <div className={cn(styles.titleContainer, { [titleStyles]: titleStyles })}>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          {updatedAt && (
            <p>
              {`Last updated: ${formatDate(updatedAt)}`}
            </p>
          )}
          <h1>{title}</h1>
        </Animated>
      </div>
    )}
  </>
);

PageHeader.defaultProps = {
  title: '',
  breadcrumbs: null,
  titleStyles: '',
  breadcrumbsStyles: '',
};

PageHeader.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.instanceOf(Array),
  titleStyles: PropTypes.string,
  breadcrumbsStyles: PropTypes.string,
};

export default PageHeader;
