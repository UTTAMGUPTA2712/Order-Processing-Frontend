/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getQueryParams = (filterQuery: any) => {
  let params = new URLSearchParams();
  if (!filterQuery) return params;
  Object.keys(filterQuery).forEach((key) => {
    const value = filterQuery[key];
    if (value && Array.isArray(value)) {
      value?.forEach((item) => {
        params.append(`${key}`, item);
      });
    } else if (value) {
      params.append(`${key}`, value);
    }
  });
  return params;
};
