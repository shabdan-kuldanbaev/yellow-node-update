const { createClient } = require('contentful-management');

module.exports = class ContentfulManagement {
  constructor(ACCESS_TO_CONTENTFUL_MANAGEMENT) {
    const { space, accessToken } = ACCESS_TO_CONTENTFUL_MANAGEMENT;
    this.SPACE = space;
    this.ACCESS_TOKEN = accessToken;
    console.log('Space and token were received: ', {
      space: this.SPACE,
      accessToken: this.ACCESS_TOKEN,
    });
  }

  getClient = async () => {
    const client = await createClient({
      accessToken: this.ACCESS_TOKEN,
    });
    return client;
  };

  getSpace = async () => {
    const client = await this.getClient();
    const space = await client.getSpace(this.SPACE);
    return space;
  };

  getEnvironment = async (environment) => {
    const client = await this.getClient();
    const space = await client.getSpace(this.SPACE);
    const currentEnvironment = await space.getEnvironment(environment);
    return currentEnvironment;
  };

  getEnvironments = async () => {
    const client = await this.getClient();
    const space = await client.getSpace(this.SPACE);
    const currentEnvironments = await space.getEnvironments();
    return currentEnvironments;
  };

  createEnvironmentWithId = async (environmentName) => {
    try {
      const space = await this.getSpace();
      const environment = await space.createEnvironmentWithId(
        environmentName,
        { name: environmentName },
        'master',
      );
      return environment;
    } catch (error) {
      console.error('createEnvironment error: ', error);
    }
  };

  deleteEnvironment = async (environment) => {
    try {
      const space = await this.getSpace();
      await space
        .getEnvironment(environment)
        .then((environment) => environment.delete())
        .then(() => console.log('Environment deleted.'))
        .catch(console.error);
    } catch (error) {
      console.error('deleteEnvironment error: ', error);
    }
  };

  getEnvironmentAlias = async (environmentAliasId) => {
    try {
      const space = await this.getSpace();
      const environmentAlias = await space.getEnvironmentAlias(
        environmentAliasId,
      );
      return environmentAlias;
    } catch (error) {
      console.error('updateEnvironmentAlias error: ', error);
    }
  };

  updateEnvironmentAlias = async (environmentAliasId, environmentId) => {
    try {
      const space = await this.getSpace();
      const aliasUpdate = await space
        .getEnvironmentAlias(environmentAliasId)
        .then((alias) => {
          alias.environment.sys.id = environmentId;
          return alias.update();
        });
      return aliasUpdate;
    } catch (error) {
      console.error('updateEnvironmentAlias error: ', error);
    }
  };

  createEntry = async (environment, contentTypeId = '', fieldsData = {}, entryId) => {
    try {
      console.log('Create entry');
      const currentEnvironment = await this.getEnvironment(environment);
      let entry = null;
      if (entryId) {
        entry = await currentEnvironment
          .createEntryWithId(contentTypeId, entryId, { ...fieldsData })
          .then((entry) => {
            entry.publish();
            return entry;
          });
      } else {
        entry = await currentEnvironment
          .createEntry(contentTypeId, { ...fieldsData })
          .then((entry) => {
            entry.publish();
            return entry;
          });
      }
      console.log('Entry published.');
      return entry;
    } catch (error) {
      console.error('Entry create error: ', error);
    }
  };

  updateEntry = async (
    environment,
    contentTypeId = '',
    entryId,
    fieldsData = {},
  ) => {
    try {
      const currentEnvironment = await this.getEnvironment(environment);

      currentEnvironment.getEntry(entryId).then(entry => {

          //  const plainObject = entry.toPlainObject();
        
           // The entry is being updated in some way as plainObject:
          entry.fields.oldBody['en-US'] = fieldsData;

          //  console.log(updatedPlainObject);
        
           // Rebuild an sdk object out of the updated plainObject:
          //  const entryWithMethodsAgain = currentEnvironment.getEntryFromData(updatedPlainObject);
        
          //  // Update with help of the sdk method:
          //  entryWithMethodsAgain.update();

          return entry.update();
        
        })
        .then((entry) => console.log(`Entry with id ${entry.sys.id} updated.`) || entry.publish())
        .then((entry) => console.log(`Entry ${entry.sys.id} published.`))
          .catch(console.error);
      // const updatedEntry = await currentEnvironment
      //   .get(contentTypeId, entryId, { ...fieldsData })
      //   .then((entry) => {
      //     entry.publish();
      //     return entry;
      //   });
      // console.log(`Entry with id ${entryId} updated.`);
      // return updatedEntry;
    } catch (error) {
      console.error('Entry update error: ', error.message);
    }
  };

  getEntries = async ({
    environment,
    contentType,
    query = {},
    additionalQueryParams = {},
    searchType = '',
  }) => {
    try {
      const queryParams = Object.entries(query).reduce(
        (resultParams, [queryKey, queryValue]) => ({
          ...resultParams,
          [`fields.${queryKey}${searchType}`]: queryValue,
        }),
        {},
      );
      const currentEnvironment = await this.getEnvironment(environment);
      const entries = await currentEnvironment.getEntries({
        content_type: contentType,
        ...queryParams,
        ...additionalQueryParams,
      });
      console.log('Entries were received.');
      return entries;
    } catch (error) {
      console.error('Entries getting error: ', error);
    }
  };

  deleteEntry = async (environment, entryId = '') => {
    try {
      const currentEnvironment = await this.getEnvironment(environment);
      const entry = await currentEnvironment
        .getEntry(entryId)
        .then((entry) => entry.unpublish())
        .then((entry) => entry.delete());
      console.log('Entry deleted.');
      return entry;
    } catch (error) {
      console.error('Entry delete error: ', error);
    }
  };

  createAsset = async (
    environment,
    assetTitle = 'image',
    assetUrl = '',
    lenguage = 'en-US',
  ) => {
    try {
      const currentEnvironment = await this.getEnvironment(environment);
      const asset = await currentEnvironment
        .createAsset({
          fields: {
            title: {
              [lenguage]: assetTitle,
            },
            file: {
              [lenguage]: {
                contentType: 'image/png',
                fileName: `${assetTitle}.png`,
                upload: assetUrl,
              },
            },
          },
        })
        .then((asset) => asset.processForAllLocales())
        .then((asset) => {
          asset.publish();
          return asset;
        });
      console.log('Asset published.');
      return asset;
    } catch (error) {
      console.error('Asset creation error: ', error.message);
    }
  };

  getAsset = async (environment, assetId = '') => {
    try {
      const currentEnvironment = await this.getEnvironment(environment);
      const asset = await currentEnvironment.getAsset(assetId);
      console.log('Asset were received.');
      return asset;
    } catch (error) {
      console.error('Asset getting error: ', error);
    }
  };

  deleteAsset = async (environment, assetId = '') => {
    try {
      const currentEnvironment = await this.getEnvironment(environment);
      const asset = await currentEnvironment
        .getAsset(assetId)
        .then((asset) => asset.unpublish())
        .then((asset) => asset.delete());
      console.log('Asset deleted.');
      return asset;
    } catch (error) {
      console.error('Asset delete error: ', error);
    }
  };
};

module.exports.contentTypeIds = {
  article: 'article',
};

module.exports.language = {
  en: 'en-US',
};

module.exports.compareFieldsList = [
  'id',
  'body',
  'createdAt',
  'description',
  'headImageContentType',
  'headImageFileName',
  'headImageFileSize',
  'headImageUpdatedAt',
  'headImageUrl',
  'introduction',
  'isFavorite',
  'pageTitle',
  'previewImageContentType',
  'previewImageFileName',
  'previewImageFileSize',
  'previewImageUpdatedAt',
  'previewImageUrl',
  'publishedAt',
  'slug',
  'title',
  'topicId',
  'updatedAt',
  'userId',
].map((field) => field.toUpperCase());
