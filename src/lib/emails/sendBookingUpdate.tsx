"use server";

import { BookingUpdateEmail } from '@/components/email/BookingUpdateEmail';
import { Resend } from 'resend';


export async function sendBookingUpdate(toEmails: string[], relatingTo: string, label: string, message: string, fromName: string, link: string) {

    const baseUrl = process.env.BASE_URL ? `http://${process.env.BASE_URL}` : 'http://localhost:3000';

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        let emailContent = BookingUpdateEmail({
            fromName: fromName,
            relatingTo: relatingTo,
            label: label,
            message: message,
            bookingLink: baseUrl + link,
        });

        let emailSubject = 'Bredagh Booking: ' + relatingTo;

        const { data, error } = await resend.emails.send({
            from: `Bredagh <bookings@bredagh.tolemics.com>`,
            to: toEmails,
            subject: emailSubject,
            react: emailContent,
        });

        if (error) {
            throw new Error('Error sending email: ' + error.message);
        }
    } catch (error) {
        const errorMessage =
            typeof error === 'object' && error !== null && 'message' in error
                ? (error as { message: string }).message
                : 'Unknown error';
        console.error('Error sending booking update email:', errorMessage);
    }
};