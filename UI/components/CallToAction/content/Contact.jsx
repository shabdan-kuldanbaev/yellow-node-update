import { useContext } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Button from 'UI/components/Button';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { FullscreenEstimationContext } from 'components/Common/FullScreenEstimation';
import styles from '../styles.module.scss';

const Typography = dynamic(() => import('UI/components/Typography'));

export default ({
  titles,
  subtitle,
  buttonTitle,
  handleOnClick,
  url,
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
        onClick={!url && (handleOnClick || handleOnCTAClick)}
        className={styles.button}
        href={url}
        data-button
      >
        {buttonTitle}
      </Button>
    </>
  );
};
