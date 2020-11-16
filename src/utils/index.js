import { parse } from 'query-string';

export const limit = 10;

export const getPaginator = (search) => {
  const parsedSerch = parse(search);
  const currentPage = parsedSerch.page ? +parsedSerch.page : 1;
  const offset = (currentPage - 1) * limit;

  return { currentPage, offset };
};
