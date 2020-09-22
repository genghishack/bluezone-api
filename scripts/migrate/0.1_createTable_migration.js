module.exports = {
  seq: 0.1,
  label: 'create migration table',
  sql: `
    DROP TABLE IF EXISTS migration;
    CREATE TABLE migration
    (
        id UUID default uuid_generate_v1(),
        datetime TIMESTAMP(6) WITH TIME ZONE NOT NULL,
        sequence FLOAT NOT NULL,
        label TEXT,
        result TEXT NOT NULL,
        PRIMARY KEY (id)
    );
  `,
};
