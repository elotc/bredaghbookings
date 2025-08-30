"use client";

import { useActionState, useContext, useEffect, useState } from "react";
import { BookingContext } from "@/components/bookings/BookingContext";
import SectionHeader from "@/components/bookings/SectionHeader";
import { FacilityList, UserRole } from "@/data/definitions";
import { StdForm, StdFormButtonBar, StdFormCancelBtn, StdFormClickBtn, StdFormDivider, StdFormError, StdFormHidden, StdFormInput, StdFormSelect, StdFormSubmitBtn } from "../general/StdForm";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import { redirect } from "next/navigation";
import { bookingConfirmAction } from "@/lib/bookings/BookingRequestActions";

export function BookingConfirmSection({ facilities, authorisers, hideConfirmPage, togglePages }:
    {
        facilities: FacilityList[];
        authorisers: UserRole[];
        hideConfirmPage: boolean;
        togglePages: () => void;
    }) {

    console.log("BookingConfirm component initialized with facilities:", facilities);
    const { slots, teamId, groupingId, clubId, requestorId, fullTeamName } = useContext(BookingContext);
    const { thisUserOrg } = useContext(UserOrgContext);

    if (!thisUserOrg) { redirect("/auth/sign-in"); }
    if (!teamId || !requestorId) {
        console.error("No teamId or requestorId in BookingSelect, redirecting to criteria.");
        redirect("/bookings/" + thisUserOrg?.userId);
    }

    const [eventType, setEventType] = useState<string>("Training");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        setDescription(fullTeamName + " - " + eventType);
    }, [setDescription, eventType, fullTeamName]);

    const [formState, formAction] = useActionState(bookingConfirmAction, { error: "" });

    return (
        <div>
            <div className={`${hideConfirmPage ? "hidden" : ""}`}>
                <SectionHeader thisPageNumber={3} />
                <StdForm title="Confirm Your Booking Selections" action={formAction}>
                    {formState.error && (<StdFormError error={formState.error} />)}

                    <StdFormDivider text="Selected Slots" />
                    {slots.map((slot, idx) => (
                        <p key={"display-" + idx} className="px-4 m-1 bg-blue-500 text-white dark:bg-blue-700 dark:text-blue-200">
                            {facilities.find(facility => facility.id === slot.facilityId)?.name} {" on "}
                            {new Date(slot.slotId).toLocaleDateString([], { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}{" at "}
                            {new Date(slot.slotId).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    ))}

                    {slots.map((slot, idx) => (
                        <StdFormHidden key={idx} name="slots" defaultValue={slot.facilityId + '|' + slot.slotId} />
                    ))}
                    <StdFormHidden key='teamId' name="teamId" defaultValue={teamId} />
                    <StdFormHidden key='groupingId' name="groupingId" defaultValue={groupingId} />
                    <StdFormHidden key='clubId' name="clubId" defaultValue={clubId} />
                    <StdFormHidden key='requestorId' name="requestorId" defaultValue={requestorId} />

                    <StdFormDivider text="Booking Details" />
                    <StdFormSelect
                        name="eventType"
                        label="Event Type"
                        defaultValue={eventType}
                        onChange={value => setEventType(String(value))}
                        options={[
                            { value: 'Training', label: 'Training' },
                            { value: 'Match', label: 'Match' },
                            { value: 'Event', label: 'Event' },
                            { value: 'Other', label: 'Other' },
                        ]}
                    />
                    <StdFormInput name="description" type="text" label="Description" defaultValue={description} onChange={setDescription} />
                    <StdFormInput name="addNotes" type="text" label="Additional Notes" required={false} />

                    <StdFormDivider text="The following Authorisers will be notified:" />
                    <ul>
                        {authorisers.map(authoriser => (
                            <li key={authoriser.userId + '|' + authoriser.orgId}>{authoriser.name} ({authoriser.email} [{authoriser.role}:{authoriser.orgName}])</li>
                        ))}
                    </ul>
                    <StdFormButtonBar>
                        <StdFormClickBtn onClick={togglePages} label={"Back"} />
                        <StdFormSubmitBtn disabled={slots.length === 0} > {"Next"} </StdFormSubmitBtn>
                    </StdFormButtonBar>
                </StdForm>

            </div>
        </div>
    );
}
