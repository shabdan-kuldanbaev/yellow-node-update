import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ScrollIcon } from 'components/HomeCommon/ScrollIcon';
import { SocialIcons } from 'components/HomeCommon/SocialIcons';
import useAppearingAnimation from 'hooks/useAppearingAnimation';
import styles from './styles.module.scss';

export const AddFooter = ({ theme }) => {
  const [direction, isTopOfPage] = useAppearingAnimation();

  return (
    <section className={cn(
      styles.addFooterContainer,
      styles[direction], {
        [styles.notOnTop]: !isTopOfPage,
      },
    )}
    >
      <SocialIcons theme={theme} />
      <ScrollIcon theme={theme} />
    </section>
  );
};

AddFooter.defaultProps = {
  theme: 'dark',
};

AddFooter.propTypes = {
  theme: PropTypes.string,
};
