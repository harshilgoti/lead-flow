import { defineConfig } from "drizzle-kit";

import env from "@/lib/env";

export default defineConfig({
  schema: "./src/app/db/schema",
  out: "./src/app/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
