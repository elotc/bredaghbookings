"use client";

import { StdFormCancelBtn, StdForm, StdFormInput, StdFormMetaText, StdFormSelect, StdFormSubmitBtn, StdFormFieldError, StdFormHidden, StdFormError, StdFormButtonBar, StdFormReadOnly } from "@/components/general/StdForm";
import { bookingRequestAction } from "@/lib/bookings/BookingRequestActions";
import { BookingRequest, BookingStatus, BookingType, FlattendOrgsType, Org, User } from "@/data/definitions";
import { useActionState, useState } from "react";

export default function BookingRequestForm({ bookingRequest, allOrgs, requestor }: { bookingRequest?: BookingRequest, allOrgs: FlattendOrgsType[], requestor?: User   }) {

    const [orgs, setOrgs] = useState(allOrgs);
    const [teamId, setTeamId] = useState(bookingRequest?.teamId || "");

    const [requestorId, setRequestorId] = useState(bookingRequest?.requestorId || "");
    const [approverId, setApproverId] = useState(bookingRequest?.approverId || "");

    const [description, setDescription] = useState(bookingRequest?.description || "");
    const [abbrev, setAbbrev] = useState(bookingRequest?.bookingAbbrev || "");
    const [status, setStatus] = useState(bookingRequest?.status || "");
    const [eventType, setEventType] = useState(bookingRequest?.eventType || "Training");

    const [formState, formAction] = useActionState(bookingRequestAction, { error: "" });

    const handleTeamIdChange = (value: string) => {
        setTeamId(value);
        setAbbrev(orgs.find(org => org.orgId === Number(value))?.fullName || "");
    };

    return (

        <StdForm title={bookingRequest ? "Update Booking Request" : "Create Booking Request"} action={formAction}>
            {formState.error && (<StdFormError error={formState.error} />)}
            <StdFormHidden name="bookingId" defaultValue={bookingRequest ? bookingRequest.bookingId : -1} />

            <StdFormSelect
                name="teamId"
                label="Team"
                defaultValue={String(teamId)}
                onChange={handleTeamIdChange}
                required
                options={[
                    { value: "", label: "Select a team" },
                    ...orgs.map(org => ({ value: String(org.orgId), label: org.fullName }))
                ]}
            />

            <StdFormSelect name="eventType" label="Event Type" defaultValue={eventType} onChange={setEventType}
                options={Object.values(BookingType).map(stat => ({ value: stat, label: stat }))}
            />

            <StdFormHidden name="bookingAbbrev" defaultValue={abbrev} />

            <StdFormInput name="description" label="Description (optional)" type="text" defaultValue={description} onChange={setDescription} required={false} />

            {bookingRequest && <StdFormReadOnly name="status" label="Status" defaultValue={status} />}



            <StdFormButtonBar>
                <StdFormCancelBtn backRef="/bookings" />
                <StdFormSubmitBtn disabled={
                    !eventType.trim() ||
                    !abbrev.trim()
                } >
                    {bookingRequest ? "Update Booking Request" : "Create Booking Request"}
                </StdFormSubmitBtn>
            </StdFormButtonBar>

            <StdFormMetaText label="Last Update At" value={bookingRequest?.updatedAt ? bookingRequest.updatedAt.toString() : ""} />
            <StdFormMetaText label="Created At" value={bookingRequest?.createdAt ? bookingRequest.createdAt.toString() : ""} />

        </StdForm>
    );
}
