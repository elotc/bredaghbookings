"use client";

import { useActionState, useState } from "react";
import { userAction } from "@/lib/admin/UserActions";
import { StdFormCancelBtn, StdForm, StdFormInput, StdFormMetaText, StdFormReadOnly, StdFormSelect, StdFormSubmitBtn, StdFormError, StdFormHidden, StdFormButtonBar } from "@/components/general/StdForm";
import { StdStatus, User } from "@/data/definitions";

export default function UserForm({ user, emails = [] }: { user?: User, emails?: string[] }) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [status, setStatus] = useState<string | number>(user?.status || "pending");

    const [formState, formAction] = useActionState(userAction, { error: "" });

    return (
        <StdForm title={user ? "Update User" : "Create User"} action={formAction} >
            {formState.error && (<StdFormError error={formState.error} />)}
            <StdFormHidden name="userId" defaultValue={user ? user.id : "unset"} />

            <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} required />
            <StdFormInput name="email" label="Email" type="email" defaultValue={email} onChange={setEmail} required>
                {emails.includes(email) && (<p className="text-red-600 text-sm mt-1">This email already exists.</p>)}
                <datalist id="email-suggestions">
                    {emails.map((e, i) => (<option value={e} key={i} />))}
                </datalist>
            </StdFormInput>
            {!user && (
                <StdFormReadOnly name="status" label="Initial Status" defaultValue="Pending" />
            )}
            {user && (
                <StdFormSelect name="status" label="Status" onChange={setStatus}
                    options={Object.values(StdStatus).map(role => ({ value: String(role), label: String(role) }))}
                    defaultValue={status} />
            )}
            <StdFormButtonBar>
                <StdFormCancelBtn backRef="/admin/users" />
                <StdFormSubmitBtn disabled={
                    !name.trim() ||
                    !email.trim() ||
                    emails.includes(email)
                } >
                    {user ? "Update User" : "Create User"}
                </StdFormSubmitBtn>
            </StdFormButtonBar>

        </StdForm>
    );
}