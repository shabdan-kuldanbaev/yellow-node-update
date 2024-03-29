import axios from 'axios';
import { createClient } from 'contentful';
import {
  ACCESS_TO_CONTENTFUL,
  ACCESS_TO_CONTENTFUL_PREVIEW,
  ACCESS_TO_CONTENTFUL_BLOG,
  ACCESS_TO_CONTENTFUL_BLOG_PREVIEW,
  ACCESS_TO_CONTENTFUL_FALLBACK,
} from 'utils/constants';
import { handleError } from 'utils/error';

class ContentfulClient {
  constructor(ACCESS_KEYS) {
    const {
      space,
      environment,
      accessToken,
      isPreview = false,
    } = ACCESS_KEYS;
    this.SPACE = space;
    this.ENVIRONMENT = environment;
    this.ACCESS_TOKEN = accessToken;
    this.GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`;
    this.HOST = isPreview
      ? 'preview.contentful.com'
      : 'cdn.contentful.com';
  }

  getClient = async () => {
    try {
      const client = await createClient({
        space: this.SPACE,
        environment: this.ENVIRONMENT,
        accessToken: this.ACCESS_TOKEN,
        resolveLinks: true,
        host: this.HOST,
      });

      return client;
    } catch (error) {
      handleError({
        error,
        message: 'Error in the getClient function',
      });
    }
  };

  getSpace = async () => {
    try {
      const client = await this.getClient();
      const space = await client.getSpace();

      return space;
    } catch (error) {
      handleError({
        error,
        message: 'Error in the getSpace function',
      });
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

      if (entries.total === 0) {
        throw new Error('404');
      }

      return entries;
    } catch (error) {
      handleError({
        error,
        message: 'Error in the getEntries function',
      });

      throw error;
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
      handleError({
        error,
        message: 'Error in the getEntry function',
      });
    }
  };

  graphql = async (query) => {
    try {
      const response = await axios.post(
        this.GRAPHQL_URL,
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.ACCESS_TOKEN}`,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      handleError({
        error,
        message: 'Error in the graphql function',
      });
    }
  };
}

export const contentfulClient = new ContentfulClient(ACCESS_TO_CONTENTFUL);
export const contentfulPreviewClient = new ContentfulClient(ACCESS_TO_CONTENTFUL_PREVIEW);
export const blogClient = new ContentfulClient(ACCESS_TO_CONTENTFUL_BLOG);
export const blogPreviewClient = new ContentfulClient(ACCESS_TO_CONTENTFUL_BLOG_PREVIEW);

export const fallbackClient = new ContentfulClient(ACCESS_TO_CONTENTFUL_FALLBACK);
