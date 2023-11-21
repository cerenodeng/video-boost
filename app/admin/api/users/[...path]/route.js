import * as edgedb from 'edgedb';

export async function GET(request, { params }) {
  const client = edgedb.createClient();
  if (params.path[0] == 'page') {
    const page = Number(params.path[1]);
    const results = await client.query(`
      select User {
        id,
        fullname := .first_name ++ ' ' ++ .last_name,
        email
      }
    `);
    const users = results.map(({ id, fullname, email }) => [
      id,
      fullname,
      email,
    ]);
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
  } else {
    const id = params.path[0];
    const result = await client.query(`
      select User {
        first_name,
        last_name,
        email,
        setting: {
          narrow_sidebar
        }
      }
      filter .id = <uuid>'${id}'
    `);

    return Response.json(result[0]);
  }
}

export async function POST(request, { params }) {
  if (params.path[0] == 'add') {
    const client = edgedb.createClient();
    const { firstName, lastName, email } = await request.json();
    const result = await client.query(`
    insert User {
      first_name := '${firstName}',
      last_name := '${lastName}',
      email := '${email}'
    }
  `);

    return Response.json(result[0]);
  } else {
    return Response.json(0);
  }
}

export async function PUT(request, { params }) {
  const client = edgedb.createClient();
  const { firstName, lastName, email } = await request.json();
  const id = params.path[0];
  const result = await client.query(`
    update User
    filter .id = <uuid>'${id}'
    set {
      first_name := '${firstName}',
      last_name := '${lastName}',
      email := '${email}'
    }
  `);

  return Response.json(result[0]);
}

export async function DELETE(request, { params }) {
  const client = edgedb.createClient();
  const id = params.path[0];
  const result = await client.query(`
    delete User
    filter .id = <uuid>'${id}'
  `);

  return Response.json(result[0]);
}
