import { ActivatedRoute, Router } from '@angular/router';

import { navigateWithParams } from './navigation';

export function updateParams(
  route: ActivatedRoute,
  router: Router,
  prefix: string,
  page: number,
  filterQuery: string,
) {
  const params = {};
  params[addPrefix(prefix, 'page')] = page === 1 ? '' : page;
  params[addPrefix(prefix, 'filter')] = filterQuery;

  return navigateWithParams(route, router, params);
}

function addPrefix(prefix: string, name: string): string {
  if (prefix === '') {
    return name;
  }

  return `${prefix}-${name}`;
}
