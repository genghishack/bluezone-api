import { buildResponse, success, failure } from '../../libs/response-lib';
import { logError } from '../../libs/logging';
import { pgQuery } from '../../libs/postgres';

export default async function createTable_USCongressionalDistrict() {
  const label = 'create US Congressional district table';
  const sql = `
    DROP TABLE IF EXISTS us_congressional_district;
    CREATE TABLE us_congressional_district
    (
        id UUID DEFAULT uuid_generate_v1(),
        state_usps VARCHAR(2) NOT NULL,
        district_num VARCHAR(2) NOT NULL,
        bbox INTEGER[4],
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
