import { buildResponse, success, failure } from '../../libs/response-lib';
import { logError } from '../../libs/logging';
import { pgQuery } from '../../libs/postgres';

export default async function createExtensions_postgres() {
  const label = 'create US Congressional district table';
  const sql = `
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS postgis_topology;
    CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
    CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
    CREATE EXTENSION IF NOT EXISTS address_standardizer;
  `;
  try {
    const result = await pgQuery(sql, label);
    return success({ data: result });
  } catch (e) {
    logError(e);
    return Promise.reject(e);
  }
}
