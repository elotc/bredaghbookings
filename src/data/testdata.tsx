import { SlotStatus } from "@/data/definitions";

export const locations = [
    { id: '1', name: 'Cherryvale' },
    { id: '2', name: 'Aquinas' },
    { id: '3', name: 'Wellington' },
];

export const facilities = [
    { id: '1', name: 'CV1' },
    { id: '2', name: 'CV2' },
    { id: '3', name: '3G' },
];

export const clubs = [
    { id: '1', name: 'Bredagh GAC', abbrev: 'BGAC' },
    { id: '2', name: 'St Malachys GAC', abbrev: 'MALA' },
];

export const codes = [
    { id: '1', name: 'Hurling', abbrev: 'HURL' },
    { id: '2', name: 'Football', abbrev: 'FOOT' },
    { id: '3', name: 'Camogie', abbrev: 'CAMO' },
    { id: '4', name: 'Ladies Football', abbrev: 'LGFA' },
];

export const teams = [
    { id: '1', name: 'U14H' },
    { id: '2', name: 'Senior' },
    { id: '3', name: 'Minors' },
];

export const timeSlots = [
    { id: 1, displayTime: "17:00", part1: { status: SlotStatus.CLOSED, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.CLOSED, team: teams[1], displayTeamName: "" } },
    { id: 2, displayTime: "17:30", part1: { status: SlotStatus.BOOKED, team: teams[0], displayTeamName: "BGAC/HURL/U14" }, part2: { status: SlotStatus.BOOKED, team: teams[1], displayTeamName: "BGAC/HURL/U14" } },
    { id: 3, displayTime: "18:00", part1: { status: SlotStatus.BOOKED, team: teams[0], displayTeamName: "BGAC/HURL/U14" }, part2: { status: SlotStatus.BOOKED, team: teams[1], displayTeamName: "BGAC/HURL/U14" } },
    { id: 4, displayTime: "18:30", part1: { status: SlotStatus.AVAILABLE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.AVAILABLE, team: teams[1], displayTeamName: "" } },
    { id: 5, displayTime: "19:00", part1: { status: SlotStatus.AVAILABLE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.AVAILABLE, team: teams[1], displayTeamName: "" } },
    { id: 6, displayTime: "19:30", part1: { status: SlotStatus.REQUESTED, team: teams[0], displayTeamName: "BGAC/LGFA/SEN" }, part2: { status: SlotStatus.REQUESTED, team: teams[1], displayTeamName: "MALA/FOOT/SEN" } },
    { id: 7, displayTime: "20:00", part1: { status: SlotStatus.AVAILABLE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.AVAILABLE, team: teams[1], displayTeamName: "" } },
    { id: 8, displayTime: "20:30", part1: { status: SlotStatus.ENQUIRE, team: teams[0], displayTeamName: "" }, part2: { status: SlotStatus.ENQUIRE, team: teams[1], displayTeamName: "" } },
];