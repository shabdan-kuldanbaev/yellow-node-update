import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import Breadcrumbs from 'components/Common/Breadcrumbs';
import { formatDate } from 'utils/helper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const PageHeader = ({
  title,
  breadcrumbs,
  titleStyles,
  breadcrumbsStyles,
  updatedAt,
}) => (
  <>
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      breadcrumbsStyles={breadcrumbsStyles}
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
  breadcrumbs: PropTypes.instanceOf(Array),
  titleStyles: PropTypes.string,
  breadcrumbsStyles: PropTypes.string,
};

export default PageHeader;
