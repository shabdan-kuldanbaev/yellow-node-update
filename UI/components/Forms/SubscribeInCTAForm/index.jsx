import classNames from 'classnames';
import SwiperNavButton from 'UI/components/SwiperNavButton';
import TextField from 'UI/components/TextField';
import useProps from './utils/useProps';
import styles from './SubscribeInCTAForm.module.scss';

const SubscribeInCTAForm = (props) => {
  const {
    register,
    dirtyFields,
    className,
    isButtonDisabled,
    handleButtonClick,
    slug,
  } = useProps(props);

  return (
    <div className={classNames(styles.container, className)}>
      <TextField
        name="email"
        register={register}
        errorMessage="Incorrect email address"
        required={dirtyFields?.email}
        type="email"
        placeholder="Email"
        classname={styles.field}
      />
      <SwiperNavButton
        text="Subscribe"
        type="next"
        className={styles.button}
        disabled={isButtonDisabled}
        onClick={handleButtonClick}
        id={`${slug}/subscribe`}
      />
    </div>
  );
};

export default SubscribeInCTAForm;
