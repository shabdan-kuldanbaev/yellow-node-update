import CompanyContainer from 'containers/Company';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data = {} } = await getPage(routes.company.slug);

  return <CompanyContainer data={data} />;
}
