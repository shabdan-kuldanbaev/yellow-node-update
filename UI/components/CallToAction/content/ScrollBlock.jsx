import React from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Button from 'UI/components/Button';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { SVG_IMAGES_TYPES } from 'utils/constants';

import useScrollBlock from '../utils/useScrollBlock';
import styles from '../styles/scrollBlock.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));
const Typography = dynamic(() => import('UI/components/Typography'));
const GetBookModal = dynamic(() => import('UI/components/Modals/GetBookModal'), { ssr: false });

const ScrollBlock = (props) => {
  const {
    titles,
    subtitle,
    downloadLink,
    slug,
    buttonTitle,
    bookCover,
    buttonShow,
    handleClose,
    handleOnClick,
    isGetBookShown,
    toggleGetBookModalShown,
  } = useScrollBlock(props);

  return (
    <>
      <div className={styles.block}>
        <div className={styles.container}>
          <Svg
            className={styles.bookIcon}
            type={SVG_IMAGES_TYPES.bookOpenFilled}
          />

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
            onClick={handleOnClick}
            className={styles.button}
            data-button
            id={`${slug}/get-book`}
          >
            {buttonTitle}
          </Button>

          {buttonShow && (
            <Svg
              className={styles.closeIcon}
              type={SVG_IMAGES_TYPES.closeSvg}
              handleOnClick={handleClose}
            />
          )}
        </div>
      </div>

      <GetBookModal
        show={isGetBookShown}
        close={toggleGetBookModalShown}
        bookCover={bookCover}
        buttonText={buttonTitle}
        downloadLink={downloadLink}
      />
    </>
  );
};

export default ScrollBlock;
