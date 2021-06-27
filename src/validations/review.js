import * as Yup from "yup";

export const createReviewValidationSchema = Yup.object({
  vendorId: Yup.string().required(),
  eventId: Yup.string().required(),
  customerId: Yup.string().required(),
  imageUrl: Yup.string().optional(),
  eventName: Yup.string().required(),
  review: Yup.string().required().max(1000),
});
