import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  foreignKey,
  pgEnum,
  serial,
  pgRole,
  pgPolicy,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/node-postgres"
import type { AdapterAccountType } from "next-auth/adapters"
import { sql } from "drizzle-orm"

const connectionString = process.env.AUTH_DRIZZLE_URL || "postgres://postgres:postgres@localhost:5432/db"
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)


export const orgTypeEnum = pgEnum("orgType", ["agency", "portfolio", "company"]);
export const userRolesEnum = pgEnum("userRoles", ["viewer", "editor", "admin", "superadmin"]);
export const userStatusEnum = pgEnum("userStatus", ["active", "inactive"]);

const timestamps = {
  updated_at: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
}

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  status: userStatusEnum().notNull().default("active"),
  lastLogin: timestamp("lastLogin", { mode: "date" }),
  lastLoginIP: text("lastLoginIP"),
  password: text("password"),
  hashedPassword: text("hashedPassword"),
  resetPasswordToken: text("resetPasswordToken"),
  resetPasswordExpires: timestamp("resetPasswordExpires", { mode: "date" }),
  ...timestamps,
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
)


export const T_PLATFORM = pgRole('T_PLATFORM', { createRole: true, createDb: true, inherit: true });

export const org = pgTable(
  "org",
  {
    orgId: serial("orgId").primaryKey(),
    orgName: text("orgName").notNull(),
    orgType: orgTypeEnum().notNull().default("company"),
    orgGroup: text("orgGroup").notNull(),
  }
);

export const org2org = pgTable(
  "org2org",
  {
    parentOrgId: integer("parentOrgId")
      .notNull()
      .references(() => org.orgId, { onDelete: "cascade" }),
    childOrgId: integer("childOrgId")
      .notNull()
      .references(() => org.orgId, { onDelete: "cascade" }),
  },
);


export const userOrg = pgTable(
  "user_org",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orgId: integer("orgId")
      .notNull()
      .references(() => org.orgId, { onDelete: "cascade" }),
    role: userRolesEnum().notNull().default("viewer"),
  },
  (userOrg) => [
    {
      compositePK: primaryKey({
        columns: [userOrg.userId, userOrg.orgId],
      }),
    },
  ]
);

