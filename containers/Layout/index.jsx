import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Footer,
  CookiesNotification,
  PageLoading,
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
  const [isBlogLoaded, setBlogLoaded] = useState(false);
  const handleOnBlogLoad = () => setBlogLoaded(true);

  useEffect(() => {
    const isBlogPage = asPath.includes('blog');

    if (!isBlogPage && isBlogOpen) {
      setBlogCurrentStatus(false);
      setFirstVisitOfBlog(false);
    } else if (!isBlogPage) setBlogLoaded(false);
    else if (isBlogPage && !isBlogOpen) setBlogCurrentStatus(true);
  }, [asPath]);

  return (
    <Fragment>
      {!isBlogLoaded && (
        <PageLoading
          isLoading={isLoading}
          isBlogOpen={isBlogOpen}
          handleOnBlogLoad={handleOnBlogLoad}
          asPath={asPath}
        />
      )}
      <CookiesNotification />
      <Header theme={theme} introSection={introSection} />
      {children}
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
