"use client";
import { useState, useActionState } from "react";
import { scheduleAction } from "@/lib/admin/ScheduleActions";
import { StdForm, StdFormInput, StdFormSelect, StdFormCancelBtn, StdFormSubmitBtn, StdFormError, StdFormHidden, StdFormFieldError } from "@/components/general/StdForm";
import { ScheduleList } from "@/data/definitions";

export default function ScheduleForm({ schedules, schedule }: { schedules: ScheduleList[], schedule?: ScheduleList }) {
    const [name, setName] = useState(schedule?.name || "");

    const [formState, formAction] = useActionState(scheduleAction, { error: "" });

    return (
        <StdForm title={!schedule ? "Create Schedule" : "Update Schedule"} action={formAction}>
            {formState.error && (<StdFormError error={formState.error} />)}
            <StdFormHidden name="scheduleId" defaultValue={schedule ? schedule.id : -1} />
            <StdFormInput name="name" label="Name" type="text" defaultValue={name} onChange={setName} >
                {!schedule && schedules?.some(loc => loc.name === name) && (
                    <StdFormFieldError error={"This schedule name already exists."} />
                )}
            </StdFormInput>
            <div className="flex justify-between items-center mb-2">
                <StdFormCancelBtn backRef="/admin/schedules" label="Back" />
                <StdFormSubmitBtn disabled={!name}>OK</StdFormSubmitBtn>
            </div>
        </StdForm>
    );
}