import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Footer,
  CookiesNotification,
  Loader,
} from 'components';
import { useRouter } from 'next/router';
import { selectIsBlogOpen } from 'redux/selectors/blog';
import { setBlogStatus, setFirstVisit } from 'redux/actions/blog';
import { connect } from 'react-redux';

export const Layout = ({
  isLoading,
  children,
  theme,
  introSection,
  isBlogOpen,
  setBlogStatus: setBlogCurrentStatus,
  setFirstVisit: setFirstVisitOfBlog,
}) => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (asPath.includes('blog') && !isBlogOpen) setBlogCurrentStatus(true);
    if (!asPath.includes('blog') && isBlogOpen) {
      setBlogCurrentStatus(false);
      setFirstVisitOfBlog(false);
    }
  }, [asPath]);

  return (
    <Fragment>
      <CookiesNotification />
      <Header theme={theme} introSection={introSection} />
      <Loader isLoading={isLoading}>
        {children}
      </Loader>
      <Footer theme={theme} />
    </Fragment>
  );
};

Layout.defaultProps = {
  children: {},
};

Layout.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(Object),
  theme: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  isBlogOpen: PropTypes.bool.isRequired,
  setBlogStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isBlogOpen: selectIsBlogOpen(state) });

export default connect(mapStateToProps, { setBlogStatus, setFirstVisit })(Layout);
