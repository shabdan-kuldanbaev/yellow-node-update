import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import LinkWrapper from 'components/Common/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useBreadcrumbs from './utils/useBreadcrumbs';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Breadcrumbs = (props) => {
  const { breadcrumbs, className } = useBreadcrumbs(props);

  return (
    <ol
      aria-label="breadcrumbs"
      className={className}
    >
      {breadcrumbs.map(({ to, title }, i) => (
        <li key={to}>
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50 * i}
          >
            <LinkWrapper
              path={to}
              className={cn(styles.item, { [styles.activeItem]: i === breadcrumbs.length - 1 })}
            >
              {title}
            </LinkWrapper>
          </Animated>
        </li>
      ))}
    </ol>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
};

export default Breadcrumbs;
