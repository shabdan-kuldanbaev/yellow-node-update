import { isNumeric } from 'utils/helper';
import { routes } from './routes';

export function getBreadcrumbs(page, {
  title,
  slug,
  tagsList,
} = {}) {
  const currentRoute = Object.values(routes).find((route) => route.slug === page);

  const breadcrumbs = [
    { to: routes.homepage.path, title: routes.homepage.title },
  ];

  switch (currentRoute.slug) {
  case routes.blog.slug:
    breadcrumbs.push({ to: routes.blog.path, title: routes.blog.title });

    if (slug && !isNumeric(slug)) {
      const tag = tagsList?.find(({ slug: tagSlug }) => tagSlug === slug);
      breadcrumbs.push({ to: routes.blog.getRoute(slug).path, title: tag?.title });
    }

    return breadcrumbs;

  case routes.project.slug:
    breadcrumbs.push({ to: routes.portfolio.path, title: routes.portfolio.title });

    if (title && slug) {
      breadcrumbs.push({ to: routes.project.getRoute(slug).path, title });
    }

    return breadcrumbs;

  case routes.article.slug:
    breadcrumbs.push({ to: routes.blog.path, title: routes.blog.title });

    if (title && slug) {
      breadcrumbs.push({ to: routes.article.getRoute(slug).path, title });
    }

    return breadcrumbs;

  case routes.person.slug:
    breadcrumbs.splice(0, 1);
    breadcrumbs.push({ to: routes.blog.path, title: routes.blog.title });

    if (title && slug) {
      breadcrumbs.push({ to: routes.person.getRoute(slug).path, title });
    }

    return breadcrumbs;

  default:
    breadcrumbs.push({ to: currentRoute.path, title: currentRoute.title });

    return breadcrumbs;
  }
}
