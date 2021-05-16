import * as Yup from "yup";

import { EVENT_TYPES } from "../constants/events";

export const createEventValidationSchema = Yup.object({
  name: Yup.string().max(100, "Must be 100 characters or less").required(),
  category: Yup.string().required(),
  description: Yup.string().max(400, "Must be 400 characters or less"),
  address: Yup.string().max(
    100,
    "Address can't be greater than 100 characters"
  ),
  startDate: Yup.date().required(),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date can't be before start Date")
    .required(),
  link: Yup.string()
    .min(4, "Must be 4 characters or more.")
    .max(20, "Must be 20 characters or less")
    .required(),
  price: Yup.number()
    .min(0, "Price of a ticket must be greater than 0")
    .max(999999, "Price of a ticket must be less than 999999"),
  totalTickets: Yup.number()
    .lessThan(100000, "You can't book more than 100000 tickets"),
  type: Yup.string()
    .oneOf([EVENT_TYPES.ONE_ON_ONE, EVENT_TYPES.ONE_TIME])
    .required(),
  slotDuration: Yup.number().when('type', {
    is: (value) => value === EVENT_TYPES.ONE_ON_ONE,
    then: Yup.number().moreThan(0, "Slot Duration greater that 0 hours").required(),
  }),
  slotStartTimePerDay: Yup.date().when('type', {
    is: (value) => value === EVENT_TYPES.ONE_ON_ONE,
    then: Yup.date().required()
  }),
  slotEndTimePerDay: Yup.date().when('type', {
    is: (value) => value === EVENT_TYPES.ONE_ON_ONE,
    then: Yup.date().min(Yup.ref("slotStartTimePerDay"), "End time can't be before start Date").required()
  }),
});
