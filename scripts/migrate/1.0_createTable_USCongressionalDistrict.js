module.exports = {
  seq: 1.0,
  label: 'create US Congressional District table',
  sql: `
    DROP TABLE IF EXISTS us_congressional_district;
    CREATE TABLE us_congressional_district
    (
        id UUID DEFAULT uuid_generate_v1(),
        state_usps VARCHAR(2) NOT NULL,
        district_num VARCHAR(2) NOT NULL,
        bbox INTEGER[4],
        PRIMARY KEY (id)
    );
  `
};
