import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import SimpleHeader from 'UI/sections/SimpleHeader';
import { useFetchPageQuery } from 'redux/apis/page';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES_WITH_DARK_BREADCRUMBS } from 'utils/constants';
import { isDarkTheme } from './helper';
import styles from './styles.module.scss';

const FullScreenEstimation = dynamic(() => import('components/Common/FullScreenEstimation'), { ssr: false });
const AppDevelopmentCommon = dynamic(
  () => import('components/AppDevelopmentCommon')
    .then((module) => module.AppDevelopmentCommon),
  { ssr: false },
);

const NoIndexPageContainer = ({ introSection, slug, title }) => {
  const { data = {} } = useFetchPageQuery(slug);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  const pageContent = data?.contentModules?.map((module) => ({
    key: module.sys.id,
    section: module,
    type: slug,
    introSection,
    handleOnCTAClick: openFullscreenEstimation,
  }));

  const breadcrumbs = getBreadcrumbs(slug);
  const dark = isDarkTheme(slug);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>
      <main className={classNames({ [styles.dark]: dark })}>
        <SimpleHeader
          breadcrumbs={breadcrumbs}
          dark={dark}
          type={slug}
        />
        {pageContent?.map(({ key, ...rest }) => (
          <AppDevelopmentCommon
            key={key}
            {...rest}
          />
        ))}
      </main>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </>
  );
};

export default NoIndexPageContainer;
