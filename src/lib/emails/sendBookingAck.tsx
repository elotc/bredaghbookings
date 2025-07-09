import { BookingAckEmail } from '@/components/email/booking-ack-email';
import { Resend } from 'resend';
import { log } from '../util/logging';

const baseUrl = process.env.BASE_URL
    ? `http://${process.env.BASE_URL}`
    : 'http://localhost:3000';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingAck(toName: string, toEmail: string, fromName: string) {
    log('Sending booking acknowledgment:', 'info', toName + '|' + toEmail + '|' + fromName);
    try {
        let emailContent = BookingAckEmail({
            username: toName,
            relatingTo: "Bredagh Ladies Senior Football",
            bookingLink: baseUrl + "/bookings/1/view",
        });
        let emailSubject = 'Bredagh Booking Acknowledgement';

        const { data, error } = await resend.emails.send({
            from: `Bredagh <bookings@bredagh.tolemics.com>`,
            to: [toEmail],
            subject: emailSubject,
            react: emailContent,
        });

        if (error) {
            log('Error sending email:', 'error', error.message);
        }
    } catch (error) {
        const errorMessage =
            typeof error === 'object' && error !== null && 'message' in error
                ? (error as { message: string }).message
                : 'Unknown error';
        log('Error sending booking acknowledgment:', 'error', errorMessage);
    }
};