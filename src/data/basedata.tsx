"use server";
import { createOrg, createSchedule, createScheduleBlock, createUser, createUserOrgRole, getOrgsByName, getUserByEmail, getOrgRoleByUserIdOrgId, getScheduleByName, getLocationByName, createLocation, createFacility } from '@/data/dataAccessLayer';

export async function loadBaseData() {
    let retMsg = "Loading base data... ";
    let orgId = -1;
    await getOrgsByName("Global").then(async (res) => {
        if (!res || res.length === 0) {
            const org = await createOrg({ name: "Global", abbrev: "ALL", type: "Club", status: "Active", clubId: null, groupingId: null });
            orgId = org[0].id;
            retMsg += "createOrg:Global,";
        } else {
            orgId = res[0].id;
            retMsg += "getOrg:Global,";
        }
    });
    let userId = "";
    await getUserByEmail("bren.duffy@gmail.com").then(async (res) => {
        if (!res ) {
            const user = await createUser("Brendan Duffy", "bren.duffy@gmail.com");
            userId = user[0].id;
            retMsg += "createUser:bren.duffy@gmail.com,";
        } else {
            userId = res.id;
            retMsg += "getUser:bren.duffy@gmail.com,";
        }
    });
    await getOrgRoleByUserIdOrgId(userId, orgId).then(async (res) => {
        if (!res ) {
            await createUserOrgRole({ userId: userId, orgId: orgId, role: "Admin" });
            retMsg += "createUserOrgRole:Admin,";
        } else {
            retMsg += "getUserOrgRole:Admin,";
        }
    });
    return retMsg;
}

export async function loadTestData() {
    let retMsg = "Loading test data... ";

    try {
        // Check if base org "Bredagh" exists
        const org = await getOrgsByName("Bredagh");
        if (!org || org.length === 0) {
            const clubDets = await createOrg({ name: "Bredagh", abbrev: "BGAC", type: "Club", status: "Active", clubId: null, groupingId: null });
            const footballGroup = await createOrg({ name: "Football", abbrev: "F", type: "Grouping", status: "Active", clubId: clubDets[0].id, groupingId: null });
            await createOrg({ name: "U12", abbrev: "U12", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            await createOrg({ name: "U14", abbrev: "U14", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            await createOrg({ name: "U16", abbrev: "U16", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            await createOrg({ name: "U18", abbrev: "U18", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            await createOrg({ name: "Senior", abbrev: "S", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            await createOrg({ name: "U8", abbrev: "U8", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            await createOrg({ name: "U10", abbrev: "U10", type: "Team", status: "Active", clubId: clubDets[0].id, groupingId: footballGroup[0].id });
            retMsg += "createOrg-Bredagh,";
        } else {
            retMsg += "getOrg-Bredagh,";
        }

        let schedId = -1;
        const sched = await getScheduleByName("Cherryvale");
        if (!sched) {
            const newSched = await createSchedule({ name: "Cherryvale" });

            await createScheduleBlock({ scheduleId: newSched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "00:00", endTime: "07:59", status: "Closed" });
            await createScheduleBlock({ scheduleId: newSched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "22:00", endTime: "23:59", status: "Closed" });
            await createScheduleBlock({ scheduleId: newSched[0].id, startDate: "2025-01-01", endDate: "2025-12-31", startTime: "18:00", endTime: "21:59", status: "Available" });
            schedId = newSched[0].id;
            retMsg += "createSchedule-Cherryvale,";
        } else {
            schedId = sched.id;
            retMsg += "getSchedule-Cherryvale,";
        }

        const location = await getLocationByName("Cherryvale");
        if (!location) {
            const location = await createLocation({ name: "Cherryvale", abbrev: "CV", });
            
            await createFacility({ name: "3G Pitch", abbrev: "3G", locationId: location[0].id, scheduleId: schedId });
            await createFacility({ name: "Cherryvale 1", abbrev: "cv1", locationId: location[0].id, scheduleId: schedId });
            await createFacility({ name: "Cherryvale 2", abbrev: "cv2", locationId: location[0].id, scheduleId: schedId });
            await createFacility({ name: "Cherryvale 3", abbrev: "cv3", locationId: location[0].id, scheduleId: schedId });
            retMsg += "createLocation-Cherryvale,";
        } else {
            retMsg += "getLocation-Cherryvale,";
        }

    } catch (error) {
        console.error("Error loading test data:", error);
        throw error;
    }
    return retMsg;
}
