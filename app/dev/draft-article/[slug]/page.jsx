import DraftArticle from 'containers/DraftArticle';

export default async function Page({ params }) {
  const { slug } = params;

  return <DraftArticle slug={slug} />;
}
