import * as Yup from "yup";
import { EVENT_TYPES } from "../constants/events";


export const createEventValidationSchema = Yup.object({
    name: Yup.string().max(100, "Must be 40 characters or less").required(),
    category: Yup.string().required(),
    description: Yup.string().max(200, "Must be 200 characters or less"),
    address: Yup.string().max(100, "Address can't be greater than 100 characters"),
    startDate: Yup.date().required(),
    endDate: Yup.date().min(Yup.ref('startDate'), "End date can't be before start Date").required(),
    link: Yup.string().min(4, "Must be 4 characters or more.").max(20, "Must be 20 characters or less").required(),
    price: Yup.number().min(0, "Price of a ticket must be greater than 0").max(999999, "Price of a ticket must be less than 999999"),
    totalTickets: Yup.number().lessThan(100000, "You can't book more than 100000 tickets").min(0, "Total ticket's can't be less than 0"),
    type: Yup.string().equals([EVENT_TYPES.ONE_ON_ONE, EVENT_TYPES.ONE_TIME]).required()
});
