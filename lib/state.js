import {pgParams, pgQuery} from './postgres';

export const getAllStates = async () => {
  const label = 'get array of state objects';
  const sql = `
    SELECT
      name AS "Name",
      fips as "FIPS",
      usps AS "USPS"
    FROM us_state
    ORDER BY fips
  `;

  try {
    return await pgQuery(sql, [], label);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const getAllStateDistricts = async () => {
  const label = 'get object with states and districts';
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

export const getStateAndDistrictBBoxes = async () => {
  const label = 'get state and district bboxes';
  const sql = `
    SELECT 
      (
        SELECT array_to_json(array_agg(s)) 
        FROM (
          SELECT usps, bbox 
          FROM us_state
        ) AS s
      ) AS state_bboxes,
      (
        SELECT array_to_json(array_agg(s))
        FROM (
          SELECT state_usps AS usps, district_num, bbox 
          FROM us_state_congressional_district
        ) AS s
      ) AS district_bboxes
  `;

  try {
    return await pgQuery(sql, [], label);
  } catch (e) {
    return Promise.reject(e);
  }
}