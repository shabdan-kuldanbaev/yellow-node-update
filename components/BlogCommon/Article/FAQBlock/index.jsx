import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { FullLayout } from 'components/Layout/FullLayout';
import { FAQ } from 'components/Common/FAQ';

export const FAQBlock = ({ faqList }) => {
  if (isEmpty(faqList)) {
    return null;
  }

  return (
    <FullLayout
      disableMaxWidth
      disableTopPadding
      disableSidePadding
      disableBottomPadding
    >
      <FAQ faqList={faqList} />
    </FullLayout>
  );
};

FAQBlock.defaultProps = {
  faqList: [],
};

FAQBlock.propTypes = {
  faqList: PropTypes.instanceOf(Array),
};
