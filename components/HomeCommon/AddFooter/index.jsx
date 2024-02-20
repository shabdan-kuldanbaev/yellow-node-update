import PropTypes from 'prop-types';
import cn from 'classnames';
import ScrollIcon from 'components/HomeCommon/ScrollIcon';
import useAppearingAnimation from 'hooks/useAppearingAnimation';
import styles from './styles.module.scss';

const AddFooter = () => {
  const [direction, isTopOfPage] = useAppearingAnimation();

  return (
    <section className={cn(
      styles.addFooterContainer,
      styles[direction],
      { [styles.notOnTop]: !isTopOfPage },
    )}
    >
      <ScrollIcon />
    </section>
  );
};

AddFooter.propTypes = {
  theme: PropTypes.string,
};

export default AddFooter;
