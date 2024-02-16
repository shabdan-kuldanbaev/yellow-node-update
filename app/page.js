import Home from 'containers/Home';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export default async function Page() {
  const { contentModules, metaData } = await getPage(routes.homepage.slug);

  return (
    <Home
      contentModules={contentModules}
      metaData={metaData}
    />
  );
}
