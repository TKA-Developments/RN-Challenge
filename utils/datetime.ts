export const getTodayDate = (timeZone: string): string => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: timeZone })).toISOString().slice(0, 10);
}

export const isNDayAfter = (date1: Date, date2: Date, n: number): boolean => {
    let tempTomorrow1 = new Date(date1.getFullYear(), date2.getMonth(), date1.getDate() + n);
    return (tempTomorrow1.getFullYear() == date2.getFullYear() && tempTomorrow1.getMonth() == date2.getMonth() && tempTomorrow1.getDate() == date2.getDate());
}

export const formatInYYYYMMDD = (date: string): string => {
    return date.slice(0, 10)
}

// export const getHumanShortDate = (date) => {
//     const tempDateArr = formatInYYYYMMDD(date).split("-")
//     const year = tempDateArr[0]
//     const month = getMonthName(parseInt(tempDateArr[1]))
//     const day = tempDateArr[2]

//     return `${day} ${month} ${year}`
// }

export const getHumanFullDate = (date: string): string => {
    const tempDateArr = formatInYYYYMMDD(date).split("-")
    const year = tempDateArr[0]
    const month = getFullMonthName(parseInt(tempDateArr[1]))
    const day = tempDateArr[2]

    return `${day} ${month} ${year}`
}

export const getHumanFullDateLocale = (date: string): string => {
    const tempDateArr = formatInYYYYMMDD(date).split("/")
    const year = tempDateArr[2]
    const month = getFullMonthName(parseInt(tempDateArr[0]))
    const day = tempDateArr[1]

    return `${day} ${month} ${year}`
}

export const getMonthName = (monthNum: number): string => {
    switch (monthNum) {
        case 1:
            return "Jan"
        case 2:
            return "Feb"
        case 3:
            return "Mar"
        case 4:
            return "Apr"
        case 5:
            return "May"
        case 6:
            return "Jun"
        case 7:
            return "Jul"
        case 8:
            return "Aug"
        case 9:
            return "Sep"
        case 10:
            return "Oct"
        case 11:
            return "Nov"
        case 12:
            return "Des"
        default:
            return "Jan"
    }
}

export const getFullMonthName = (monthNum: number): string => {
    switch (monthNum) {
        case 1:
            return "January"
        case 2:
            return "February"
        case 3:
            return "March"
        case 4:
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"
        default:
            return "January"
    }
}

export const getMonthNumberFromShortMonth = (shortMonth: string): number => {
    switch (shortMonth) {
        case "Jan":
            return 1
        case "Feb":
            return 2
        case "Mar":
            return 3
        case "Apr":
            return 4
        case "May":
            return 5
        case "Jun":
            return 6
        case "Jul":
            return 7
        case "Aug":
            return 8
        case "Sep":
            return 9
        case "Oct":
            return 10
        case "Nov":
            return 11
        case "Dec":
            return 12
        default:
            return 1
    }
}


export const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
}

export const getTimeDifference = (date1: Date, date2: Date) => {
    const difference_In_Time = date2.getTime() - date1.getTime();
    var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    return difference_In_Days;
}