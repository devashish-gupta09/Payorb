import * as Yup from "yup";

export const paymentSectionValidation = Yup.object({
  name: Yup.string().required(),
  bankName: Yup.string(),
  accNumber: Yup.string().required(),
  confirmAccNumber: Yup.string()
    .oneOf([Yup.ref("accNumber"), null], "Account number must match.")
    .required(),
  ifscCode: Yup.string().required(),
  bankAddress: Yup.string().max(1000),
});
