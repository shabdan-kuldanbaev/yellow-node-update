import dynamic from 'next/dynamic';
import { memo } from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';
import { ROUTES } from 'utils/constants';
import { useLogo } from './utils/useLogo';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const Logo = (props) => {
  const {
    svgLogoType,
    svgTextLogoType,
  } = useLogo(props);

  return (
    <LinkWrapper
      path={ROUTES.homepage.path}
      className={styles.linkWrapper}
    >
      <>
        <Svg
          type={svgLogoType}
          className={styles.logoImage}
        />
        <Svg
          type={svgTextLogoType}
          className={styles.logoText}
        />
      </>
    </LinkWrapper>
  );
};

Logo.propTypes = {
  type: PropTypes.string,
};

export default memo(Logo);
