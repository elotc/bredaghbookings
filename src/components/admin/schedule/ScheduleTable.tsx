"use client";

import { StdTabUpdInlBtn, StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabTitle, StdTabNavInlBtn, StdTabActionTd, StdTabDupInlBtn, StdTabCalInlBtn } from "@/components/general/StdTable";
import { ScheduleList } from "@/data/definitions";
import { deleteScheduleAction, duplicateScheduleAction } from "@/lib/admin/ScheduleActions";
import { useState } from "react";

export default function ScheduleTable({ schedules }: { schedules: ScheduleList[] }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle title="Schedules" createPageLink="/admin/schedules/create" error={error}/>
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Name</StdTabTh>
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <StdTabTd>{schedule.name}</StdTabTd>
              <StdTabActionTd>
                <StdTabNavInlBtn actionName="Blocks" actionPageLink={`/admin/schedules/${schedule.id}/blocks`} />
                <StdTabUpdInlBtn updatePageLink={`/admin/schedules/${schedule.id}/edit`} />
                <StdTabDupInlBtn 
                  id={schedule.id} 
                  duplicateAction={duplicateScheduleAction} 
                  onError={(msg: string) => setError(msg)} 
                />
                <StdTabDelInlBtn 
                  id={schedule.id} 
                  deleteAction={deleteScheduleAction} 
                  onError={(msg: string) => setError(msg)} 
                />
              </StdTabActionTd>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}