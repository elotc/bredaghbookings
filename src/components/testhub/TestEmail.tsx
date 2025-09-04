"use client";

import { StdFormCancelBtn, StdForm, StdFormInput, StdFormSubmitBtn, StdFormError, StdFormButtonBar, StdFormSelect } from "@/components/general/StdForm";
import { sendTestEmail } from "@/lib/testhub/TestEmailActions";
import { useActionState, useState } from "react";

export default function TestEmail() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailType, setEmailType] = useState("BookingAck");

    const [formState, formAction] = useActionState(sendTestEmail, { error: "" });

    return (
        <StdForm title="Test Email" action={formAction}>
            {formState.error && (<StdFormError error={formState.error} />)}
            {formState.success && (<div>Email sent successfully!</div>)}

            <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} />
            <StdFormInput name="email" label="Email" type="email" defaultValue={email} onChange={setEmail} />
            <StdFormSelect name="emailType" label="Email Type" options={[
                { value: "BookingAck", label: "Booking Acknowledgment" },
                { value: "UserInvite", label: "User Invite" },
                { value: "VerificationRequest", label: "Verification Request" }
            ]} defaultValue={emailType} onChange={value => setEmailType(String(value))} />
            <StdFormButtonBar>
                <StdFormCancelBtn backRef="/" />
                <StdFormSubmitBtn disabled={
                    !name.trim() ||
                    !email.trim()
                } >
                    {"Send Test Email"}
                </StdFormSubmitBtn>
            </StdFormButtonBar>
        </StdForm>
    );
}

