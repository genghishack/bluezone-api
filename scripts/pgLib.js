const pg = require('pg');

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

const getPgClient = async () => {
  const pgConnStr = await getPgConnectionString();
  const client = new pg.Client(pgConnStr);
  return Promise.resolve(client);
};

module.exports = {
  pgQuery: async (sql, label) => {
    if (!sql) {
      return Promise.reject(new Error('No SQL provided'));
    }

    const client = await getPgClient();

    const sqlLabel = (label) ? `Query to ${label}` : 'Query';
    if (stage !== 'prod') {
      // console.log(`${sqlLabel}: `, sql);
    } else {
      // console.log(sqlLabel);
    }

    try {
      client.connect();
      return (await client.query(sql));
    } catch (e) {
      return Promise.reject(e);
    } finally {
      client.end();
    }
  },
};
