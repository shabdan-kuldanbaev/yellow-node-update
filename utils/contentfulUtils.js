export const getNearby = async ({ contentfulClient, isOlder, createdAt }) => {
  const nearbyParam = isOlder ? 'fields.createdAt[lt]' : 'fields.createdAt[gt]';
  const order = isOlder ? '-fields.publishedAt' : 'fields.publishedAt';

  return contentfulClient.getEntries({
    contentType: 'article',
    additionalQueryParams: {
      [nearbyParam]: createdAt,
      order,
    },
    limit: 1,
  });
};
