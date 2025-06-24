export enum BookingType {
    TRAINING = "Training",
    MATCH = "Match",
    EVENT = "Event",
    OTHER = "Other",
};

export enum SlotStatus {
    BOOKED = "booked",
    REQUESTED = "requested",
    ENQUIRE = "enquire",
    CLOSED = "closed",
    FREE = "free",
};

export type SlotPart = {
    status: SlotStatus;
    team: { id: string; name: string };
    displayTeamName: string;
};

export type Location = {
    id: string;
    name: string;
};

export type Facility = {
    id: string;
    name: string;
};

export type Club = {
    id: string;
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

export type TimeSlot = {
    id: number;
    displayTime: string;
    part1: SlotPart;
    part2: SlotPart;
};

