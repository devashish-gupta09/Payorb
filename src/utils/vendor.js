import { ALERT_BANNER_TYPES } from "../constants/alerts";
import { PAYMENT_DETAILS_STATUS } from "../constants/payment";

export const getMessageForDetails = (details) => {
  if (!details) {
    return undefined;
  }

  const paymentDetails = details.find(
    (detail) => detail.name === "paymentDetails"
  );

  switch (paymentDetails.status) {
    case PAYMENT_DETAILS_STATUS.MISSING:
      return {
        msg:
          "[Payment Section Incomplete] To update events and services, please add your Payment details.",
        type: ALERT_BANNER_TYPES.WARNING,
      };
    case PAYMENT_DETAILS_STATUS.RZP_PENDING:
      return {
        msg:
          "[Account Under Processing] Thank you for submitting your Payment details. Your account will be activated soon.",
        type: ALERT_BANNER_TYPES.CONFIRMATION,
      };
    default:
      return;
  }
};

export const isPaymentDetailsIncomplete = (details) => {
  const paymentDetails = details.find(
    (detail) => detail.name === "paymentDetails"
  );

  return (
    paymentDetails.status === PAYMENT_DETAILS_STATUS.MISSING ||
    paymentDetails.status === PAYMENT_DETAILS_STATUS.RZP_PENDING
  );
};
