import envConfig from "@/db/env";
import "dotenv/config";
import { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: envConfig.DATABASE_URL,
  },
} satisfies Config;
