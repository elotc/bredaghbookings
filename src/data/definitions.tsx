import { location, facility, org, schedule, booking_request } from "@/data/schema";

// ENUMS


export enum StdStatus {
    ACTIVE = "Active",
    PENDING = "Pending",
    ARCHIVED = "Archived",
};

export enum EmailType {
    INVITE = "Invite",
    BOOKING_SUBMITTED = "BookingSubmitted",
    BOOKING_UPDATED = "BookingUpdated",
}



// ====== TYPES

export type CountsType = {
    id: number | string;
    count: number;
};

// == LOCATIONS AND FACILITIES ==
export type Location = typeof location.$inferSelect;

export type LocationList = {
    id: number;
    name: string;
    abbrev: string;
};

export type Facility = typeof facility.$inferSelect;

export type FacilityList = {
    id: number;
    name: string;
    abbrev: string;
    slotDurationMins: number;
    concurrentUseNumber: number;
    locationId: number;
    locationName: string | null;
    scheduleId: number;
    scheduleName: string | null;
};



// == ORGANISATIONS ==
export enum OrgType {
    CLUB = "Club",
    GROUPING = "Grouping",
    TEAM = "Team",
};

export type Org = typeof org.$inferSelect;

export type OrgList = {
    id: number;
    name: string;
    abbrev: string;
    type: string;
    status: string;
    clubId: number | null;
    groupingId: number | null;
}

export type Club = {
    id: number;
    name: string;
    abbrev: string;
};

export type Code = {
    id: string;
    name: string;
    abbrev: string;
};

export type Team = {
    id: string;
    name: string;
};


// == SCHEDULES ==
export enum ScheduleBlockStatus {
    CLOSED = "Closed",
    AVAILABLE = "Available",
};

export type Schedule = typeof schedule.$inferSelect;

export type ScheduleList = {
    id: number;
    name: string;
};

export type ScheduleBlock = {
    id: number;
    scheduleId: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    status: ScheduleBlockStatus | string;
    updatedAt?: Date;
    createdAt?: Date;
};

export type ScheduleFacilityBlock = {
    facilityId: number;
    scheduleId: number;
    blockId: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    status: ScheduleBlockStatus | string;
};



// == SLOTS ==
export enum SlotStatus {
    BOOKED = "booked",
    REQUESTED = "requested",
    ENQUIRE = "enquire",
    CLOSED = "closed",
    AVAILABLE = "available",
};


export type SlotPart = {
    status: SlotStatus;
    team: { id: string; name: string };
    displayTeamName: string;
};

export type TimeSlot = {
    id: number;
    displayTime: string;
    part1: SlotPart;
    part2: SlotPart;
};


export type Slot = {
    slotId: number;
    status: SlotStatus | string;
    teamId: number;
    label: string;
};

export type DailySlots = {
    date: Date;
    slots: Slot[];
};


// == USERS ==
export enum RoleType {
    ADMIN = "Admin",
    EDITOR = "Editor",
    VIEWER = "Viewer",
};


export type BaseUser = {
    id: string;
    name: string | null;
    email: string | null;
    status?: StdStatus | string | null;
};

export type UserRole = {
    userId: string;
    name: string | null;
    email: string | null;
    role: string;
    orgId: number;
    orgName: string;
    orgType: string;
}

export type UserOrgRoleType = {
    userId: string;
    orgId: number;
    status: StdStatus;
    role: RoleType;
};

export type OrgUsersType = {
    orgId: number;
    userId: string;
    userName: string | null;
    status: StdStatus | string;
    role: RoleType | string;
};

export type ClubGroupingTeam = {
    clubId: number;
    clubName: string;
    groupingId: number;
    groupingName: string;
    teamId: number;
    teamName: string;
};

export type FlattendOrgsType = {
    orgId: number;
    orgType: OrgType | string;
    clubName: string | null;
    groupingName: string | null;
    orgName: string;
    fullName: string;
};

export type UserOrgsType = {
    userId: string;
    status: StdStatus;
    orgId: number;
    role: RoleType;
    orgType: OrgType;
    clubName: string | null;
    groupingName: string | null;
    orgName: string;
    fullName: string;
};

export type UserOrgRole = {
    userId: string;
    userName: string | null;
    userEmail: string | null;
    orgId: number;
    status: StdStatus | string;
    role: RoleType | string;
    orgType: OrgType | string;
    clubName: string | null;
    clubId: number | null;
    groupingName: string | null;
    groupingId: number | null;
    orgName: string;
    fullName: string;
};


// === BOOKINGS ===
export enum BookingType {
    TRAINING = "Training",
    MATCH = "Match",
    EVENT = "Event",
    OTHER = "Other",
};

export enum BookingStatus {
    REQUESTED = "Requested",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    WITHDRAWN = "Withdrawn",
};

export enum BookingFacilityStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
};

export type BookingRequest = {
    bookingId: number;
    teamId: number;
    groupingId: number;
    clubId: number;

    requestorId: string;
    requestorName: string | null;
    requestorEmail: string | null;

    approverId: string | null;
    approverName: string | null;
    approverEmail: string | null;

    status: BookingStatus | string;
    eventType: BookingType | string;
    
    description: string;

    requestedNumSlots: number;

    createdAt: Date;
    updatedAt: Date;
};

export type FacilityBooking = {
    bookingFacilityId: number;
    bookingRequestId: number;
    bookingRequestDescription: string;
    teamId: number;
    facilityId: number;
    date: string;
    startTime: string;
    endTime: string;
    status: SlotStatus | string;
};

export type BookingFacility = {
    id: number;
    bookingId: number;
    facilityId: number;
    facilityName: string;

    date: string;
    startTime: string;
    endTime: string;

    status: BookingFacilityStatus | string;
};

export type BookingComment = {
    id: number;
    comment: string;
    userId: string;
    userName: string | null;
    bookingId: number;
    updatedAt: Date;
    createdAt: Date;
};

