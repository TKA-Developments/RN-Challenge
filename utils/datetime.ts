export const getTodayDate = (timeZone: string): string => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: timeZone })).toISOString().slice(0, 10);
}

export const isNDayAfter = (date1: Date, date2: Date, n: number): boolean => {
    let tempTomorrow1 = new Date(date1.getFullYear(), date2.getMonth(), date1.getDate() + n);
    return (tempTomorrow1.getFullYear() == date2.getFullYear() && tempTomorrow1.getMonth() == date2.getMonth() && tempTomorrow1.getDate() == date2.getDate());
}
