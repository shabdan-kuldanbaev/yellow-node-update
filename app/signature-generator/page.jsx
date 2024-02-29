import SignatureGenerator from 'containers/Signature';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function Page() {
  const { data } = await getPage(routes.signatureGenerator.slug);

  return <SignatureGenerator data={data} />;
}
