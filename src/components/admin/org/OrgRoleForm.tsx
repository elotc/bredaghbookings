"use client";
import { StdFormCancelBtn, StdForm, StdFormHidden, StdFormInput, StdFormMetaText, StdFormNavBtn, StdFormReadOnly, StdFormSelect, StdFormSubmitBtn, StdFormButtonBar, StdFormError, StdFormFieldError } from "@/components/general/StdForm";
import { Org, RoleType, BaseUser } from "@/data/definitions";
import { useActionState } from "react";
import { orgRoleAction } from "@/lib/admin/OrgRoleActions";
import { useState } from "react";

export default function OrgUserForm({ org, user, userRole }:
    { org: Org, user?: BaseUser, userRole?: string}) {
        
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [role, setRole] = useState(userRole || RoleType.VIEWER);

    const [formState, formAction] = useActionState(orgRoleAction, { error: "" });

    return (
        <StdForm title={`${user ? "Update" : "Create"} role for ${org.name ?? ""}`} action={formAction}>
            {formState.error && (<StdFormError error={formState.error} /> )}
            {user !== undefined ?
                <StdFormReadOnly name="name" label="Name" defaultValue={name} />
                :
                <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} required />
            }
            {user !== undefined ? <StdFormReadOnly name="email" label="Email" defaultValue={email} />
                : <StdFormInput name="email" label="Email" type="email" defaultValue={email} onChange={setEmail} required />
            }

            <StdFormSelect name="role" label="Role" onChange={setRole} defaultValue={role} required
                options={Object.values(RoleType).map(role => ({ value: role, label: role }))}
            />

            <StdFormHidden name="orgId" defaultValue={String(org.id)} />
            {user && <StdFormHidden name="userId" defaultValue={user.id} />}

            <StdFormButtonBar>
                <StdFormCancelBtn backRef={"/admin/orgs/" + org.id + "/users"} />
                <StdFormSubmitBtn disabled={
                    !name.trim() ||
                    !email.trim()
                } >
                    {user ? `Update` : `Create`}
                </StdFormSubmitBtn>
            </StdFormButtonBar>
        </StdForm>
    );
}