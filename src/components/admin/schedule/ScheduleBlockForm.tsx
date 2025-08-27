"use client";

import { useActionState, useState } from "react";
import { StdForm, StdFormInput, StdFormSelect, StdFormCancelBtn, StdFormSubmitBtn, StdFormMetaText, StdFormHidden, StdFormButtonBar, StdFormError } from "@/components/general/StdForm";
import { scheduleBlockAction } from "@/lib/admin/ScheduleBlockActions";
import { Schedule, ScheduleBlock, ScheduleBlockStatus } from "@/data/definitions";

export default function ScheduleBlockForm({scheduleId, scheduleBlock}: {scheduleId: number; scheduleBlock?: ScheduleBlock;}) {
  const [startDate, setStartDate] = useState(scheduleBlock?.startDate || "");
  const [endDate, setEndDate] = useState(scheduleBlock?.endDate || "");
  const [startTime, setStartTime] = useState(scheduleBlock?.startTime || "");
  const [endTime, setEndTime] = useState(scheduleBlock?.endTime || "");
  const [status, setStatus] = useState<string | number>(scheduleBlock?.status || "Closed");

  const [formState, formAction] = useActionState(scheduleBlockAction, { error: "" });

  return (
    <StdForm title={scheduleBlock ? "Update Block" : "Create Block"} action={formAction}>
      {formState.error && (<StdFormError error={formState.error} />)}
      <StdFormHidden name="scheduleBlockId" defaultValue={scheduleBlock ? scheduleBlock.id : -1} />

      <StdFormHidden name="schedule_id" defaultValue={String(scheduleId)} />
      <StdFormInput name="start_date" label="Start Date" type="date" defaultValue={startDate} onChange={setStartDate} />
      <StdFormInput name="end_date" label="End Date" type="date" defaultValue={endDate} onChange={setEndDate} />
      <StdFormInput name="start_time" label="Start Time" type="time" defaultValue={startTime} onChange={setStartTime} />
      <StdFormInput name="end_time" label="End Time" type="time" defaultValue={endTime} onChange={setEndTime} />
      <StdFormSelect name="status" label="Status" defaultValue={status} onChange={setStatus}
        options={Object.values(ScheduleBlockStatus).map(stat => ({ value: stat, label: stat }))}
      />
      <StdFormButtonBar>
        <StdFormCancelBtn backRef={`/admin/schedules/${scheduleId}/blocks`} />
        <StdFormSubmitBtn disabled={!startDate || !endDate || !startTime || !endTime || !status}>
          {scheduleBlock ? "Update Block" : "Create Block"}
        </StdFormSubmitBtn>
      </StdFormButtonBar>
      <StdFormMetaText label="Last Update At" value={scheduleBlock?.updatedAt ? scheduleBlock.updatedAt.toString() : ""} />
      <StdFormMetaText label="Created At" value={scheduleBlock?.createdAt ? scheduleBlock.createdAt.toString() : ""} />
    </StdForm>
  );
}
