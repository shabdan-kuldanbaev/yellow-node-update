import { NextResponse } from 'next/server';
import { DEV_HOSTS, INDEX_FILES } from 'utils/constants';
import { Redirects } from './utils/json';

const isProd = process.env.NODE_ENV === 'production';

const safePageRedirect = (query) => (pathRedirectFrom) => {
  const newPath = Redirects[pathRedirectFrom];

  if (!newPath) {
    return null;
  }

  return (`${newPath}${query}`);
};

export function middleware(req, event) {
  // if (isProd
  //   && req.headers.get('x-forwarded-proto') !== 'https'
  //   && !DEV_HOSTS.includes(req.hostname)) {
  //   return NextResponse.redirect(
  //     `https://${req.nextUrl.hostname}${req.nextUrl.pathname}`,
  //     301,
  //   );
  // }
  //
  // if (req.nextUrl.hostname.includes('yellow-systems-nextjs-prod') && req.headers.get('user-agent') !== 'Amazon CloudFront') {
  //   return NextResponse.redirect(
  //     `https://${process.env.CUSTOM_DOMAIN}${req.url}`,
  //     301,
  //   );
  // }
  //
  // const {
  //   method,
  //   xhr,
  //   originalUrl,
  //   url,
  // } = req;
  // const {
  //   host,
  //   hostname,
  //   protocol,
  //   pathname: path,
  // } = req.nextUrl;
  // const wwwRedirect = host.indexOf('www.') === -1 || method !== 'GET' || xhr;
  //
  // if (!wwwRedirect) {
  //   return NextResponse.redirect(
  //     `${protocol}://${host.substring(4)}${originalUrl}`,
  //     301,
  //   );
  // }
  //
  // const trailingSlashRedirect = path.substr(-1) !== '/' || path.length <= 1;
  //
  // if (!trailingSlashRedirect) {
  //   const query = url.slice(path.length);
  //   const safePath = path.slice(0, -1).replace(/\/+/g, '/');
  //
  //   return NextResponse.redirect(
  //     safePath + query,
  //     301,
  //   );
  // }
  //
  // const firstUrlPart = `${req.nextUrl.protocol}://${host}`;
  // const fullUrl = `${firstUrlPart}${req.originalUrl}`;
  //
  // if (host === 'yellow.id') {
  //   return NextResponse.redirect(
  //     fullUrl,
  //     301,
  //   );
  // }
  //
  // if (host === 'blog.yellow.id') {
  //   if (req.originalUrl === '/') {
  //     return NextResponse.redirect(
  //       `${firstUrlPart}/blog`,
  //       301,
  //     );
  //   }
  //
  //   return NextResponse.redirect(
  //     `${firstUrlPart}${req.originalUrl.replace('posts/', 'blog/')}`,
  //     301,
  //   );
  // }
  //
  // const query = url.slice(path.length);
  //
  // const getRedirectUrl = safePageRedirect(query);
  // const redirectPath = getRedirectUrl(path);
  //
  // if (redirectPath) {
  //   return NextResponse.redirect(
  //     redirectPath,
  //     301,
  //   );
  // }
  //
  // const multiSlashRedirect = !path.includes('//') || path.length <= 1;
  //
  // if (!multiSlashRedirect) {
  //   return NextResponse.redirect(
  //     path.replace(/(\/\/)+/g, '/') + query,
  //     301,
  //   );
  // }
  //
  // if (INDEX_FILES.includes(`${req.nextUrl.protocol}://${req.nextUrl.host}${req.originalUrl}`)) {
  //   return NextResponse.redirect(
  //     `https://${process.env.CUSTOM_DOMAIN}/`,
  //     301,
  //   );
  // }
  //
  // const lowerCaseUrl = url.toLowerCase();
  //
  // // if (url !== lowerCaseUrl) {
  // //   const nextUrl = req.nextUrl.clone();
  // //   nextUrl.pathname = lowerCaseUrl;
  // //   NextResponse.rewrite(lowerCaseUrl);
  // //
  // //   return NextResponse.rewrite(lowerCaseUrl);
  // // }

  return NextResponse.next();
}
