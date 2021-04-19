import moment from "moment"
export const getTimeDiff = (isoTimeString) => {
    const date = moment(new Date(isoTimeString))
    const now = moment(new Date())
    const duration = moment.duration(now.diff(date))

    const years = Math.floor(duration.asYears())
    const months = Math.floor(duration.asMonths())
    const days = Math.floor(duration.asDays())
    const hours = Math.floor(duration.asHours())
    const minutes = Math.floor(duration.asMinutes())
    const secs = Math.floor(duration.asSeconds())

    if (years > 0) {
        return `${years} years ago`
    } else if (months > 0) {
        return `${months} months ago`
    } else if (days > 0) {
        return `${days} days ago`
    } else if (hours > 0) {
        return `${hours} hours ago`
    } else if (minutes > 0) {
        return `${mins} mins ago`
    } else {
        return `${secs} secs ago`
    }
}