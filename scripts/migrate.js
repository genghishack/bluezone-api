require('dotenv').config();
const fs = require('fs');
const pgLib = require('./pgLib');

const {pgQuery} = pgLib;
const path = './migrate';

(async () => {
  const migrateDir = await fs.readdirSync(path);
  const migrations = await Promise.all(migrateDir.map(async (filename) => {
    return require(`${path}/${filename}`, {encoding: 'utf8'});
  }));
  migrations.sort((a, b) => {
    return a.seq - b.seq;
  });

  const lastCompleted = (await pgQuery(`
    SELECT MAX(sequence) FROM migration
  `)).rows[0].max;

  await Promise.all(migrations.map(async (migration) => {
    const {label, seq, sql} = migration;
    if (seq > lastCompleted) {
      const result = await pgQuery(sql, label);
      await pgQuery(`
        INSERT INTO migration (datetime, sequence, label, result)
        VALUES (NOW(), ${seq}, '${label}', '${JSON.stringify(result)}')
      `);
      console.log(`${seq}: Complete (${label})`);
    } else {
      console.log(`${seq}: Skipped (${label})`);
    }
  }));
})();
