import { db } from "./schema";
import { org } from "./schema";
import { eq } from "drizzle-orm";

// --- ORG CRUD FUNCTIONS ---

// Get all orgs
export async function getOrgs() {
  return db.select().from(org);
}

// Get org by id
export async function getOrgById(id: number) {
  return db.select().from(org).where(eq(org.id, id)).then(rows => rows[0]);
}

// Insert new org
export async function insertOrg(data: Omit<typeof org.$inferInsert, "id">) {
  return db.insert(org).values(data).returning();
}

// Update org by id
export async function updateOrg(id: number, data: Partial<typeof org.$inferInsert>) {
  return db.update(org).set(data).where(eq(org.id, id)).returning();
}

// Delete org by id
export async function deleteOrg(id: number) {
  return db.delete(org).where(eq(org.id, id));
}

// --- ORG RELATIONS HELPERS ---

// Get parent club for an org
export async function getParentClub(orgId: number) {
  const orgRow = await getOrgById(orgId);
  if (!orgRow?.clubId) return null;
  return getOrgById(orgRow.clubId);
}

// Get parent grouping for an org
export async function getParentGrouping(orgId: number) {
  const orgRow = await getOrgById(orgId);
  if (!orgRow?.groupingId) return null;
  return getOrgById(orgRow.groupingId);
}

// Update parent club
export async function updateParentClub(orgId: number, clubId: number | null) {
  return updateOrg(orgId, { clubId });
}

// Update parent grouping
export async function updateParentGrouping(orgId: number, groupingId: number | null) {
  return updateOrg(orgId, { groupingId });
}