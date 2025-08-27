"use server";

import { db } from '@/data/dbConn';
import { getOrgById, createOrg, createSchedule, createScheduleBlock, createUser, createUserOrgRole } from '@/data/dataAccessLayer';
import { org } from './schema';

export async function loadBaseData() {
    const orgs: typeof org.$inferInsert[] = [
        { id: 1, name: "Global", abbrev: "ALL", type: "Club", status: "Active", clubId: null, groupingId: null },
    ];

    orgs.forEach(async o => {
        if (typeof o.id === "number") {
            const thisOrg = await getOrgById(o.id);
            if (thisOrg) {
                console.log(`Org with id ${o.id} already exists, skipping insert.`);
            } else {
                console.log(`Inserting base org with id ${o.id}`);
                await db.insert(org).values(o).returning();
            }
        } else {
            console.warn(`Org id is undefined, skipping.`);
        }
    });
}

export async function loadTestData() {

    try {

        const clubDets = await createOrg({ name: "Bredagh", abbrev: "BGAC", type: "Club", status: "Active", clubId: null, groupingId: null });
        const footballGroup = await createOrg({ name: "Football", abbrev: "F", type: "Grouping", status: "Active", clubId: clubDets[0].id, groupingId: null });
        await createOrg({ name: "U12", abbrev: "U12", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
        await createOrg({ name: "U14", abbrev: "U14", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
        await createOrg({ name: "U16", abbrev: "U16", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
        await createOrg({ name: "U18", abbrev: "U18", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
        await createOrg({ name: "Senior", abbrev: "S", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
        await createOrg({ name: "U8", abbrev: "U8", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
        await createOrg({ name: "U10", abbrev: "U10", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });

        const sched = await createSchedule({ name: "Cherryvale" });

        await createScheduleBlock({ scheduleId: sched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "00:00", endTime: "07:59", status: "Closed" });
        await createScheduleBlock({ scheduleId: sched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "22:00", endTime: "23:59", status: "Closed" });
        await createScheduleBlock({ scheduleId: sched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "08:00", endTime: "17:59", status: "Available" });
        await createScheduleBlock({ scheduleId: sched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "21:00", endTime: "21:59", status: "Available" });

        const user1 = await createUser("Joe Admin", "admin@example.com" );
        await createUserOrgRole({ userId: user1[0].id, orgId: clubDets[0].id, role: "Admin" });
        const user2 = await createUser("Joe Editor", "editor@example.com" );
        await createUserOrgRole({ userId: user2[0].id, orgId: clubDets[0].id, role: "Editor" });
        const user3 = await createUser("Joe Viewer", "viewer@example.com" );
        await createUserOrgRole({ userId: user3[0].id, orgId: clubDets[0].id, role: "Viewer" });

    } catch (error) {
        console.error("Error loading test data:", error);
        throw error;
    }
}
