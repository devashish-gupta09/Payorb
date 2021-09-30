import * as Yup from "yup";

import { EVENT_MODES, EVENT_TYPES } from "../constants/events";

const linkSpecialCharRegex = /^[a-z0-9]+$/i;

export const createEventValidationSchema = Yup.object({
  name: Yup.string().max(100, "Must be 100 characters or less").required(),
  category: Yup.string().required(),
  description: Yup.string().max(1000, "Must be 1000 characters or less"),
  address: Yup.string().when("mode", {
    is: (value) => value === EVENT_MODES.ONLINE,
    then: Yup.string().optional().max(100),
    otherwise: Yup.string().required().max(100),
  }),
  mode: Yup.string()
    .oneOf([EVENT_MODES.OFFLINE, EVENT_MODES.ONLINE])
    .required(),
  startDate: Yup.date().required(),
  // .min(new Date(), "Can't create back dated event"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date can't be before start Date")
    .required(),
  link: Yup.string()
    .matches(
      linkSpecialCharRegex,
      "Should not contain special charactes or spaces"
    )
    .min(6, "Must be 6 characters or more.")
    .max(40, "Must be 40 characters or less")

    .required(),
  privateMessage: Yup.string()
    .min(6, "Must be 6 characters or more.")
    .max(1000, "Must be 1000 characters or less"),
  price: Yup.number()
    .min(0, "Price of a ticket must be greater than 0")
    .max(999999, "Price of a ticket must be less than 999999"),
  totalTickets: Yup.number().lessThan(
    100000,
    "You can't book more than 100000 tickets"
  ),
  location: Yup.string().when("mode", {
    is: (value) => value === EVENT_MODES.ONLINE,
    then: Yup.string().optional().max(100),
    otherwise: Yup.string().required().max(100),
  }),
  type: Yup.string()
    .oneOf([EVENT_TYPES.ONE_ON_ONE, EVENT_TYPES.ONE_TIME])
    .required(),
  slotDuration: Yup.number().when("type", {
    is: (value) => value === EVENT_TYPES.ONE_ON_ONE,
    then: Yup.number()
      .moreThan(0, "Slot Duration greater that 0 hours")
      .required(),
  }),
  slotStartTimePerDay: Yup.date().when("type", {
    is: (value) => value === EVENT_TYPES.ONE_ON_ONE,
    then: Yup.date().required(),
  }),
  slotEndTimePerDay: Yup.date().when("type", {
    is: (value) => value === EVENT_TYPES.ONE_ON_ONE,
    then: Yup.date()
      .min(
        Yup.ref("slotStartTimePerDay"),
        "End time can't be before start Date"
      )
      .required(),
  }),
});
