import {pgParams, pgQuery} from './postgres';
import constants from '../lib/constants';

const { regex } = constants;

export const getLegislator = async (id) => {
  const label = 'get legislator by id';
  const sql = `
    SELECT
      lb.bioguide_id,
      (SELECT json_agg(b)::jsonb FROM (
        SELECT
          lb.first,
          lb.middle,
          lb.nickname,
          lb.last,
          lb.suffix,
          lb.official_full,
          lb.gender,
          lb.birthday,
          lb.religion
      ) AS b) AS bio,
      (SELECT json_agg(t)::jsonb FROM (
        SELECT
          lt.type,
          lt.start_date,
          lt.end_date,
          lt.party,
          lt.state,
          lt.district,
          lt.class,
          lt.state_rank,
          lt.phone,
          lt.fax,
          lt.office,
          lt.address,
          lt.contact_form,
          lt.url,
          lt.rss_url
        FROM us_legislator_term lt
        WHERE lt.bioguide_id = lb.bioguide_id
      ) AS t) AS terms,
      (SELECT json_agg(i)::jsonb FROM (
        SELECT
          li.fec,
          li.lis,
          li.cspan,
          li.icpsr,
          li.thomas,
          li.govtrack,
          li.maplight,
          li.wikidata,
          li.votesmart,
          li.wikipedia,
          li.ballotpedia,
          li.opensecrets,
          li.house_history,
          li.google_entity_id
      ) AS i) AS ids
    FROM us_legislator_bio lb
    LEFT JOIN us_legislator_id li ON (li.bioguide_id = lb.bioguide_id)
    WHERE lb.bioguide_id = $1
  `;

  try {
    return await pgQuery(sql, [id], label);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getAllLegislatorsByDate = async (date = null) => {
  let dateObj = new Date();
  if (date && regex.date.test(date)) {
    dateObj = new Date(date);
  }
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  let dateStr = `${year}-${month}-${day}`;
  const label = 'list legislators by date';
  const sql = `
    SELECT
      lb.bioguide_id,
      (SELECT json_agg(b)::jsonb FROM (
        SELECT
          lb.first,
          lb.middle,
          lb.nickname,
          lb.last,
          lb.suffix,
          lb.official_full,
          lb.gender,
          lb.birthday,
          lb.religion
      ) AS b) AS bio,
      (SELECT json_agg(t)::jsonb FROM (
        SELECT
          lt.type,
          lt.start_date,
          lt.end_date,
          lt.party,
          lt.state,
          lt.district,
          lt.class,
          lt.state_rank,
          lt.phone,
          lt.fax,
          lt.office,
          lt.address,
          lt.contact_form,
          lt.url,
          lt.rss_url
        FROM us_legislator_term lt
        WHERE lt.bioguide_id = lb.bioguide_id
        AND lt.start_date <= $1 AND lt.end_date >= $1
      ) AS t) AS term,
      (SELECT json_agg(i)::jsonb FROM (
        SELECT
          li.fec,
          li.lis,
          li.cspan,
          li.icpsr,
          li.thomas,
          li.govtrack,
          li.maplight,
          li.wikidata,
          li.votesmart,
          li.wikipedia,
          li.ballotpedia,
          li.opensecrets,
          li.house_history,
          li.google_entity_id
      ) AS i) AS ids
    FROM us_legislator_bio lb
    LEFT JOIN us_legislator_id li ON (li.bioguide_id = lb.bioguide_id)
    LEFT JOIN us_legislator_term lt ON (lt.bioguide_id = lb.bioguide_id)
    WHERE lt.start_date <= $1 AND lt.end_date >= $1
  `;

  try {
    const result = await pgQuery(sql, [dateStr], label);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteLegislator = async (id) => {
  const label = 'delete legislator';
  const sql = `
    SELECT 'no-op';
  `;

  try {
    const result = await pgQuery(sql, [id], label);
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createLegislator = async (user, data) => {
  const label = 'create legislator';
  let name = '';

  if (data.name) {
    name = data.name.replace(/'/g, "''");
  }

  let params = []

  // TODO: error handle inputs, such as no name, type or URL provided
  const sql = `
    SELECT 'no-op';
  `;

  try {
    return await pgQuery(sql, params, label);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateLegislator = async (user, id, data) => {
  const label = 'update legislator';
  let name = '';

  let params = []

  if (data.name) {
    name = data.name.replace(/'/g, "''");
  }

  const sql = `
    SELECT 'no-op';
  `;

  try {
    return await pgQuery(sql, params, label);
  } catch (e) {
    return Promise.reject(e);
  }
};
