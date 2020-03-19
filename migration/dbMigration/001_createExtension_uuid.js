import { buildResponse, success, failure } from '../../libs/response-lib';
import { logError } from '../../libs/logging';
import { pgQuery } from '../../libs/postgres';

export default async function createExtension_uuid() {
  const label = 'install uuid extension';
  const sql = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `;
  try {
    const result = await pgQuery(sql, label);
    return success({ data: result });
  } catch (e) {
    logError(e);
    return Promise.reject(e);
  }
}
