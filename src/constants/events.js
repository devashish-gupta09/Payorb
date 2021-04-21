export const EVENT_VIEWS = {
  LIST: "LIST",
  CALENDER: "CALENDER",
};

export const EVENT_TYPES = {
  "ONE_TIME": "ONE_TIME",
  "ONE_ON_ONE": "ONE_ON_ONE"
}

export const EVENT_MODES = {
  "ONLINE": "ONLINE",
  "OFFLINE": "OFFLINE"
}

export const EVENT_DESCRIPTION = {
  [EVENT_TYPES.ONE_ON_ONE]: "Pariatur veniam exercitation deserunt et sint mollit magna.",
  [EVENT_TYPES.ONE_TIME]: "Dolore occaecat labore aliqua qui laboris amet do."
}

export const EVENT_CATEGORY = {
  EDUCATION: "Education"
}

export const defaultEvents = [
  {
    name: `FREE Master Class on “HOW to Communicate with IMPORTERS & International BUYERS”`,
    type: "Offline",
    price: "1000",
    image: "../assets/event.png",
    month: "Feb",
    dates: "14-16",
    totalRevenue: "32000",
    totalSeats: "100",
    seatsBooked: "32",
    status: "Running",
  },
  {
    name: `FREE Master Class on “HOW to Communicate with IMPORTERS & International BUYERS”`,
    type: "Offline",
    price: "1000",
    image: "../assets/event.png",
    month: "Feb",
    dates: "14-16",
    totalRevenue: "32000",
    totalSeats: "100",
    seatsBooked: "32",
    status: "Completed",
  },
  {
    name: `FREE Master Class on “HOW to Communicate with IMPORTERS & International BUYERS”`,
    type: "Offline",
    price: "1000",
    image: "../assets/event.png",
    month: "Feb",
    dates: "14-16",
    totalRevenue: "32000",
    totalSeats: "100",
    seatsBooked: "32",
    status: "Running",
  },
];
