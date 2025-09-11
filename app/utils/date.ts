import { parseDate, getLocalTimeZone, type DateValue } from "@internationalized/date"

export function dayWithSuffix(day: number): string {
    if (day >= 11 && day <= 13) return `${day}th`
    switch (day % 10) { case 1: return `${day}st`; case 2: return `${day}nd`; case 3: return `${day}rd`; default: return `${day}th` }
}

export function formatDate(date?: Date | DateValue | string, opts?: { locale?: string; tz?: string }): string {
    if (!date) return ""
    const { locale = "en-GB", tz = getLocalTimeZone() } = opts || {}

    let d: Date
    if (date instanceof Date) d = date
    else if (typeof date === "string") {
        try { d = parseDate(date).toDate(tz) } catch { d = new Date(date) }
    } else if ("toDate" in date) d = date.toDate(tz)
    else return ""

    const day = dayWithSuffix(d.getDate())
    const month = d.toLocaleString(locale, { month: "long" })
    const year = d.getFullYear()
    return `${day} ${month} ${year}`
}
