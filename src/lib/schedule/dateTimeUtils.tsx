export function getNumDays(startDate: Date, endDate: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const numDays = Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay);
  return numDays;
}

export function getNumSlots(startHour: number, endHour: number, slotDurationMins: number): number {
  const totalMinutesInDay = (endHour - startHour) * 60;
  const numSlots = totalMinutesInDay / slotDurationMins;
  return numSlots;
}

export function getStartOfWeek(date: Date): Date {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - (date.getDay() - 1));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

export function getEndOfWeek(date: Date): Date {
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (7 - date.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

export function getTotalMinutesFromTimeString(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getTotalMinutesFromDate(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function parseTimeString(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return { hours, minutes };
}