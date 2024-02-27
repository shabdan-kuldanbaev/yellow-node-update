import ContactUs from 'UI/views/ContactUs';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export default async function Page() {
  const { data } = await getPage(routes.contact.slug);

  return <ContactUs data={data} />;
}
