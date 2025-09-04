'use server';

import { createBookingRequest, updateBookingRequest, deleteBookingRequest, createBookingFacility, createBookingComment, getTeamAuthorisers, getUserById, updateBookingFacilityStatusByBookingId } from '@/data/dataAccessLayer';
import { BookingStatus, BookingType } from '@/data/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sendBookingUpdate } from '../emails/sendBookingUpdate';

export async function bookingCriteriaAction(prevState: any, formData: FormData) {
    console.log("Booking criteria action called with formData:", formData);
    const userId = formData.get('userId');
    const orgId = formData.get('orgId');
    const teamId = formData.get('teamId');
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const facilities = formData.getAll('facilities');

    try {
        console.log("Booking criteria action called with:", { userId, teamId, facilities });
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    redirect('/bookings/' + userId + '/' + orgId + '/create/' + facilities.join('|') + '/' + startDate + '/' + endDate + '/' + teamId);
}

export async function bookingConfirmAction(prevState: any, formData: FormData) {
    console.log("Booking confirm action called with formData:", formData);
    const slots = formData.getAll('slots') as string[];
    const requestorId = formData.get('requestorId') as string;
    const teamId = formData.get('teamId') as string;
    const groupingId = formData.get('groupingId') as string;
    const clubId = formData.get('clubId') as string;
    const eventType = formData.get('eventType') as string;
    const description = formData.get('description') as string;
    const addNotes = formData.get('addNotes') as string;

    if (!eventType) {
        return { error: "Event type is required" };
    }

    try {
        const bookingRequest = {
            teamId: Number(teamId),
            groupingId: Number(groupingId),
            clubId: Number(clubId),
            requestorId: requestorId,
            status: "Requested" as BookingStatus,
            eventType: eventType as BookingType,
            description: description
        };
        const bookingId = await createBookingRequest(bookingRequest);

        for (const slot of slots) {
            const date = new Date(Number(slot.split('|')[1]));
            const startDate = new Date(date);
            const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 minutes in ms

            const bookingFacility = {
                bookingId: bookingId[0].bookingId,
                facilityId: Number(slot.split('|')[0]),
                date: startDate.toISOString().split('T')[0],
                startTime: startDate.toTimeString().split(' ')[0],
                endTime: endDate.toTimeString().split(' ')[0],
                status: "Requested" as BookingStatus,
            };
            await createBookingFacility(bookingFacility);
        }

        if (addNotes && addNotes.toString().trim() !== "") {
            await createBookingComment({
                bookingId: bookingId[0].bookingId,
                userId: String(requestorId),
                comment: String(addNotes)
            });
        }

        const requestor = await getUserById(requestorId);
        const authorisers = await getTeamAuthorisers(Number(teamId));
        const authEmails = authorisers.map(auth => auth.email).filter((email): email is string => email !== null);
        if (!authEmails || authEmails.length === 0) {
            throw new Error("No authorisers found for team [" + teamId + "]");
        } else {
            await sendBookingUpdate(
                authEmails,
                description,
                `A new booking request has been submitted by ${requestor.name}.`,
                `Please review and approve/reject the request.`,
                requestor.email ? requestor.email : 'unknown',
                '/external/bookings/' + bookingId[0].bookingId
            );
        }
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    redirect('/home');
}

export async function updateBookingRequestAction(prevState: any, formData: FormData) {
    console.log("Update booking request action called with formData:", formData);
    const bookingId = formData.get('bookingId') as string;
    const bookingDescription = formData.get('bookingDescription') as string;
    const status = formData.get('status') as string;
    const comment = formData.get('comment') as string;
    const updaterEmail = formData.get('updaterEmail') as string;
    const updaterId = formData.get('updaterId') as string;
    const updaterOrgId = formData.get('updaterOrgId') as string;
    const requestorEmail = formData.get('requestorEmail') as string;
    const originalStatus = formData.get('originalStatus') as string;

    try {
        if (originalStatus !== status) {
            const bookingRequestUpdates: { status: BookingStatus; approverId?: string } = {
                status: status as BookingStatus,
            };

            if (status === "Approved" || status === "Rejected") {
                bookingRequestUpdates.approverId = updaterId;
            }
            await updateBookingRequest(Number(bookingId), bookingRequestUpdates);
            await createBookingComment({
                bookingId: Number(bookingId),
                userId: updaterId,
                comment: `Booking request has been ${status.toLowerCase()}`,
            });
            await updateBookingFacilityStatusByBookingId(Number(bookingId), status as BookingStatus);
            await sendBookingUpdate(
                [requestorEmail, updaterEmail],
                bookingDescription,
                'Status Change',
                `Booking request has been ${status.toLowerCase()}.`,
                updaterEmail ? updaterEmail : 'unknown',
                '/external/bookings/' + bookingId
            );
        }
        if (comment && comment.trim() !== "") {
            await createBookingComment({
                bookingId: Number(bookingId),
                userId: updaterId,
                comment: comment
            });
            await sendBookingUpdate(
                [requestorEmail, updaterEmail],
                bookingDescription,
                `A new comment has been added:`,
                comment,
                updaterEmail ? updaterEmail : 'unknown',
                '/external/bookings/' + bookingId
            );
        }
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    revalidatePath('/bookings/' + updaterId + '/' + updaterOrgId);
    redirect('/bookings/' + updaterId + '/' + updaterOrgId);
}
