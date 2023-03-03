import { useContext } from 'react';
import cn from 'classnames';
import Button from 'UI/components/Button';
import Typography from 'UI/components/Typography';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { FullscreenEstimationContext } from 'components/Common/FullScreenEstimation';
import styles from '../styles.module.scss';

export default ({
  titles,
  subtitle,
  buttonTitle,
  handleOnClick,
}) => {
  const { open: handleOnCTAClick } = useContext(FullscreenEstimationContext);

  return (
    <>
      <div className={styles.content}>
        {titles?.map((titleText, index) => (
          titleText && (
            <Typography
              variant={TYPOGRAPHY_TAGS.h3}
              size={TYPOGRAPHY_SIZE.headline24}
              className={cn(styles.h3, styles.title)}
              key={`titleText/${index}`}
            >
              {titleText}
            </Typography>
          )
        ))}

        {subtitle && (
          <Typography
            variant={TYPOGRAPHY_TAGS.p}
            className={cn(styles.p, styles.subtitle)}
          >
            {subtitle}
          </Typography>
        )}
      </div>

      <Button
        onClick={handleOnClick || handleOnCTAClick}
        className={styles.button}
        data-button
      >
        {buttonTitle}
      </Button>
    </>
  );
};
