"use client";

import { StdFormCancelBtn, StdForm, StdFormInput, StdFormMetaText, StdFormSelect, StdFormSubmitBtn, StdFormFieldError, StdFormHidden, StdFormError, StdFormButtonBar } from "@/components/general/StdForm";
import { locationAction } from "@/lib/admin/LocationActions";
import { Location, LocationList, OrgList } from "@/data/definitions";
import { useActionState, useState } from "react";

export default function LocationForm({ locations, location }: { locations: LocationList[], location?: Location }) {
    const [name, setName] = useState(location?.name || "");
    const [abbrev, setAbbrev] = useState(location?.abbrev || "");

    const [formState, formAction] = useActionState(locationAction, { error: "" });

    return (
        <StdForm title={location ? "Update Location" : "Create Location"} action={formAction}>
            {formState.error && (<StdFormError error={formState.error} />)}
            <StdFormHidden name="locationId" defaultValue={location ? location.id : -1} />

            <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} required>
                {!location && locations?.some(loc => loc.name === name) && (
                    <StdFormFieldError error={"This location name already exists."} />
                )}
            </StdFormInput>
            <StdFormInput name="abbrev" label="Abbrev" type="text" defaultValue={abbrev} onChange={setAbbrev} required />

            <StdFormButtonBar>
                <StdFormCancelBtn backRef="/admin/locations" />
                <StdFormSubmitBtn disabled={
                    !name.trim() ||
                    !abbrev.trim() ||
                    locations?.some(loc => loc.name === name && loc.id !== location?.id)
                } >
                    {location ? "Update Location" : "Create Location"}
                </StdFormSubmitBtn>
            </StdFormButtonBar>

            <StdFormMetaText label="Last Update At" value={location?.updatedAt ? location.updatedAt.toString() : ""} />
            <StdFormMetaText label="Created At" value={location?.createdAt ? location.createdAt.toString() : ""} />

        </StdForm>
    );
}

