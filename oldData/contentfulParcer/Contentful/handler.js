const get = require('lodash/get');
const dayjs = require('dayjs');
const { cloneDeep } = require('lodash');
const ContentfulManagement = require('./management');
const {
  addFields,
  deleteFieldAndAsset,
  addImageToFields,
} = require('./contentfulUtils');
const { axiosTemporaryClient } = require('./api');

const contentfulManagement = new ContentfulManagement({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const deleteEntriesAndAssets = async (
  environment,
  articles,
  contentfulManagement,
) => {
  if (get(articles, 'total', 0)) {
    for (const article of articles.items) {
      const articleId = get(article, 'sys.id', '');
      const imageId = get(
        article,
        'fields.headImageUrl.sys.id',
        '',
      );
      await deleteFieldAndAsset(
        environment,
        contentfulManagement,
        articleId,
        imageId,
      );
    }
  } else {
    console.log('Entries and assets are empty.');
  }
};

const createEntryAndAsset = async (
  environment,
  contentfulManagement,
  article,
) => {
  console.log('Create entry and asset');

  const imageUrl = `https:${get(article, 'head_image_url', '')}`;
  const previewImageUrl = `https:${get(article, 'preview_url', '')}`;

  const articleImg = imageUrl
    ? await contentfulManagement.createAsset(
      environment,
      get(article, 'slug', ''),
      imageUrl,
      'en-US',
    )
    : '';

  const previewImage = previewImageUrl
    ? await contentfulManagement.createAsset(
      environment,
      get(article, 'slug', ''),
      previewImageUrl,
      'en-US',
    )
    : '';

  const fields = await addFields(article, 'Article', 'en-US', get);

  const fieldsWithImage = await addImageToFields(
    fields,
    'en-US',
    articleImg,
    previewImage,
    get,
  );

  const fieldsData = (imageUrl && previewImageUrl) ? fieldsWithImage : fields;

  await contentfulManagement.createEntry(
    environment,
    'article',
    fieldsData,
  );
};

// const getArticleId = (contentfulPsychics, extId) => contentfulPsychics.find(
//   (psychic) => get(psychic, 'fields.id', '') === extId,
// );

const updateOrCreateEntriesAndAssets = async (
  environmentId,
  contentfulManagement,
  newArticles,
) => {
  const transformedNewArticles = cloneDeep(newArticles).reverse();
  console.log('Sending articles');
  // eslint-disable-next-line no-restricted-syntax
  for (const newArticle of transformedNewArticles) {
    const articleSlug = get(newArticle, 'slug', '');
    try {
      const { data } = await axiosTemporaryClient.get(`posts/${articleSlug}`);

      await createEntryAndAsset(
        environmentId,
        contentfulManagement,
        data,
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log('Unpublish and delete articles and assets...');
};

module.exports.handler = async () => {
  try {
    console.log('handler...');
    const { data } = await axiosTemporaryClient.get('/posts');
    if (data.length) {
      console.log('Check an amount environments...');
      const environments = await contentfulManagement.getEnvironments();
      if (get(environments, 'items').length < 3) {
        console.log('Create a new environment...');
        const environmentName = `master-${dayjs().format('YYYY-MM-DD')}`;
        const createEnvironment = await contentfulManagement.createEnvironmentWithId(
          environmentName,
        );
        const currentEnvironmentId = await get(createEnvironment, 'sys.id', null);
        console.log('Information about new environment: ', {
          environmentName,
          createEnvironment,
          currentEnvironmentId,
        });
        let isUpdateImages = false;
        let numberOfStartsUpdateImages = 0;
        const updateImages = async () => {
          try {
            console.log('Update images...');
            await updateOrCreateEntriesAndAssets(
              currentEnvironmentId,
              contentfulManagement,
              data,
            );
            isUpdateImages = true;
          } catch (error) {
            console.log(error.message);
            if (numberOfStartsUpdateImages < 2) {
              numberOfStartsUpdateImages += 1;
              await updateImages();
            } else return;
          }
        };
        if (currentEnvironmentId) await updateImages();
        if (isUpdateImages) {
          console.log('Update environment alias...');
          const environmentAlias = await contentfulManagement.getEnvironmentAlias(
            'master',
          );
          const currentEnvironmentAliasId = get(
            environmentAlias,
            'environment.sys.id',
            '',
          );
          await contentfulManagement.updateEnvironmentAlias(
            'master',
            currentEnvironmentId,
          );
          console.log('Getting new environment alias...');
          const newEnvironmentAlias = await contentfulManagement.getEnvironmentAlias(
            'master',
          );
          const newCurrentEnvironmentAliasId = get(
            newEnvironmentAlias,
            'environment.sys.id',
            '',
          );
          console.log('Delete old environment alias...');
          if (currentEnvironmentId === newCurrentEnvironmentAliasId) {
            await contentfulManagement.deleteEnvironment(
              currentEnvironmentAliasId,
            );
            console.log('Done');
          } else console.log('Delete old environment failed');
        } else console.log('Failed');
      } else console.log('In progress...');
    }
  } catch (error) {
    console.log(error);
  }
};
