import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SocialIcons from 'components/HomeCommon/SocialIcons';
import useAppearingAnimation from 'hooks/useAppearingAnimation';
import styles from './styles.module.scss';

const AddFooter = ({ theme }) => {
  const [direction, isTopOfPage] = useAppearingAnimation();

  return (
    <section className={cn(
      styles.addFooterContainer,
      styles[direction],
      { [styles.notOnTop]: !isTopOfPage },
    )}
    >
      <SocialIcons theme={theme} />
      {/* TODO Сommented because the chat button overlaps the icon. Uncomment when the issue with the design is resolved */}
      {/* <ScrollIcon theme={theme} /> */}
    </section>
  );
};

AddFooter.defaultProps = {
  theme: 'dark',
};

AddFooter.propTypes = {
  theme: PropTypes.string,
};

export default AddFooter;
