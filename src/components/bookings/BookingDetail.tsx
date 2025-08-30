"use client";

import { BaseUser, BookingComment, BookingFacility, BookingRequest } from "@/data/definitions";
import { StdFormCancelBtn, StdForm, StdFormInput, StdFormMetaText, StdFormSelect, StdFormSubmitBtn, StdFormFieldError, StdFormButtonBar, StdFormHidden, StdFormError, StdFormDivider, StdFormClickBtn } from "@/components/general/StdForm";
import { StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabUpdInlBtn, StdTabTitle, StdTabDupInlBtn, StdTabBtnBar, StdTabNavBtn, StdTabActionTd } from "@/components/general/StdTable";

import { useActionState, useContext, useEffect, useState } from "react";
import { UserOrgContext } from "@/components/auth/UserOrgContext";
import SitePageMessage from "@/components/general/SitePageMessage";
import { updateBookingRequestAction } from "@/lib/bookings/BookingRequestActions";


export default function BookingDetail({ bookingRequest, bookingFacilities, bookingComments, requestor }
    : { bookingRequest: BookingRequest, bookingFacilities: BookingFacility[], bookingComments: BookingComment[], requestor: BaseUser }) {

    const { thisUserOrg, userOrgs } = useContext(UserOrgContext);
    if (!thisUserOrg) return (
        <SitePageMessage headline="Oops - your credentials are missing" message="Please log in again." label="Login" link="/home" isError={true} />
    );

    const [formState, formAction] = useActionState(updateBookingRequestAction, { error: "" });

    const [bookingStatus, setBookingStatus] = useState("");
    const [originalStatus, setOriginalStatus] = useState("");
    useEffect(() => {
        setBookingStatus(bookingRequest.status);
        setOriginalStatus(bookingRequest.status);
    }, [bookingRequest]);

    const [requestorText, setRequestorText] = useState<string>("");
    useEffect(() => {
        setRequestorText((requestor?.name ? requestor.name : "") + ' (' + (requestor?.email ? requestor.email : "") + ')');
    }, [requestor]);

    function approveRequest(newStatus: string) {
        setBookingStatus(newStatus);
    }

    const [isRoleAuthorised, setIsRoleAuthorised] = useState(false);
    const [isOrgAuthorised, setIsOrgAuthorised] = useState(false);
    useEffect(() => {
        setIsRoleAuthorised(thisUserOrg?.role === "Admin" || thisUserOrg?.role === "Editor");
        setIsOrgAuthorised(userOrgs?.some(org => (org.clubId === bookingRequest.clubId || org.groupingId === bookingRequest.groupingId)) || false);
    }, [thisUserOrg, userOrgs, bookingRequest.teamId]);

    const [comment, setComment] = useState<string>("");

    return (
        <StdForm title={"Booking Request"} action={formAction}>
            {formState.error && (<StdFormError error={formState.error} />)}
            <StdFormHidden name="bookingId" defaultValue={bookingRequest.bookingId} />
            <StdFormHidden name="bookingDescription" defaultValue={bookingRequest.description} />
            <StdFormHidden name="teamId" defaultValue={bookingRequest.teamId} />
            <StdFormHidden name="requestorId" defaultValue={bookingRequest.requestorId} />
            <StdFormHidden name="requestorEmail" defaultValue={bookingRequest.requestorEmail ? bookingRequest.requestorEmail : 'unknown'} />
            <StdFormHidden name="approverId" defaultValue={bookingRequest.approverId ? bookingRequest.approverId : "unset"} />
            <StdFormHidden name="approverEmail" defaultValue={bookingRequest.approverEmail ? bookingRequest.approverEmail : 'unknown'} />
            <StdFormHidden name="updaterId" defaultValue={thisUserOrg.userId} />
            <StdFormHidden name="updaterEmail" defaultValue={thisUserOrg.userEmail ? thisUserOrg.userEmail : 'unknown'} />
            <StdFormHidden name="originalStatus" defaultValue={originalStatus} />

            <StdFormInput name="description" label="Description" type="text" defaultValue={bookingRequest.description} readOnly />
            <StdFormInput name="requestorDetails" label="Requestor" type="text" defaultValue={requestorText} readOnly />

            { bookingRequest.approverId && (
                <StdFormInput name="approverDetails" label="Approver" type="text" defaultValue={bookingRequest.approverEmail ? bookingRequest.approverEmail : 'unknown'} readOnly />
            )}
            <StdFormInput name="status" label="Status" type="text" defaultValue={bookingStatus} readOnly />

            <StdFormDivider text="Facilities Requested" />
            <table className="w-full">
                <thead>
                    <tr>
                        <StdTabTh>Facility</StdTabTh>
                        <StdTabTh>Date</StdTabTh>
                        <StdTabTh>Start Time</StdTabTh>
                        <StdTabTh>End Time</StdTabTh>
                    </tr>
                </thead>
                <tbody>
                    {bookingFacilities.map(facility => (
                        <tr key={facility.id}>
                            <StdTabTd>{facility.facilityName}</StdTabTd>
                            <StdTabTd>{facility.date}</StdTabTd>
                            <StdTabTd>{facility.startTime}</StdTabTd>
                            <StdTabTd>{facility.endTime}</StdTabTd>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                bookingComments.length !== 0 && (
                    <>
                        <StdFormDivider text="Comments" />
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <StdTabTh>Comment Date</StdTabTh>
                                    <StdTabTh>User</StdTabTh>
                                    <StdTabTh>Comment</StdTabTh>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingComments.map(comment => (
                                    <tr key={comment.id}>
                                        <StdTabTd>{comment.updatedAt.toString()}</StdTabTd>
                                        <StdTabTd>{comment.userName}</StdTabTd>
                                        <StdTabTd>{comment.comment}</StdTabTd>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
            }

            <StdFormDivider text="Update Booking" />
            <StdFormInput name="comment" label="Add Comment" type="text" defaultValue={comment} onChange={setComment} required={false}/>

            <StdFormButtonBar>
                {
                    isRoleAuthorised && isOrgAuthorised &&
                    <>
                        <StdFormClickBtn onClick={() => approveRequest("Approved")} label="Approve" disabled={bookingStatus !== "Requested"} />
                        <StdFormClickBtn onClick={() => approveRequest("Rejected")} label="Reject" disabled={bookingStatus !== "Requested" || comment.length === 0} />
                    </>
                }
                {
                    thisUserOrg?.userId === bookingRequest.requestorId &&
                    <>
                        <StdFormClickBtn onClick={() => approveRequest("Withdrawn")} label="Withdraw" />
                    </>
                }
            </StdFormButtonBar>

            <StdFormButtonBar>
                <StdFormCancelBtn backRef={`/bookings/${thisUserOrg?.userId}`} />
                <StdFormSubmitBtn disabled={false}> {"Submit"} </StdFormSubmitBtn>
            </StdFormButtonBar>

            <StdFormMetaText label="Last Update At" value={bookingRequest?.updatedAt ? bookingRequest.updatedAt.toString() : ""} />
            <StdFormMetaText label="Created At" value={bookingRequest?.createdAt ? bookingRequest.createdAt.toString() : ""} />

        </StdForm>
    );
}
