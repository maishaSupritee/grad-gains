import envConfig from "@/db/env";
import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(envConfig.DATABASE_URL);
export const db = drizzle(sql, { schema });
