import { createClient } from 'contentful';

class ContentfulClient {
  constructor(SERVER_DATA) {
    if (!SERVER_DATA && typeof window !== 'undefined') {
      this.SERVER_DATA = process.env;
    } else {
      this.SERVER_DATA = SERVER_DATA;
    }
  }

  getClient = async () => {
    const client = await createClient({
      space: process.env.CONTENTFUL_SPACE,
      environment: process.env.CONTENTFUL_ENV,
      accessToken: process.env.CONTENTFUL_TOKEN,
      resolveLinks: true,
    });
    return client;
  };

  getSpace = async () => {
    const client = await this.getClient();
    const space = await client.getSpace();
    return space;
  };

  getEntries = async ({ contentType, query = {}, additionalQueryParams }) => {
    const queryParams = Object.entries(query).reduce((resultParams, [queryKey, queryValue]) => (
      { ...resultParams, [`fields.${queryKey}`]: queryValue }
    ), {});
    const client = await this.getClient();
    const entries = await client.getEntries({
      content_type: contentType,
      ...queryParams,
      ...additionalQueryParams,
      include: 10,
    });
    return entries;
  };

  getEntry = async (id, additionalQueryParams) => {
    const client = await this.getClient();
    const entry = await client.getEntry(id, {
      ...additionalQueryParams,
      include: 10,
    });
    return entry;
  };

  loadContentTypes = async () => {
    const contentTypes = await this.client.getContentTypes();
    return contentTypes;
  };

  getAsset = async (id, additionalQueryParams) => {
    const client = await this.getClient();
    const asset = await client.getAsset(id, {
      ...additionalQueryParams,
    });
    return asset;
  }
}

export const contentfulClient = new ContentfulClient();
