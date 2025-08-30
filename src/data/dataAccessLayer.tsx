import { db } from '@/data/dbConn';
import { eq, gt, lt, sql, and, inArray, lte, gte, or } from 'drizzle-orm';
import {
  users as usersTable,
  accounts as accountsTable,
  sessions as sessionsTable,
  authenticators as authsTable,
  verificationTokens as tokensTable,
  booking_request,
  location,
  facility,
  org,
  schedule,
  schedule_block,
  user_org,
  booking_facility,
  booking_comment
} from '@/data/schema';
import { alias } from 'drizzle-orm/pg-core';
import { OrgUsersType, RoleType, UserOrgRole, BaseUser, ClubGroupingTeam, ScheduleFacilityBlock, FacilityBooking, ScheduleBlock, BookingComment, BookingRequest, BookingStatus, Org } from './definitions';

// Authentication

export async function getAccounts() {
  const accounts = await db.select().from(accountsTable);
  console.log('Getting all accounts from the database: ', accounts)
  return accounts;
}

export async function getAuths() {
  const auths = await db.select().from(authsTable);
  console.log('Getting all auths from the database: ', auths)
  return auths;
}

export async function getSessions() {
  const sessions = await db.select().from(sessionsTable);
  console.log('Getting all sessions from the database: ', sessions)
  return sessions;
}

export async function getTokens() {
  const tokens = await db.select().from(tokensTable);
  console.log('Getting all tokens from the database: ', tokens)
  return tokens;
}

export async function deleteStaleTokens() {
  await db.delete(tokensTable).where(lt(tokensTable.expires, sql`now()`));
}

// Utilty Functions

export async function getTableRowCounts() {
  const result = await db.execute(
    `SELECT table_name, 
            (SELECT n_live_tup 
             FROM pg_stat_user_tables 
             WHERE relname = table_name) AS row_count 
         FROM information_schema.tables 
         WHERE table_schema = 'public'
         ORDER BY row_count DESC;`
  );
  return result.rows || result;
}



// User

export async function getAllUsers(): Promise<BaseUser[]> {
  const users: BaseUser[] = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    status: usersTable.status
  }).from(usersTable);
  return users;
}

export async function getAllUserEmails() {
  const emails = await db.select({ email: usersTable.email }).from(usersTable);
  // console.log('Getting all users from the database: ', users)
  return emails;
}

export async function getUserById(id: string): Promise<BaseUser> {
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    status: usersTable.status,
  }).from(usersTable).where(eq(usersTable.id, id));
  return users[0];
}

export async function getUserByEmail(email: string): Promise<BaseUser> {
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    status: usersTable.status,
  }).from(usersTable).where(eq(usersTable.email, email));
  return users[0];
}

export async function checkUserEmailExists(email: string) {
  const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (users.length > 0) {
    return true;
  } else {
    return false;
  }
}

export async function setUserActiveByEmail(email: string) {
  await db
    .update(usersTable)
    .set({
      status: 'Active',
    })
    .where(eq(usersTable.email, email));
}

export async function createUser(name: string, email: string) {
  const user: typeof usersTable.$inferInsert = {
    name: name,
    email: email,
    status: 'Pending',
  };
  console.log('Creating user with data: ', user);
  return await db.insert(usersTable).values(user).returning({ id: usersTable.id });
}

export async function updateUser(
  id: string,
  updates: Partial<{ name: string; email: string; status: 'Active' | 'Pending' | 'Archived' }>
) {
  const user: typeof usersTable.$inferInsert = {
    name: updates.name || '',
    email: updates.email || '',
    status: updates.status ?? 'Pending',
  };
  await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, id));
  console.log('User info updated!');
}

export async function deleteUser(id: string) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
  console.log('User deleted!')
}

// User Org Roles

export async function getOrgsByName(name: string) {
  return await db.select().from(org).where(eq(org.name, name));
}

export async function getOrgRoleByUserIdOrgId(userId: string, orgId: number) {
  const role = await db.select().from(user_org)
    .where(
      and(eq(user_org.userId, userId),
        eq(user_org.orgId, orgId))
    );
  return role[0];
}

export async function getUserRolesByOrgId(orgId: number): Promise<OrgUsersType[]> {
  return db.select({
    orgId: user_org.orgId,
    userId: user_org.userId,
    userName: usersTable.name,
    status: user_org.status,
    role: user_org.role,
  })
    .from(user_org)
    .innerJoin(usersTable, eq(user_org.userId, usersTable.id))
    .where(eq(user_org.orgId, orgId));
}

export async function getAllTeamsByUserId(userId: string): Promise<ClubGroupingTeam[]> {
  const club = alias(org, "club");
  const grouping = alias(org, "grouping");
  const team = alias(org, "team");

  const orgRoles = await getOrgRolesByUserId(userId);

  let allTeams: ClubGroupingTeam[] = [];

  for (const role of orgRoles) {
    const { orgType, orgId } = role;

    let whereClause;
    if (orgType === "Club") {
      whereClause = eq(club.id, orgId);
    } else if (orgType === "Grouping") {
      whereClause = eq(grouping.id, orgId);
    } else if (orgType === "Team") {
      whereClause = eq(team.id, orgId);
    } else {
      continue;
    }

    const teams: ClubGroupingTeam[] = await db.select(
      {
        clubId: club.id,
        clubName: club.name,
        groupingId: grouping.id,
        groupingName: grouping.name,
        teamId: team.id,
        teamName: team.name
      }
    ).from(club)
      .innerJoin(grouping, eq(club.id, grouping.clubId))
      .innerJoin(team, eq(grouping.id, team.groupingId))
      .where(whereClause);

    allTeams = allTeams.concat(teams);
  }
  return allTeams;
}


export async function getOrgRolesByUserId(userId: string): Promise<UserOrgRole[]> {
  const club = alias(org, "club");
  const grouping = alias(org, "grouping");
  const user = alias(usersTable, "user");
  let rows = await db.select({
    userId: user_org.userId,
    userName: user.name,
    userEmail: user.email,
    orgId: user_org.orgId,
    status: user_org.status,
    role: user_org.role,
    orgType: org.type,
    clubName: club.name,
    clubId: club.id,
    groupingName: grouping.name,
    groupingId: grouping.id,
    orgName: org.name,
  })
    .from(user_org)
    .innerJoin(user, eq(user_org.userId, user.id))
    .innerJoin(org, eq(user_org.orgId, org.id))
    .leftJoin(club, eq(org.clubId, club.id))
    .leftJoin(grouping, eq(org.groupingId, grouping.id))
    .where(eq(user_org.userId, userId));


  if (rows.length === 0) {
    console.log("No roles found for userId", userId);
  }

  console.log("User Org Roles: for userId", userId, "roles:", rows);
  const userOrgRoles = rows.map(org => {
    let fullName = "";
    if (org.orgType === "Club") {
      fullName = org.orgName;
    } else if (org.orgType === "Grouping") {
      fullName = `${org.clubName} / ${org.orgName}`;
    } else if (org.orgType === "Team") {
      fullName = `${org.clubName} / ${org.groupingName} / ${org.orgName}`;
    }
    return { ...org, fullName };
  });
  console.log("User Org Roles with full names: ", userOrgRoles);
  return userOrgRoles;
}

export async function getAllOrgRoles(): Promise<UserOrgRole[]> {
  const club = alias(org, "club");
  const grouping = alias(org, "grouping");
  const user = alias(usersTable, "user");
  let rows = await db.select({
    userId: user_org.userId,
    userName: user.name,
    userEmail: user.email,
    orgId: user_org.orgId,
    status: user_org.status,
    role: user_org.role,
    orgType: org.type,
    clubName: club.name,
    clubId: club.id,
    groupingName: grouping.name,
    groupingId: grouping.id,
    orgName: org.name,
  })
    .from(user_org)
    .innerJoin(user, eq(user_org.userId, user.id))
    .innerJoin(org, eq(user_org.orgId, org.id))
    .leftJoin(club, eq(org.clubId, club.id))
    .leftJoin(grouping, eq(org.groupingId, grouping.id));

  const userOrgRoles = rows.map(org => {
    let fullName = "";
    if (org.orgType === "Club") {
      fullName = org.orgName;
    } else if (org.orgType === "Grouping") {
      fullName = `${org.clubName} / ${org.orgName}`;
    } else if (org.orgType === "Team") {
      fullName = `${org.clubName} / ${org.groupingName} / ${org.orgName}`;
    }
    return { ...org, fullName };
  });
  return userOrgRoles;
}

export async function getUserCountsPerOrg() {
  const result = await db
    .select({
      id: user_org.orgId,
      count: sql<number>`COUNT(${user_org.userId})`
    })
    .from(user_org)
    .groupBy(user_org.orgId);
  return result;
}

export async function getOrgCountsPerUser() {
  const result = await db
    .select({
      id: user_org.userId,
      count: sql<number>`COUNT(${user_org.orgId})`
    })
    .from(user_org)
    .groupBy(user_org.userId);
  return result;
}
// get the userIds of the Admin and Editors allocated to the Grouping and Club orgs for the org referenced by the teamId passed in

export async function getTeamAuthorisers(teamId: number) {
  // Get the team org
  const teamOrg = await db.select({
    clubId: org.clubId,
    groupingId: org.groupingId
  }).from(org).where(eq(org.id, teamId));
  if (!teamOrg[0]) return [];

  const { clubId, groupingId } = teamOrg[0];

  // Get Admins and Editors for Club and Grouping orgs
  const result = await db
    .select({
      userId: user_org.userId,
      name: usersTable.name,
      email: usersTable.email,
      role: user_org.role,
      orgId: user_org.orgId,
      orgName: org.name,
      orgType: org.type
    })
    .from(user_org)
    .innerJoin(usersTable, eq(user_org.userId, usersTable.id))
    .innerJoin(org, eq(user_org.orgId, org.id))
    .where(
      and(
        inArray(user_org.orgId, [clubId, groupingId].filter((id): id is number => typeof id === 'number')),
        or(
          eq(user_org.role, "Admin"),
          eq(user_org.role, "Editor")
        )
      )
    );
  return result;
}


export async function createUserOrgRole(data: typeof user_org.$inferInsert) {
  return await db.insert(user_org).values(data).returning();
}

export async function updateUserOrgRole(updates: typeof user_org.$inferInsert) {
  await db
    .update(user_org)
    .set(updates)
    .where(
      and(
        eq(user_org.orgId, updates.orgId),
        eq(user_org.userId, updates.userId)
      )
    );
}

export async function deleteUserOrgRole(
  orgId: number,
  userId: string,
  role: RoleType
) {
  await db.delete(user_org).where(
    and(
      eq(user_org.orgId, orgId),
      eq(user_org.userId, userId),
      eq(user_org.role, role)
    )
  );
}

// Locations   

export async function getLocations() {
  const locations = await db
    .select({
      id: location.id,
      name: location.name,
      abbrev: location.abbrev,
    })
    .from(location)
  return locations;
}

export async function getLocationById(id: number) {
  const locations = await db.select().from(location).where(eq(location.id, id));
  return locations[0];
}

export async function getLocationByName(name: string) {
  const locations = await db.select().from(location).where(eq(location.name, name));
  return locations[0];
}

export async function getFacilityCountsPerLocation() {
  const result = await db
    .select({
      id: facility.locationId,
      count: sql<number>`COUNT(${facility.id})`
    })
    .from(facility)
    .groupBy(facility.locationId);

  return result;
}

export async function createLocation(data: Omit<typeof location.$inferInsert, "id">) {
  return await db.insert(location).values(data).returning({ id: location.id });
}

export async function updateLocation(id: number, updates: Partial<typeof location.$inferInsert>) {
  await db.update(location).set(updates).where(eq(location.id, id));
}

export async function deleteLocation(id: number) {
  await db.delete(location).where(eq(location.id, id));
}

// Facilities

export async function getFacilities() {
  const facilities = await db.select({
    id: facility.id,
    name: facility.name,
    abbrev: facility.abbrev,
    slotDurationMins: facility.slotDurationMins,
    concurrentUseNumber: facility.concurrentUseNumber,
    locationId: facility.locationId,
    locationName: location.name,
    scheduleId: facility.scheduleId,
    scheduleName: schedule.name
  }).from(facility)
    .leftJoin(location, eq(facility.locationId, location.id))
    .leftJoin(schedule, eq(facility.scheduleId, schedule.id))
  return facilities;
}

export async function getFacilityById(id: number) {
  const facilities = await db.select(
    {
      id: facility.id,
      name: facility.name,
      abbrev: facility.abbrev,
      slotDurationMins: facility.slotDurationMins,
      concurrentUseNumber: facility.concurrentUseNumber,
      locationId: facility.locationId,
      locationName: location.name,
      scheduleId: facility.scheduleId,
      scheduleName: schedule.name
    }
  ).from(facility)
    .leftJoin(location, eq(facility.locationId, location.id))
    .leftJoin(schedule, eq(facility.scheduleId, schedule.id))
    .where(eq(facility.id, id));
  return facilities[0];
}

export async function getFacilitiesByIds(ids: number[]) {
  const facilities = await db.select(
    {
      id: facility.id,
      name: facility.name,
      abbrev: facility.abbrev,
      slotDurationMins: facility.slotDurationMins,
      concurrentUseNumber: facility.concurrentUseNumber,
      locationId: facility.locationId,
      locationName: location.name,
      scheduleId: facility.scheduleId,
      scheduleName: schedule.name
    }
  ).from(facility)
    .leftJoin(location, eq(facility.locationId, location.id))
    .leftJoin(schedule, eq(facility.scheduleId, schedule.id))
    .where(inArray(facility.id, ids));
  return facilities;
}

export async function getFacilitiesByLocationId(locationId: number) {
  const facilities = await db.select(
    {
      id: facility.id,
      name: facility.name,
      abbrev: facility.abbrev,
      slotDurationMins: facility.slotDurationMins,
      concurrentUseNumber: facility.concurrentUseNumber,
      locationId: facility.locationId,
      locationName: location.name,
      scheduleId: facility.scheduleId,
      scheduleName: schedule.name
    })
    .from(facility)
    .where(eq(facility.locationId, locationId))
    .leftJoin(location, eq(facility.locationId, location.id))
    .leftJoin(schedule, eq(facility.scheduleId, schedule.id));
  return facilities;
}

export async function createFacility(data: Omit<typeof facility.$inferInsert, "id">) {
  return await db.insert(facility).values(data).returning({ id: facility.id });
}

export async function updateFacility(id: number, updates: Partial<typeof facility.$inferInsert>) {
  await db.update(facility).set(updates).where(eq(facility.id, id));
}

export async function deleteFacility(id: number) {
  await db.delete(facility).where(eq(facility.id, id));
}


// --- ORG CRUD FUNCTIONS ---

// Get all orgs
export async function getOrgs() {
  console.log("Fetching all orgs");
  return db.select({
    id: org.id,
    name: org.name,
    abbrev: org.abbrev,
    type: org.type,
    status: org.status,
    clubId: org.clubId,
    groupingId: org.groupingId
  }).from(org);
}

export async function getOrgClubs() {
  console.log("Fetching all org clubs");
  return db.select({
    id: org.id,
    name: org.name,
    abbrev: org.abbrev,
    type: org.type,
    status: org.status,
    clubId: org.clubId,
    groupingId: org.groupingId
  }).from(org).where(eq(org.type, 'Club'));
}

export async function getOrgById(id: number) {
  const orgs = await db.select().from(org).where(eq(org.id, id));
  return orgs[0];
}

export async function getOrgGroupingsByClubId(clubId: number) {
  return db.select()
    .from(org)
    .where(
      and(eq(org.clubId, clubId),
        eq(org.type, 'Grouping'))
    );
}

export async function getOrgTeamsByGroupingId(groupingId: number) {
  return db.select()
    .from(org)
    .where(
      and(eq(org.groupingId, groupingId),
        eq(org.type, 'Team'))
    );
}

// Get org by id
export async function getOrgClubGroupingById(id: number) {
  const club = alias(org, "club");
  const grouping = alias(org, "grouping");
  return db.select().from(org).where(eq(org.id, id))
    .leftJoin(club, eq(org.clubId, club.id))
    .leftJoin(grouping, eq(org.groupingId, grouping.id))
    .then(rows => rows[0]);
}

export async function getAllOrgClubGrouping() {
  const club = alias(org, "club");
  const grouping = alias(org, "grouping");
  return db.select({
    orgId: org.id,
    orgType: org.type,
    clubName: club.name,
    groupingName: grouping.name,
    orgName: org.name,
    fullName: sql<string>`
      CONCAT_WS(
        ' / ',
        ${club.name},
        ${grouping.name},
        ${org.name}
      )
    `
  }).from(org)
    .leftJoin(club, eq(org.clubId, club.id))
    .leftJoin(grouping, eq(org.groupingId, grouping.id));
}
// Insert new org
export async function createOrg(data: Omit<typeof org.$inferInsert, "id">) {
  console.log("Creating new org with data:", data);
  return await db.insert(org).values(data).returning({ id: org.id });
}

export async function createBaseOrg(data: typeof org.$inferInsert) {
  return await db.insert(org).values(data).returning({ id: org.id });
}

// Update org by id
export async function updateOrg(id: number, data: Partial<typeof org.$inferInsert>) {
  console.log(`Updating org with id ${id}`, data);
  return db.update(org).set(data).where(eq(org.id, id)).returning();
}

// Delete org by id
export async function deleteOrg(id: number) {
  return db.delete(org).where(eq(org.id, id));
}

// Schedules

export async function getSchedules() {
  return await db.select(
    {
      id: schedule.id,
      name: schedule.name,
    }
  ).from(schedule);
}

export async function getScheduleById(id: number) {
  const schedules = await db.select().from(schedule).where(eq(schedule.id, id));
  return schedules[0];
}

export async function getScheduleByName(name: string) {
  const schedules = await db.select().from(schedule).where(eq(schedule.name, name));
  return schedules[0];
}

export async function createSchedule(data: typeof schedule.$inferInsert) {
  return await db.insert(schedule).values(data).returning({ id: schedule.id });
}

export async function updateSchedule(id: number, updates: Partial<typeof schedule.$inferInsert>) {
  await db.update(schedule).set(updates).where(eq(schedule.id, id));
}

export async function deleteSchedule(id: number) {
  await db.delete(schedule).where(eq(schedule.id, id));
}

// Schedule Blocks

export async function getScheduleBlocksByFacilityList(facilityIds: number[], startDate: Date, endDate: Date): Promise<ScheduleFacilityBlock[]> {
  return await db.select({
    facilityId: facility.id,
    scheduleId: facility.scheduleId,
    blockId: schedule_block.id,
    startDate: schedule_block.startDate,
    endDate: schedule_block.endDate,
    startTime: schedule_block.startTime,
    endTime: schedule_block.endTime,
    status: schedule_block.status
  }).from(facility)
    .innerJoin(schedule_block, eq(facility.scheduleId, schedule_block.scheduleId))
    .where(
      and(
        inArray(facility.id, facilityIds),
        lte(schedule_block.startDate, startDate.toISOString()),
        gte(schedule_block.endDate, endDate.toISOString())
      )
    );
}

export async function getScheduleBlocksByScheduleId(scheduleId: number) {
  return await db.select().from(schedule_block).where(eq(schedule_block.scheduleId, scheduleId));
}

export async function getScheduleBlockById(id: number): Promise<ScheduleBlock | null> {
  const blocks = await db.select().from(schedule_block).where(eq(schedule_block.id, id));
  return blocks[0] || null;
}

export async function createScheduleBlock(data: typeof schedule_block.$inferInsert) {
  return await db.insert(schedule_block).values(data).returning({ id: schedule_block.id });
}

export async function updateScheduleBlock(id: number, updates: Partial<typeof schedule_block.$inferInsert>) {
  console.log(`Updating schedule block with id ${id}`, updates);
  await db.update(schedule_block).set(updates).where(eq(schedule_block.id, id));
}

export async function deleteScheduleBlock(id: number) {
  await db.delete(schedule_block).where(eq(schedule_block.id, id));
}

// == BOOKINGS ===
export async function getBookingRequests() {
  return await db.select().from(booking_request);
}

export async function getBookingRequestById(bookingId: number): Promise<BookingRequest | null> {
  const requestors = alias(usersTable, "requestors");
  const approvers = alias(usersTable, "approvers");

  const bookings = await db.select(
    {
      bookingId: booking_request.bookingId,
      description: booking_request.description,

      eventType: booking_request.eventType,
      teamId: booking_request.teamId,
      groupingId: booking_request.groupingId,
      clubId: booking_request.clubId,
      
      status: booking_request.status,
      createdAt: booking_request.createdAt,
      updatedAt: booking_request.updatedAt,

      requestorId: booking_request.requestorId,
      requestorName: requestors.name,
      requestorEmail: requestors.email,

      approverId: booking_request.approverId,
      approverEmail: approvers.email,
      approverName: approvers.name,

      requestedNumSlots: sql<number>`
        (SELECT COUNT(*) FROM ${booking_facility} WHERE ${booking_facility.bookingId} = ${booking_request.bookingId})
      `
    }
  )
    .from(booking_request)
    .leftJoin(requestors, eq(booking_request.requestorId, requestors.id))
    .leftJoin(approvers, eq(booking_request.approverId, approvers.id))
    .where(eq(booking_request.bookingId, bookingId));

  return bookings[0];
}

export async function getBookingRequestsByTeamIds(teamIds: number[]) {
  const requestors = alias(usersTable, "requestors");
  const approvers = alias(usersTable, "approvers");

  const bookings = await db.select(
    {
      bookingId: booking_request.bookingId,
      description: booking_request.description,

      eventType: booking_request.eventType,
      teamId: booking_request.teamId,
      groupingId: booking_request.groupingId,
      clubId: booking_request.clubId,
      status: booking_request.status,
      createdAt: booking_request.createdAt,
      updatedAt: booking_request.updatedAt,

      requestorId: booking_request.requestorId,
      requestorName: requestors.name,
      requestorEmail: requestors.email,

      approverId: booking_request.approverId,
      approverEmail: approvers.email,
      approverName: approvers.name,

      requestedNumSlots: sql<number>`
        (SELECT COUNT(*) FROM ${booking_facility} WHERE ${booking_facility.bookingId} = ${booking_request.bookingId})
      `
    }
  )
    .from(booking_request)
    .leftJoin(requestors, eq(booking_request.requestorId, requestors.id))
    .leftJoin(approvers, eq(booking_request.approverId, approvers.id))
    .where(
      inArray(booking_request.teamId, teamIds)
    );
  return bookings;
}

export async function getBookingsByFacilityList(facilityIds: number[], startDate: Date, endDate: Date): Promise<FacilityBooking[]> {
  // First get the schedule IDs from the facilities
  return await db.select({
    bookingFacilityId: booking_facility.id,
    bookingRequestId: booking_facility.bookingId,
    bookingRequestDescription: booking_request.description,
    teamId: booking_request.teamId,
    facilityId: booking_facility.facilityId,
    date: booking_facility.date,
    startTime: booking_facility.startTime,
    endTime: booking_facility.endTime,
    status: booking_request.status
  }).from(booking_facility)
    .innerJoin(booking_request, eq(booking_facility.bookingId, booking_request.bookingId))
    .where(
      and(
        inArray(booking_facility.facilityId, facilityIds),
        gte(booking_facility.date, startDate.toISOString()),
        lte(booking_facility.date, endDate.toISOString())
      )
    );
}


export async function createBookingRequest(data: typeof booking_request.$inferInsert) {
  console.log("Creating booking request with data:", data);
  return await db.insert(booking_request).values(data).returning({ bookingId: booking_request.bookingId });
}

export async function updateBookingRequest(bookingId: number, updates: Partial<typeof booking_request.$inferInsert>) {
  console.log(`Updating booking request with id ${bookingId}`, updates);
  await db.update(booking_request).set(updates).where(eq(booking_request.bookingId, bookingId));
}

export async function deleteBookingRequest(bookingId: number) {
  await db.delete(booking_request).where(eq(booking_request.bookingId, bookingId));
}

export async function getBookingFacilityCountsPerBookingRequest() {
  const result = await db
    .select({
      id: booking_facility.bookingId,
      count: sql<number>`COUNT(${booking_facility.id})`
    })
    .from(booking_facility)
    .groupBy(booking_facility.bookingId);
  return result;
}

export async function getBookingFacilitiesByBookingId(bookingId: number) {
  return await db.select(
    {
      id: booking_facility.id,
      bookingId: booking_facility.bookingId,
      facilityId: booking_facility.facilityId,
      date: booking_facility.date,
      startTime: booking_facility.startTime,
      endTime: booking_facility.endTime,
      status: booking_facility.status,
      facilityName: facility.name
    }
  )
    .from(booking_facility)
    .innerJoin(facility, eq(booking_facility.facilityId, facility.id))
    .where(
      eq(booking_facility.bookingId, bookingId)
    );
}

export async function createBookingFacility(data: typeof booking_facility.$inferInsert) {
  console.log("Creating booking facility with data:", data);
  return await db.insert(booking_facility).values(data).returning({ id: booking_facility.id });
}

export async function updateBookingFacility(id: number, updates: Partial<typeof booking_facility.$inferInsert>) {
  await db.update(booking_facility).set(updates).where(eq(booking_facility.id, id));
}

export async function updateBookingFacilityStatusByBookingId(bookingId: number, status: BookingStatus) {
  await db.update(booking_facility).set({ status }).where(eq(booking_facility.bookingId, bookingId));
}

export async function deleteBookingFacility(id: number) {
  await db.delete(booking_facility).where(eq(booking_facility.id, id));
}


export async function getBookingCommentCountsPerBookingRequest() {
  const result = await db
    .select({
      id: booking_comment.bookingId,
      count: sql<number>`COUNT(${booking_comment.id})`
    })
    .from(booking_comment)
    .groupBy(booking_comment.bookingId);
  return result;
}

export async function getBookingCommentsByBookingId(bookingId: number): Promise<BookingComment[]> {
  return await db
    .select({
      id: booking_comment.id,
      bookingId: booking_comment.bookingId,
      comment: booking_comment.comment,
      userId: booking_comment.userId,
      userName: usersTable.name,
      updatedAt: booking_comment.updatedAt,
      createdAt: booking_comment.createdAt,
    })
    .from(booking_comment)
    .innerJoin(usersTable, eq(booking_comment.userId, usersTable.id))
    .where(
      eq(booking_comment.bookingId, bookingId)
    );
}

export async function createBookingComment(data: typeof booking_comment.$inferInsert) {
  console.log("Creating booking comment with data:", data);
  return await db.insert(booking_comment).values(data).returning({ id: booking_comment.id });
}

export async function updateBookingComment(id: number, updates: Partial<typeof booking_comment.$inferInsert>) {
  await db.update(booking_comment).set(updates).where(eq(booking_comment.id, id));
}

export async function deleteBookingComment(id: number) {
  await db.delete(booking_comment).where(eq(booking_comment.id, id));
}
