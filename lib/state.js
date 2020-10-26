import {pgParams, pgQuery} from './postgres';

export const getAllStates = async () => {
  const label = 'list states';
  const sql = `
    SELECT 'no-op';
  `;
}

export const getAllStateDistricts = async () => {
  const label = 'get object with states and districts'
  const sql = `
    SELECT
      state_usps,
      array_to_json(array_agg(district_num)) AS district_nums
    FROM us_state_congressional_district
    GROUP BY state_usps
    ORDER BY state_usps  
  `;

  try {
    return await pgQuery(sql, [], label);
  } catch (e) {
    return Promise.reject(e);
  }
}
