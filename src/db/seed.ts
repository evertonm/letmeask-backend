import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.js';
import { schema } from './schema/index.js';

await reset(db, schema);

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  };
});

await sql.end();

// biome-ignore lint: noConsoleLog - only used in development
console.log('Database seeded successfully.');
