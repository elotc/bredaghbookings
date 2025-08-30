
import { sendBookingAck } from "../emails/sendBookingUpdate";
import { sendUserInvite } from "../emails/sendUserInvite";
import { sendVerificationRequest } from "../emails/sendVerificationRequest";

export async function sendTestEmail(prevState: any, formData: FormData) {
    const userName = formData.get("name");
    const email = formData.get("email");
    const emailType = formData.get("emailType");

    try {
        if (typeof userName !== "string" || typeof email !== "string") {
            throw new Error("Invalid form data");
        }
        if (emailType == "BookingAck") {
            console.log("Sending booking acknowledgment email");
            await sendBookingAck(userName, email, "noreply@bredagh.tolemics.com");
        } else if (emailType == "UserInvite") {
            console.log("Sending user invite email");
            await sendUserInvite(userName, email, "Bredagh Admin", "noreply@bredagh.tolemics.com");
        } else if (emailType == "VerificationRequest") {
            console.log("Sending verification request email");
            await sendVerificationRequest({ identifier: email, provider: "Bredagh", url: "/home", theme: "default" });
        }
    } catch (err: any) {
        return { error: err.message };
    }
    return { success: true };
}

