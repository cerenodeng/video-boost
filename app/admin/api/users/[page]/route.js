import * as edgedb from 'edgedb';

export async function GET(request, { params }) {
  const page = Number(params.page);
  const client = edgedb.createClient();
  const results = await client.query(
    `select User {
      id,
      fullname := .first_name ++ ' ' ++ .last_name,
      email
    }`,
  );
  const users = results.map(({ id, fullname, email }) => [id, fullname, email]);
  const totalItems = users.length;
  const itemsPerPage = 25;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentPage = page < 0 ? 1 : page > totalPages ? totalPages : page;
  const items = users.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage,
  );
  return Response.json({
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage,
    items,
  });
}