import WhyUs from 'UI/views/WhyUs';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data: { metaData, ...data } = {} } = await getPage(routes.whyUs.slug);

  return (
    <WhyUs
      data={data}
      metaData={metaData}
    />
  );
}
