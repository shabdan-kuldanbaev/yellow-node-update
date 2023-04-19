import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import HomeIntro from 'UI/sections/HomeIntro';
import MetaTags from 'components/Common/MetaTags';
import { PAGES } from 'utils/constants';

const SectionSelector = dynamic(() => import('containers/Home/SectionSelector'));

export const Home = ({
  theme,
  introSection,
  pageMetadata,
  pageData,
  type,
  ...rest
}) => {
  const contentModules = pageData;

  return (
    <>
      <MetaTags
        page={PAGES.homepage}
        pageMetadata={pageMetadata}
      />
      <HomeIntro
        theme={theme}
        introSection={introSection}
      />
      {contentModules?.map((module, i) => (
        <SectionSelector
          key={`section/${i}`}
          section={module}
          type={type}
          {...rest}
        />
      ))}
    </>
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  pageMetadata: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Home;
