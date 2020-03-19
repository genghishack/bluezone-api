import { buildResponse, success, failure } from '../../libs/response-lib';
import { logError } from '../../libs/logging';
import { pgQuery } from '../../libs/postgres';

export default async function createTable_USState() {
  const label = 'create US State table';
  const sql = `
    DROP TABLE IF EXISTS us_state;
    CREATE TABLE us_state
    (
        id uuid default uuid_generate_v1(),
        fips INTEGER NOT NULL,
        usps VARCHAR(2) NOT NULL,
        name text NOT NULL,
        bbox integer[4],
        PRIMARY KEY (id)
    );
  `;
  try {
    const result = await pgQuery(sql, label);
    return success({ data: result });
  } catch (e) {
    logError(e);
    return Promise.reject(e);
  }
}
