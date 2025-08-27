"use client";

import { StdFormCancelBtn, StdForm, StdFormInput, StdFormMetaText, StdFormSelect, StdFormSubmitBtn, StdFormFieldError, StdFormButtonBar, StdFormHidden, StdFormError } from "@/components/general/StdForm";
import { Location, ScheduleList, FacilityList } from "@/data/definitions";
import { facilityAction } from "@/lib/admin/FacilityActions";
import { useActionState, useState } from "react";

export default function FacilityForm({ location, facilities, facility, schedules }: 
  { location: Location, facilities: FacilityList[], facility?: any, schedules: ScheduleList[] }) {
  const [name, setName] = useState(facility?.name || "");
  const [scheduleId, setScheduleId] = useState(facility?.scheduleId || "");
  const [abbrev, setAbbrev] = useState(facility?.abbrev || "");
  const [slotDuration, setSlotDuration] = useState(facility?.slotDurationMins || 30);
  const [concurrentUse, setConcurrentUse] = useState(facility?.concurrentUseNumber || 1);

  const [formState, formAction] = useActionState(facilityAction, { error: "" });

  return (
    <StdForm title={facility ? "Update Facility" : "Create Facility"} action={formAction}>
      {formState.error && (<StdFormError error={formState.error} />)}
      <StdFormHidden name="locationId" defaultValue={location.id} />
      <StdFormHidden name="facilityId" defaultValue={facility ? String(facility.id) : "-1"} />

      <StdFormInput name="locationName" label="Location Name" type="text" defaultValue={location.name} readOnly />

      <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} required >
        {!facility && facilities?.some(f => f.name === name) && (
          <StdFormFieldError error={"This facility name already exists at this location."} />
        )}
      </StdFormInput>

      <StdFormInput 
        name="abbrev" 
        label="Abbrev" 
        type="text" 
        defaultValue={abbrev} 
        onChange={setAbbrev} 
        required />

      <StdFormSelect 
        name="scheduleId" 
        label="Schedule" 
        defaultValue={String(scheduleId)} 
        onChange={setScheduleId} 
        required
        options={[
          { value: "", label: "Select a schedule" },
          ...schedules.map(schedule => ({ value: String(schedule.id), label: schedule.name }))
        ]}
      />
      
      <StdFormInput 
        name="slotDurationMins" 
        label="Slot Duration (mins)" 
        type="number" 
        defaultValue={slotDuration} 
        onChange={setSlotDuration} />
      <StdFormInput 
        name="concurrentUseNumber" 
        label="Concurrent Use" 
        type="number" 
        defaultValue={concurrentUse} 
        onChange={setConcurrentUse} 
        required />
      <StdFormButtonBar>
        <StdFormCancelBtn backRef={`/admin/locations/${location.id}/facilities`} />
        <StdFormSubmitBtn disabled={
          !name.trim() ||
          !abbrev.trim() ||
          !slotDuration ||
          !concurrentUse ||
          !scheduleId
        } >
          {facility ? "Update Facility" : "Create Facility"}
        </StdFormSubmitBtn>
      </StdFormButtonBar>

      <StdFormMetaText label="Last Update At" value={facility?.updatedAt ? facility.updatedAt.toString() : ""} />
      <StdFormMetaText label="Created At" value={facility?.createdAt ? facility.createdAt.toString() : ""} />

    </StdForm>
  );
}