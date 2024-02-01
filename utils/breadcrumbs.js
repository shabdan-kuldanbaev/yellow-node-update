import { isNumeric } from 'utils/helper';
import { ROUTES } from 'utils/constants';

export function getBreadcrumbs(page, {
  title,
  slug,
  tagsList,
} = {}) {
  const currentRoute = Object.values(ROUTES).find((route) => route.slug === page);

  const breadcrumbs = [
    { to: ROUTES.homepage.path, title: ROUTES.homepage.title },
  ];

  switch (currentRoute.slug) {
  case ROUTES.blog.slug:
    breadcrumbs.push({ to: ROUTES.blog.path, title: ROUTES.blog.title });

    if (slug && !isNumeric(slug)) {
      const tag = tagsList?.find(({ slug: tagSlug }) => tagSlug === slug);
      breadcrumbs.push({ to: ROUTES.blog.getRoute(slug).path, title: tag?.title });
    }

    return breadcrumbs;

  case ROUTES.project.slug:
    breadcrumbs.push({ to: ROUTES.portfolio.path, title: ROUTES.portfolio.title });

    if (title && slug) {
      breadcrumbs.push({ to: ROUTES.project.getRoute(slug).path, title });
    }

    return breadcrumbs;

  case ROUTES.article.slug:
    breadcrumbs.push({ to: ROUTES.blog.path, title: ROUTES.blog.title });

    if (title && slug) {
      breadcrumbs.push({ to: ROUTES.article.getRoute(slug).path, title });
    }

    return breadcrumbs;

  case ROUTES.person.slug:
    breadcrumbs.splice(0, 1);
    breadcrumbs.push({ to: ROUTES.blog.path, title: ROUTES.blog.title });

    if (title && slug) {
      breadcrumbs.push({ to: ROUTES.person.getRoute(slug).path, title });
    }

    return breadcrumbs;

  default:
    breadcrumbs.push({ to: currentRoute.path, title: currentRoute.title });

    return breadcrumbs;
  }
}
