import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/data/schema.tsx",

    dbCredentials: {
        // url: process.env.AUTH_DRIZZLE_URL || "postgres://user:password@host:port/db",
        url: "postgres://postgres:20ols20ols@127.0.0.1:5432/bredagh",
    },

});
