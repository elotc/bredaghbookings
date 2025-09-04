"use server";

import { InviteUserEmail } from '@/components/email/InviteUserEmail';
import { Resend } from 'resend';
import { log } from '../util/logging';

const baseUrl = process.env.BASE_URL
    ? `http://${process.env.BASE_URL}`
    : 'http://localhost:3000';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendUserInvite(toName: string, toEmail: string, fromName: string, fromEmail: string) {
    log('Sending user invite:', 'info', toName + '|' + toEmail + '|' + fromName + '|' + fromEmail);
    try {
        const emailContent = InviteUserEmail({
            username: toName,
            invitedByUsername: fromName,
            relatingTo: "Bredagh Bookings",
            inviteLink: baseUrl + "/auth/sign-in",
        });
        const emailSubject = 'Bredagh Booking App Membership Invite';

        const { data, error } = await resend.emails.send({
            from: `Bredagh <onboarding@bredagh.tolemics.com>`,
            to: [toEmail],
            subject: emailSubject,
            react: emailContent,
        });

        console.log('Email sent successfully:', data);
        if (error) {
            throw new Error(`Error sending user invite email: ${error}`);
        }
    } catch (error) {
        const errorMessage =
            typeof error === 'object' && error !== null && 'message' in error
                ? (error as { message: string }).message
                : 'Unknown error';
        log('Error sending user invite:', 'error', errorMessage);
    }
};