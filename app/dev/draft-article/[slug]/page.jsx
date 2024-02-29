import { notFound } from 'next/navigation';
import DraftArticle from 'containers/DraftArticle';
import { getDraftArticle } from 'utils/dataFetching/getDraftArticle';

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function Page({ params }) {
  const { slug } = params;

  const { data: article } = await getDraftArticle(slug);

  if (!article) {
    notFound();
  }

  return <DraftArticle article={article} />;
}
