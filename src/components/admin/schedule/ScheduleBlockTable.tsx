"use client";

import { StdTabUpdInlBtn, StdTabDelInlBtn, StdTabTh, StdTabTd, StdTabClass, StdTabTitle, StdTabActionTd, StdTabDupInlBtn, StdTabNavBtn, StdTabBtnBar } from "@/components/general/StdTable";
import { Schedule, ScheduleBlock } from "@/data/definitions";
import { deleteScheduleBlockAction, duplicateScheduleBlockAction } from "@/lib/admin/ScheduleBlockActions";
import { useState } from "react";

export default function ScheduleBlockTable({ schedule, blocks }: { schedule: Schedule, blocks: ScheduleBlock[] }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="max-w-4xl mx-auto py-8">
      <StdTabTitle 
        title={`Schedule Blocks for ${schedule.name}`} 
        createPageLink={`/admin/schedules/${schedule.id}/blocks/create`} 
        error={error}
      />
      <table className={StdTabClass}>
        <thead>
          <tr>
            <StdTabTh>Start Date</StdTabTh>
            <StdTabTh>End Date</StdTabTh>
            <StdTabTh>Start Time</StdTabTh>
            <StdTabTh>End Time</StdTabTh>
            <StdTabTh>Status</StdTabTh>
            <StdTabTh>Actions</StdTabTh>
          </tr>
        </thead>
        <tbody>
          {blocks.map(block => (
            <tr key={block.id}>
              <StdTabTd>{block.startDate}</StdTabTd>
              <StdTabTd>{block.endDate}</StdTabTd>
              <StdTabTd>{block.startTime}</StdTabTd>
              <StdTabTd>{block.endTime}</StdTabTd>
              <StdTabTd>{block.status}</StdTabTd>
              <StdTabActionTd>
                <StdTabUpdInlBtn updatePageLink={`/admin/schedules/${schedule.id}/blocks/${block.id}/edit`} />
                <StdTabDupInlBtn 
                  id={block.id} 
                  duplicateAction={duplicateScheduleBlockAction} 
                  primaryId={schedule.id} 
                  onError={(msg: string) => setError(msg)} 
                />
                <StdTabDelInlBtn 
                  id={block.id} 
                  deleteAction={deleteScheduleBlockAction} 
                  primaryId={schedule.id} 
                  onError={(msg: string) => setError(msg)} 
                />
              </StdTabActionTd>
            </tr>
          ))}
        </tbody>
      </table>
      <StdTabBtnBar>
        <StdTabNavBtn ref="/admin/schedules" label="Back" />
      </StdTabBtnBar>
    </main>
  );
}