module.exports = {
  seq: 1.2,
  label: 'create US State table',
  sql: `
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
  `
};
