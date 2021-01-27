import { createClient } from 'contentful';
import { ACCESS_TO_CONTENTFUL } from 'utils/constants';

class ContentfulClient {
  constructor(ACCESS_KEYS) {
    const { space, environment, accessToken } = ACCESS_KEYS;
    this.SPACE = space;
    this.ENVIRONMENT = environment;
    this.ACCESS_TOKEN = accessToken;
  }

  getClient = async () => {
    try {
      const client = await createClient({
        space: this.SPACE,
        environment: this.ENVIRONMENT,
        accessToken: this.ACCESS_TOKEN,
        resolveLinks: true,
      });

      return client;
    } catch (error) {
      console.error('Client getting error: ', error);
    }
  };

  getSpace = async () => {
    try {
      const client = await this.getClient();
      const space = await client.getSpace();

      return space;
    } catch (error) {
      console.error('Space getting error: ', error);
    }
  };

  getEntries = async ({
    contentType,
    query = {},
    additionalQueryParams,
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
      const client = await this.getClient();
      const entries = await client.getEntries({
        content_type: contentType,
        ...queryParams,
        ...additionalQueryParams,
        include: 10,
      });

      return entries;
    } catch (error) {
      console.error('Entries getting error: ', error);
    }
  };

  getEntry = async (id, additionalQueryParams) => {
    try {
      const client = await this.getClient();
      const entry = await client.getEntry(id, {
        ...additionalQueryParams,
        include: 10,
      });

      return entry;
    } catch (error) {
      console.error('Get entry error: ', error);
    }
  };
}

export const contentfulClient = new ContentfulClient(ACCESS_TO_CONTENTFUL);
