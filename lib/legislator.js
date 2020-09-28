import {pgParams, pgQuery} from './postgres';

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

export const getAllLegislators = async () => {
  const label = 'list legislators';
  const sql = `
    SELECT 'no-op';
  `;

  try {
    const result = await pgQuerySafe(sql, [], label);
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
    const result = await pgQuerySafe(sql, [id], label);
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
    return await pgQuerySafe(sql, params, label);
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
    return await pgQuerySafe(sql, params, label);
  } catch (e) {
    return Promise.reject(e);
  }
};
