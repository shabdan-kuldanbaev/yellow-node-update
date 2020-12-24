import * as builder from 'xmlbuilder';
import dayjs from 'dayjs';
import { getMainLinksForSitemap, rootUrl } from 'utils/helper';
import axios from 'axios'; // TODO remove it

// TODO remove it
const axiosTemporaryClient = axios.create({
  baseURL: process.env.API_URL,
});

const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const buildUrlObject = (data) => data.map((item) => ({
  loc: { '#text': `${rootUrl}${item.path}` },
  lastmod: { '#text': item.updatedAt.split('T')[0] },
  changefreq: { '#text': 'daily' },
  priority: { '#text': '1.0' },
}));

const Sitemap = () => (null);

Sitemap.getInitialProps = async ({ ctx: { req, res } }) => {
  try {
    const { data } = await axiosTemporaryClient.get('/posts');
    const postLinks = data.map(({ slug, published_at }) => ({
      path: `/blog/${slug}`,
      updatedAt: getDate(Date.parse(published_at)),
    }));
    const feedObject = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
        url: [],
      },
    };

    feedObject.urlset.url.push(
      ...buildUrlObject([
        ...getMainLinksForSitemap(getDate(new Date())),
        ...postLinks,
      ]),
    );

    const sitemap = builder.create(feedObject, { encoding: 'utf-8' });

    if (res) {
      res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
      res.setHeader('Content-Type', 'application/xml');
      res.statusCode = 200;
      res.end(sitemap.end({ pretty: true }));
    }

    return;
  } catch (error) {
    console.log(error);
  }
};

export default Sitemap;
