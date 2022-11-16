import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useBreadcrumbs from './utils/useBreadcrumbs';

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
            transitionDelay={100 * i}
          >
            <LinkWrapper path={to}>
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
};

export default Breadcrumbs;
