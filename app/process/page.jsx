import ProcessContainer from 'UI/views/Process';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data: { metaData } = {} } = await getPage(routes.process.slug);

  return <ProcessContainer metaData={metaData} />;
}
