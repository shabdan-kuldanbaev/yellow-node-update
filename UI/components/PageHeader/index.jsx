import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Breadcrumbs from 'UI/components/Breadcrumbs';
import { formatDate } from 'utils/helper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const PageHeader = ({
  title,
  breadcrumbs,
  titleStyles,
  breadcrumbsStyles,
  breadcrumbsTheme,
  updatedAt,
  type,
  children,
  className,
}) => (
  <>
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      className={breadcrumbsStyles}
      type={type}
      dark={breadcrumbsTheme === 'dark'}
    />
    {title && (
      <div className={cn(styles.titleContainer, { [titleStyles]: titleStyles }, className)}>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          {updatedAt && (
            <p className={styles.updatedAt}>
              {`Last updated: ${formatDate(updatedAt)}`}
            </p>
          )}
          <h1>{title}</h1>
          {children}
        </Animated>
      </div>
    )}
  </>
);

PageHeader.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  breadcrumbs: PropTypes.instanceOf(Array),
  titleStyles: PropTypes.string,
  breadcrumbsStyles: PropTypes.string,
  children: PropTypes.node,
};

export default PageHeader;
