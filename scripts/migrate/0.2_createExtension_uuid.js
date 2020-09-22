module.exports = {
  seq: 0.2,
  label: 'install uuid extension',
  sql: `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `,
};
