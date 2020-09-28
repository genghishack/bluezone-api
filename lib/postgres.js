import pg from 'pg';

const {
  DB_HOST: dbHost,
  DB_NAME: dbName,
  DB_USER: dbUser,
  DB_PASS: dbPass,
  STAGE: stage,
} = process.env;

const getPgConnectionString = async () => {
  return Promise.resolve(`postgres://${dbUser}:${dbPass}@${dbHost}/${dbName}`);
};

export const getPgClient = async () => {
  const pgConnStr = await getPgConnectionString();
  const client = new pg.Client(pgConnStr);
  return Promise.resolve(client);
};

export const pgQuery = async (sql, params, label) => {
  if (!sql) {
    return Promise.reject(new Error('No SQL provided'));
  }

  const client = await getPgClient();

  const sqlLabel = (label) ? `Query to ${label}` : 'Query';
  if (stage !== 'prod') {
    console.log(`${sqlLabel}: `, sql);
  } else {
    console.log(sqlLabel);
  }

  try {
    client.connect();
    const result = await client.query(sql, params);
    return result.rows;
  } catch (e) {
    return Promise.reject(e);
  } finally {
    client.end();
  }
};

export const pgParams = (params, param) => {
  params.push(param);

  return `$${params.length}`;
};
