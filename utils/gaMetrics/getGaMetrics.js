/* eslint-disable */
import paidUrlParamsConfig from './click_identifiers.json';
import searchEngineConfig from './search_engines.json';

function getUtmTags(urlParams) {
  const source = urlParams.get('utm_source');
  const medium = urlParams.get('utm_medium');
  const campaign = urlParams.get('utm_campaign');
  const content = urlParams.get('utm_content');
  const term = urlParams.get('utm_term');

  if(source || medium || campaign || content || term ) {
    return {
      source,
      medium,
      campaign,
      content,
      term
    }
  }

  return null;
}

function getSearchEngineData({
  referringDomain,
  urlParamsObject, 
  path, 
}) {
  if (!referringDomain) {
    return null;
  }

  if (searchEngineConfig.hasOwnProperty(referringDomain)) {
    const returnData = {
      source: searchEngineConfig[referringDomain].n,
      medium: 'organic',
      campaign: path,
    };
    const search_p = searchEngineConfig[referringDomain].p;

    if (urlParamsObject.hasOwnProperty(search_p)) {
      returnData.term = urlParamsObject[search_p];
    }

    return returnData;
  }

  const filteredSearchEngineConfig = Object.keys(searchEngineConfig).reduce((acc, el) => {

    if (searchEngineConfig[el].regex) {
      acc[el] = searchEngineConfig[el];
    }

    return acc;
  }, {});

  for (const key in filteredSearchEngineConfig) {
    if (referringDomain.match(key)) {
      return {
        source: searchEngineConfig[key].n,
        medium: 'organic',
      };
    }
  }

  return null;
}

function getPaidUrlData(urlParamsObject) {
  for (const key in urlParamsObject) {
    if (paidUrlParamsConfig.hasOwnProperty(key)) {
      return paidUrlParamsConfig[key];
    }
  }

  return null;
}

function getDomain(referrer) {
  const isHasDomain = referrer.substring(4, -1);

  if (!isHasDomain) {
    return null;
  }

  const referrerUrl = referrer.substring(0, 4) === 'http' ? referrer : `https://${referrer}`;
  const url = new URL(referrerUrl);
  const host = url.hostname;
  const site = host.split('.');
  const sl = site.slice(-2);

  if (['com', 'co'].includes(sl[0]) && sl.join('').length <= 5) {
    return site.slice(-3).join('.');
  }

  return site.slice(-2).join('.');
}

export function rawData({ path }) {
  const referringDomain = getDomain(document.referrer);
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamsObject = Object.fromEntries(urlParams);
  const utmTags = getUtmTags(urlParams);
  const paidUrlData = getPaidUrlData(urlParamsObject);
  const searchEngineData = getSearchEngineData({
    referringDomain, 
    urlParamsObject,
    path
  });
  const referralData = referringDomain
    ? { 
        medium: 'referral',
        source: referringDomain, 
        campaign: path || '(not set)',
      } 
    : null;

  return {   
    this_hostname: document.location.origin || 'localhost',
    this_domain: getDomain(document.location.origin) || 'localhost',
    referring_hostname: document.referrer || null,
    referring_domain: referringDomain,
    query_string: window.location.search,
    utm_tags: utmTags,
    url_params: Object.keys(urlParamsObject).length ? urlParamsObject : null,
    paid_url_data: paidUrlData,
    organic_search_data: searchEngineData,
    referral_data: referralData,
  };
}

export default function  getGaMetrics({ path }) {
  const trafficData = rawData({ path });
 
  return trafficData.utm_tags
    || trafficData.paid_url_data
    || trafficData.organic_search_data
    || trafficData.referral_data
    || {
      source: '(direct)',
      medium: '(none)',
      campaign: path || '(not set)',
    };
}
