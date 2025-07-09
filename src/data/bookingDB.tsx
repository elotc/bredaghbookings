import { db } from "@/data/dbConn";
import { booking_request } from "@/data/bookings/schema";
import { eq, gt, lt, sql } from 'drizzle-orm';

export async function getBookingRequests() {
  return db.select().from(booking_request);
}

export async function getBookingRequestById(id: number) {
  return db.select().from(booking_request).where(eq(booking_request.booking_id,id)).limit(1);

}

export async function createBookingRequest(bookingRequest: typeof booking_request.$inferInsert) {
  return db.insert(booking_request).values(bookingRequest);
}

export async function updateBookingRequest(id: number, updates: Partial<typeof booking_request.$inferInsert>) {
  return db.update(booking_request).set(updates).where(eq(booking_request.booking_id,id));
}   

export async function deleteBookingRequest(id: number) {
  return db.delete(booking_request).where(eq(booking_request.booking_id,id));
}

export async function getPendingBookingRequests() {
  return db.select().from(booking_request).where(eq(booking_request.status,"Requested"));
}   

export async function getApprovedBookingRequests() {
  return db.select().from(booking_request).where(eq(booking_request.status,"Approved"));
}   

export async function getRejectedBookingRequests() {
  return db.select().from(booking_request).where(eq(booking_request.status,"Rejected"));
}

export async function getBookingRequestsByUserId(userId: string) {
  return db.select().from(booking_request).where(eq(booking_request.requestor_id,userId));
}

export async function getBookingRequestsByOrgId(teamId: number) {
  return db.select().from(booking_request).where(eq(booking_request.team_id,teamId));
}


