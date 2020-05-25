import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Footer,
  CookiesNotification,
  Loader,
} from 'components';
import { useRouter } from 'next/router';
import { selectIsFirstVisit } from 'redux/selectors/blog';
import { setFirstVisit } from 'redux/actions/blog';
import { connect } from 'react-redux';

export const Layout = ({
  isLoading,
  children,
  theme,
  introSection,
  isFirstVisitBlog,
  setFirstVisit: test,
}) => {
  const { asPath } = useRouter();

  useEffect(() => {
    return () => {
      if (!asPath.includes('blog') && isFirstVisitBlog) {
        test(false);
      }
      // console.log('Layout isFirstVisit------------------------', isFirstVisit);
    };
  }, [isFirstVisitBlog, asPath]);

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
  isFirstVisitBlog: PropTypes.bool.isRequired,
  setFirstVisit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isFirstVisitBlog: selectIsFirstVisit(state) });

export default connect(mapStateToProps, { setFirstVisit })(Layout);
