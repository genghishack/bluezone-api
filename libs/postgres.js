import pg from 'pg';
import getParams from './getParams';

const getPgConnectionString = async () => {
  const params = await getParams('dev', 'postgres');
  return Promise.resolve(`postgres://${params.user}:${params.pass}@${params.host}/${params.db}`);
};

export const getPgClient = async () => {
  const pgConnStr = await getPgConnectionString();
  const client = new pg.Client(pgConnStr);
  return Promise.resolve(client);
};

export const pgQuery = async (sql, label) => {
  if (!sql) {
    return Promise.reject(new Error('No SQL provided'));
  }

  const client = await getPgClient();

  const sqlLabel = (label) ? `SQL to ${label}: ` : 'SQL: ';
  console.log(sqlLabel, sql);

  try {
    client.connect();
    const result = await client.query(sql);
    return result.rows;
  } catch (e) {
    return Promise.reject(e);
  } finally {
    client.end();
  }
};
