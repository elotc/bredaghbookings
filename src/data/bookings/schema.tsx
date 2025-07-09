import {
    boolean,
    timestamp,
    pgTable,
    pgEnum,
    text,
    primaryKey,
    integer,
    serial,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/node-postgres"
import type { AdapterAccountType } from "next-auth/adapters"
import { relations } from "drizzle-orm"

const connectionString = process.env.AUTH_DRIZZLE_URL || "postgres://postgres:postgres@localhost:5432/db"
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)


// Enum definitions
export const orgStatusEnum = pgEnum("org_status", ["Active", "Pending", "Archived"]);
export const userStatusEnum = pgEnum("user_status", ["Active", "Pending", "Archived"]);
export const orgTypeEnum = pgEnum("org_type", ["Club", "Grouping", "Team"]);
export const userOrgRoleEnum = pgEnum("user_org_role", ["Admin", "Editor", "Viewer"]);
export const bookingRequestStatusEnum = pgEnum("booking_request_status", [
    "Requested",
    "Approved",
    "Rejected",
    "Withdrawn",
]);
export const bookingEventTypeEnum = pgEnum("booking_event_type", [
    "Training",
    "Match",
    "Event",
    "Other",
]);
export const bookingFacilityStatusEnum = pgEnum("booking_facility_status", ["Active", "Inactive"]);
export const seasonStatusEnum = pgEnum("season_status", ["Open", "Closed", "Pending"]);
export const scheduleBlockoutStatusEnum = pgEnum("schedule_blockout_status", ["Closed", "Unavailable"]);

const timestamps = {
    updatedAt: timestamp("updated_at", { mode: "date" })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  status: userStatusEnum().notNull().default("Pending"),
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

export const org = pgTable(
    "org", {
    id: serial("id").primaryKey(),
    abbrev: text("abbrev"),
    name: text("name"),
    status: orgStatusEnum("status").notNull().default("Active"),
    type: orgTypeEnum("type").notNull().default("Club"),
    clubId: integer("club_id"),
    groupingId: integer("grouping_id"),
    ...timestamps,
});

export const orgRelations = relations(org, ({ one }) => ({
    parentClub: one(org, {
        fields: [org.clubId],
        references: [org.id],
    }),
    parentGrouping: one(org, {
        fields: [org.groupingId],
        references: [org.id],
    }),
}));

export const user_org = pgTable(
  "user_org",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    org_id: serial("org_id")
      .notNull()
      .references(() => org.id, { onDelete: "cascade" }),
    status: userStatusEnum("status").notNull().default("Active"),
    role: userOrgRoleEnum("role").notNull().default("Viewer"),
  },
  (user_org) => [
    {
      compositePk: primaryKey({
        columns: [user_org.user_id, user_org.org_id],
      }),
    },
  ]
);

export const booking_request = pgTable("booking_request", {
  booking_id: serial("booking_id").primaryKey(),
  team_id: serial("team_id")
    .notNull()
    .references(() => org.id, { onDelete: "cascade" }),
  grouping_id: serial("grouping_id")
    .notNull()
    .references(() => org.id, { onDelete: "cascade" }),
  requestor_id: text("requestor_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  approver_id: text("approver_id")
    .references(() => users.id, { onDelete: "set null" }),
  status: bookingRequestStatusEnum("status").notNull().default("Requested"),
  season_id: serial("season_id"),
  event_type: bookingEventTypeEnum("event_type").notNull().default("Training"),
  booking_abbrev: text("booking_abbrev"),
  description: text("description"),
  ...timestamps,
});

export const location = pgTable("location", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  abbrev: text("abbrev").notNull(),
  club_id: serial("club_id").references(() => org.id, { onDelete: "set null" }),
  team_id: serial("team_id").references(() => org.id, { onDelete: "set null" }),
  ...timestamps,
});

export const facility = pgTable("facility", {
  id: serial("id").primaryKey(),
  location_id: serial("location_id")
    .notNull()
    .references(() => location.id, { onDelete: "cascade" }),
  slot_duration_mins: integer("slot_duration_mins").notNull(),
  concurrent_use_number: integer("concurrent_use_number").notNull().default(1),
  name: text("name").notNull(),
  abbrev: text("abbrev").notNull(),
  club_id: serial("club_id").references(() => org.id, { onDelete: "set null" }),
  team_id: serial("team_id").references(() => org.id, { onDelete: "set null" }),
  ...timestamps,
});

export const booking_facility = pgTable("booking_facility", {
  id: serial("id").primaryKey(),
  facility_id: serial("facility_id")
    .notNull()
    .references(() => facility.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  start_time: text("start_time").notNull(),
  end_time: text("end_time").notNull(),
  status: bookingFacilityStatusEnum("status").notNull().default("Active"),
  abbrev: text("abbrev"),
  ...timestamps,
});

export const booking_comment = pgTable("booking_comment", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  booking_id: serial("booking_id")
    .notNull()
    .references(() => booking_request.booking_id, { onDelete: "cascade" }),
  ...timestamps,
});

export const season = pgTable("season", {
  id: serial("id").primaryKey(),
  start_datetime: timestamp("start_datetime", { mode: "date" }).notNull(),
  end_datetime: timestamp("end_datetime", { mode: "date" }).notNull(),
  name: text("name").notNull(),
  status: seasonStatusEnum("status").notNull().default("Open"),
  ...timestamps,
});

export const schedule = pgTable("schedule", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  club_id: serial("club_id").references(() => org.id, { onDelete: "set null" }),
  ...timestamps,
});

export const schedule_blockout = pgTable("schedule_blockout", {
  id: serial("id").primaryKey(),
  schedule_id: serial("schedule_id")
    .notNull()
    .references(() => schedule.id, { onDelete: "cascade" }),
  start_date: text("start_date").notNull(),
  end_date: text("end_date").notNull(),
  start_time: text("start_time").notNull(),
  end_time: text("end_time").notNull(),
  status: scheduleBlockoutStatusEnum("status").notNull().default("Closed"),
  ...timestamps,
});

export const season_facility_schedule = pgTable("season_facility_schedule", {
  season_id: serial("season_id")
    .notNull()
    .references(() => season.id, { onDelete: "cascade" }),
  facility_id: serial("facility_id")
    .notNull()
    .references(() => facility.id, { onDelete: "cascade" }),
  schedule_id: serial("schedule_id")
    .notNull()
    .references(() => schedule.id, { onDelete: "cascade" }),
  club_id: serial("club_id")
    .references(() => org.id, { onDelete: "set null" }),
});
















