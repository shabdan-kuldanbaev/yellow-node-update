export function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
