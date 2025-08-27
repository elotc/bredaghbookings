"use server";

import { Resend } from 'resend';
import { VerificationRequestEmail } from "@/components/email/VerificationRequestEmail";

const baseUrl = process.env.BASE_URL
  ? `http://${process.env.BASE_URL}`
  : 'http://localhost:3000';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url, theme } = params


  const { host } = new URL(url)

  try {
    let emailContent = VerificationRequestEmail({
      to: to,
      url: url,
      host: host,
    });

    const { data, error } = await resend.emails.send({
      from: `Bredagh <noreply@bredagh.tolemics.com>`,
      to: [to],
      subject: `Sign in to ${host}`,
      react: emailContent,
    });

    if (error) {
      throw new Error(`Error sending verification email: ${error}`);
    }
  } catch (error) {
    const errorMessage =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error';
    console.error('Error sending verification email:', errorMessage);
  }
}

