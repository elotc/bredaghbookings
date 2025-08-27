import {
    boolean,
    timestamp,
    pgTable,
    pgEnum,
    text,
    primaryKey,
    integer,
    serial,
    date,
    time,
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
export const scheduleBlockStatusEnum = pgEnum("schedule_block_status", ["Closed", "Available"]);

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


// == ORGANISATIONS ==
export const org = pgTable(
    "org", {
    id: serial("id").primaryKey(),
    abbrev: text("abbrev").notNull(),
    name: text("name").notNull(),
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
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orgId: integer("org_id")
      .notNull()
      .references(() => org.id, { onDelete: "cascade" }),
    status: userStatusEnum("status").notNull().default("Active"),
    role: userOrgRoleEnum("role").notNull().default("Viewer"),
  },
  (user_org) => [
    {
      compositePk: primaryKey({
        columns: [user_org.userId, user_org.orgId],
      }),
    },
  ]
);


// == LOCATIONS / FACILITIES ==
export const location = pgTable("location", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  abbrev: text("abbrev").notNull(),
  ...timestamps,
});

export const facility = pgTable("facility", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id")
    .notNull()
    .references(() => location.id, { onDelete: "cascade" }),
  scheduleId: integer("schedule_id")
    .notNull() 
    .references(() => schedule.id),
  slotDurationMins: integer("slot_duration_mins").notNull().default(30),
  concurrentUseNumber: integer("concurrent_use_number").notNull().default(1),
  name: text("name").notNull(),
  abbrev: text("abbrev").notNull(),
 ...timestamps,
});


/// == BOOKINGS ===
export const booking_request = pgTable("booking_request", {
  bookingId: serial("booking_id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => org.id, { onDelete: "cascade" }),
  requestorId: text("requestor_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  approverId: text("approver_id")
    .references(() => users.id, { onDelete: "set null" }),
  status: bookingRequestStatusEnum("status").notNull().default("Requested"),
  eventType: bookingEventTypeEnum("event_type").notNull().default("Training"),
  bookingAbbrev: text("booking_abbrev").notNull(),
  description: text("description"),
  ...timestamps,
});

export const booking_facility = pgTable("booking_facility", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => booking_request.bookingId, { onDelete: "cascade" }),
  facilityId: integer("facility_id")
    .notNull()
    .references(() => facility.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  status: bookingFacilityStatusEnum("status").notNull().default("Active"),
  
  ...timestamps,
});

export const booking_comment = pgTable("booking_comment", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => booking_request.bookingId, { onDelete: "cascade" }),
  ...timestamps,
});


// == SCHEDULE ==
export const schedule = pgTable("schedule", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ...timestamps,
});

export const schedule_block = pgTable("schedule_block", {
  id: serial("id").primaryKey(),
  scheduleId: integer("schedule_id")
    .notNull()
    .references(() => schedule.id, { onDelete: "cascade" }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  status: scheduleBlockStatusEnum("status").notNull().default("Closed"),
  ...timestamps,
});















