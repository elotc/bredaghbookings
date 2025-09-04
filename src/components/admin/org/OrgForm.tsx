"use client";

import { StdFormButtonBar, StdFormCancelBtn, StdForm, StdFormHidden, StdFormInput, StdFormMetaText, StdFormReadOnly, StdFormSelect, StdFormSubmitBtn, StdFormError } from "@/components/general/StdForm";
import { Org, OrgType, StdStatus } from "@/data/definitions";
import { useActionState } from "react";
import { orgAction } from "@/lib/admin/OrgActions";
import { useState } from "react";

export default function OrgForm({ orgType, org, clubId, clubName, groupingId, groupingName }: { orgType: OrgType, org?: Org, clubId?: number, clubName?: string, groupingId?: number, groupingName?: string }) {
  const [name, setName] = useState(org?.name || "");
  const [abbrev, setAbbrev] = useState(org?.abbrev || "");
  const [status, setStatus] = useState(String(org?.status || StdStatus.PENDING));

  const [formState, formAction] = useActionState(orgAction, { error: "" });

  return (
    <StdForm title={org ? `Update ${orgType}` : `Create ${orgType}`} action={formAction}>
      {formState.error && (<StdFormError error={formState.error} /> )}
      {(orgType === OrgType.TEAM || orgType === OrgType.GROUPING) && (
        <div>
          <StdFormHidden name="clubId" defaultValue={String(clubId)} />
          <StdFormReadOnly name="clubName" label="Club" defaultValue={clubName} />
        </div>
      )}
      {orgType === OrgType.TEAM && (
        <div>
          <StdFormHidden name="groupingId" defaultValue={String(groupingId)} />
          <StdFormReadOnly name="groupingName" label="Grouping" defaultValue={groupingName} />
        </div>
      )}
      <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} required />
      <StdFormInput name="abbrev" label="Abbrev" type="text" defaultValue={abbrev} onChange={setAbbrev} required />

      <StdFormSelect
        name="status"
        label="Status"
        onChange={(value) => setStatus(String(value))}
        options={Object.values(StdStatus).map(role => ({ value: String(role), label: String(role) }))}
        defaultValue={status}
      />

      <StdFormHidden name="orgId" defaultValue={org ? org.id : -1} />
      <StdFormHidden name="type" defaultValue={orgType} />


      <StdFormButtonBar>
        <StdFormCancelBtn backRef="/admin/orgs" />
        <StdFormSubmitBtn disabled={
          !name.trim() ||
          !abbrev.trim()
        } >
          {org ? `Update ${orgType}` : `Create ${orgType}`}
        </StdFormSubmitBtn>
      </StdFormButtonBar>

      <StdFormMetaText label="Last Update At" value={org?.updatedAt ? org.updatedAt.toString() : ""} />
      <StdFormMetaText label="Created At" value={org?.createdAt ? org.createdAt.toString() : ""} />
    </StdForm>
  );
}