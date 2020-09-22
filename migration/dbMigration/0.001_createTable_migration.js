import { success, failure } from '../../libs/response-lib';
import { logError } from '../../libs/logging';
import { pgQuery } from '../../libs/postgres';

export default async function createTable_migration() {
  const label = 'create migration table';
  const sql = `
    DROP TABLE IF EXISTS migration;
    CREATE TABLE migration
    (
        id UUID default uuid_generate_v1(),
        datetime TIMESTAMP(6) WITH TIME ZONE NOT NULL,
        sequence INTEGER NOT NULL,
        label TEXT,
        result TEXT NOT NULL,
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
