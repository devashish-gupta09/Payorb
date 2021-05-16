import moment from "moment";

export const getTimeDiff = (isoTimeString) => {
  const date = moment(new Date(isoTimeString));
  const now = moment(new Date());
  const duration = moment.duration(now.diff(date));

  const years = Math.floor(duration.asYears());
  const months = Math.floor(duration.asMonths());
  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes());
  const secs = Math.floor(duration.asSeconds());

  if (years > 0) {
    return `${years} years ago`;
  } else if (months > 0) {
    return `${months} months ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} mins ago`;
  } else {
    return `${secs} secs ago`;
  }
};

export const getLocaleMonth = (date) => {
  return date.toLocaleString("default", { month: "short" });
};

// 0< digits <= 4
export const getYearDigits = (date, digits) => {
  return date.getYear().toString().substr(-digits);
};

export const getEventMonth = (startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  if (startDate && endDate) {
    if (startDate.getYear() === endDate.getYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        return `${getLocaleMonth(startDate)}, ${getYearDigits(startDate, 2)}`;
      } else {
        return `${getLocaleMonth(startDate)}-${getLocaleMonth(
          endDate
        )}, ${getYearDigits(startDate, 2)}`;
      }
    } else {
      return `${getLocaleMonth(startDate)}, ${getYearDigits(
        startDate,
        2
      )} - ${getLocaleMonth(endDate)}, ${getYearDigits(endDate, 2)}`;
    }
  }
  return "";
};

export const getEventDate = (startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (startDate && endDate) {
    if (startDate.getYear() === endDate.getYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        if (startDate.getDate() === endDate.getDate()) {
          return `${startDate.getDate()}`;
        }

        return `${startDate.getDate()}-${endDate.getDate()}`;
      } else {
        return `${startDate.getDate()}-${endDate.getDate()}`;
      }
    } else {
      return `${startDate.getDate()}-${endDate.getDate()}`;
    }
  }
  return "";
};

/**
 *  FORMAT: Feb 14-15
 */
export const getMonthDate = (startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  if (startDate && endDate) {
    if (startDate.getYear() === endDate.getYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        if (startDate.getDate() === endDate.getDate()) {
          return `${getLocaleMonth(startDate)} ${startDate.getDate()}`;
        }

        return `${getLocaleMonth(
          startDate
        )} ${startDate.getDate()}-${endDate.getDate()}`;
      } else {
        return `${getLocaleMonth(
          startDate
        )} ${startDate.getDate()} - ${getLocaleMonth(
          endDate
        )} ${endDate.getDate()} `;
      }
    } else {
      return `${getLocaleMonth(
        startDate
      )} ${startDate.getDate()}, ${getYearDigits(
        startDate,
        2
      )} - \n ${getLocaleMonth(endDate)} ${endDate.getDate()}, ${getYearDigits(
        endDate,
        2
      )} `;
    }
  }
};

export const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const getDateForTime = (hour) => {
  hour = Math.round(hour);

  const currDate = new Date();
  currDate.setHours(hour);
  currDate.setMinutes(0);
  currDate.setMilliseconds(0);
  return currDate;
};
