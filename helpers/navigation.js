import { LINKS_WITH_SUB_NAVIGATION, LINKS_WITH_SUB_SMALL_NAVIGATION } from 'utils/constants';

export const isHasSubNavigation = (slug) => LINKS_WITH_SUB_NAVIGATION.includes(slug);

export const isHasSubSmallNavigation = (slug) => LINKS_WITH_SUB_SMALL_NAVIGATION.includes(slug);
