import { ActivatedRoute, Router } from '@angular/router';

export function navigateWithParams(
  route: ActivatedRoute,
  router: Router,
  newParams: object,
) {
  const params = {
    ...route.snapshot.queryParams
  };

  for (const key of Object.keys(newParams)) {
    if (newParams[key]) {
      params[key] = newParams[key];
    } else {
      delete(params[key]);
    }
  }

  router.navigate([], {
    relativeTo: route,
    queryParams: params
  });
}
