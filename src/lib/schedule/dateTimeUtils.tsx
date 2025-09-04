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

export function getOneWeekForwardFromDate(date: Date): Date {
  const oneWeekLater = new Date(date);
  oneWeekLater.setDate(date.getDate() + 7);
  oneWeekLater.setHours(0, 0, 0, 0);
  return oneWeekLater;
}

export function getOneWeekBackFromDate(date: Date): Date {
  const oneWeekBack = new Date(date);
  oneWeekBack.setDate(date.getDate() - 7);
  oneWeekBack.setHours(0, 0, 0, 0);
  return oneWeekBack;
}

export function getOneDayBackFromDate(date: Date): Date {
  const oneDayBack = new Date(date);
  oneDayBack.setDate(date.getDate() - 1);
  oneDayBack.setHours(0, 0, 0, 0);
  return oneDayBack;
}

export function getOneDayForwardFromDate(date: Date): Date {
  const oneDayForward = new Date(date);
  oneDayForward.setDate(date.getDate() + 1);
  oneDayForward.setHours(0, 0, 0, 0);
  return oneDayForward;
}

export function getTodaysDate(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
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