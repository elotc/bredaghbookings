'use server';

import { createBookingRequest, updateBookingRequest, deleteBookingRequest, getBookingRequests, getBookingRequestById, getScheduleBlocksByFacilityList } from '@/data/dataAccessLayer';
import { BookingStatus, BookingType } from '@/data/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function bookingCriteriaAction(prevState: any, formData: FormData) {
    console.log("Booking criteria action called with formData:", formData);
    const userId = formData.get('userId');
    const teamId = formData.get('teamId');
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const facilities = formData.getAll('facilities');

    console.log("Parsed facilities:", facilities);

    try {
        console.log("Booking criteria action called with:", { userId, teamId, facilities });
        //blocks = await getScheduleBlocksByFacilityList(JSON.parse(facilities));
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    redirect('/bookings/' + userId + '/' + facilities.join('|') + '/' + startDate + '/' + endDate);
}

export async function bookingRequestAction(prevState: any, formData: FormData) {
    const bookingId = Number(formData.get('bookingId'));
    const bookingAbbrev = formData.get('bookingAbbrev') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as BookingStatus;
    const eventType = formData.get('eventType') as BookingType;
    const requestorId = formData.get('requestorId') as string;
    const approverId = formData.get('approverId') as string | null;
    const teamId = Number(formData.get('teamId'));

    try {
        if (bookingId >= 0) {
            await updateBookingRequest(bookingId, { bookingAbbrev, description, status, eventType, requestorId, approverId, teamId });
        } else {
            await createBookingRequest({ bookingAbbrev, description, status, eventType, requestorId, approverId, teamId });
        }
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }

    revalidatePath('/bookings');
    redirect('/bookings');
}

export async function deleteBookingRequestAction(id: number) {
    try {
        await deleteBookingRequest(id);
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }
    revalidatePath('/bookings');
}

export async function duplicateBookingRequestAction(id: number) {
    
    try {
        const booking = await getBookingRequestById(id);

        const { bookingId: _, ...bookingData } = booking;
        bookingData.description = 'DUPLICATE ' + bookingData.description;
        bookingData.bookingAbbrev = 'DUPLICATE ' + bookingData.bookingAbbrev;
        
        await createBookingRequest({ ...bookingData });
    } catch (err: any) {
        return { error: err.message || "Unknown error" };
    }
    revalidatePath('/bookings');

}
