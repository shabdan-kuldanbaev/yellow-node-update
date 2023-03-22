import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Illustration from 'UI/components/Illustration';
import Table from 'components/Common/Table';
import ButtonMore from 'components/Common/ButtonMore';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const PlainTextSection = (props) => {
  const {
    title,
    description,
    subtitle,
    view,
    type,
    text,
    imageUrl,
    tableContent,
    tableType,
    hasSeeMoreButton,
    onClickMoreButton,
    isSeeMore,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.plainText, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <SectionTitle
            title={title}
            subtitle={subtitle}
            description={description}
            titleStyle={styles.titleStyle}
          />
          {text && (
            <Animated {...REVEAL_ANIMATION_PROPS}>
              <div className={cn(styles.text, { [styles.seeMore]: isSeeMore })}>
                <ContentfulParser document={text} />
              </div>
            </Animated>
          )}
          {hasSeeMoreButton && (
            <ButtonMore
              title="See more"
              buttonStyle={styles.seeMoreButton}
              handleOnClick={onClickMoreButton}
            />
          ) }
          {tableContent && tableType && (
            <Animated {...REVEAL_ANIMATION_PROPS}>
              <div className={styles.text}>
                <Table
                  tableData={tableContent.tableData}
                  type={tableType}
                />
              </div>
            </Animated>
          )}
        </div>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          {imageUrl && (
            <Illustration
              src={imageUrl}
              className={styles.pageImage}
              transparent
              priority
            />
          )}
        </Animated>
      </div>
    </section>
  );
};

PlainTextSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlainTextSection;
