import PageNotFound from 'containers/PageNotFound';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data: { metaData } = {} } = await getPage(routes.notFound.slug);

  return <PageNotFound metaData={metaData} />;
}
