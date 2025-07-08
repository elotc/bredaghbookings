import { InviteUserEmail } from '@/components/email/invite-user';
import { Resend } from 'resend';
import { log } from '../util/logging';

const baseUrl = process.env.BASE_URL
    ? `http://${process.env.BASE_URL}`
    : 'http://localhost:3000';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendUserInvite(toName: string, toEmail: string, fromName: string, fromEmail: string) {
    log('Sending user invite:', 'info', toName + '|' + toEmail + '|' + fromName + '|' + fromEmail);
    try {
        let emailContent = InviteUserEmail({
            username: toName,
            invitedByUsername: fromName,
            relatingTo: "Bredagh Bookings",
            inviteLink: baseUrl + "/auth/sign-in",
        });
        let emailSubject = 'Bredagh Booking App Membership Invite';

        const { data, error } = await resend.emails.send({
            from: `Bredagh <onboarding@bredagh.tolemics.com>`,
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
        log('Error sending user invite:', 'error', errorMessage);
    }
};