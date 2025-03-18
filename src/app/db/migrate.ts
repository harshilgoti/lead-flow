import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { pool } from "./drizzle";

async function main() {
  await migrate(drizzle(pool), {
    migrationsFolder: "./src/app/db/migrations",
  });

  await pool.end();
}

main();
