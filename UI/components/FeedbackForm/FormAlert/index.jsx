import React from 'react';
import { connect } from 'react-redux';
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded';
import Svg from 'UI/components/Svg';
import Animated from 'UI/containers/Animated';
import Typography from 'UI/components/Typography';
import { setIsFormDataSent } from 'redux/actions/contact';
import { selectIsFormDataSent } from 'redux/selectors/contact';
import { REVEAL_ANIMATION_PROPS, SVG_IMAGES_TYPES } from 'utils/constants';
import useAlertProps from './utils/useAlertProps';
import styles from './styles.module.scss';

const FormAlert = (props) => {
  const { handleClose, className } = useAlertProps(props);

  return (
    <div className={className}>
      <Svg
        className={styles.closeIcon}
        handleOnClick={handleClose}
        type={SVG_IMAGES_TYPES.closeSvg}
      />
      <div className={styles.container}>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <Typography className={styles.text}>We have received your request</Typography>
          <Typography className={styles.text}>
            <span>We will back in a flash</span>
            <FlashOnRoundedIcon
              color="primary"
              fontSize="large"
              className={styles.flashIcon}
            />
          </Typography>
        </Animated>
      </div>
    </div>
  );
};

export default connect((state) => ({
  isDataSubmitted: selectIsFormDataSent(state),
}), { setIsFormDataSent })(FormAlert);
