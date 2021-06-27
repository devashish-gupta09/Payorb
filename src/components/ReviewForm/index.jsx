import {
  FormControl,
  FormLabel,
  Grid,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getCustomerForReview } from "../../services/customers";
import { addReview } from "../../services/review";

import { delay } from "../../utils/dateTime";
import { createReviewValidationSchema } from "../../validations/review";
import ButtonCapsule from "../ButtonCapsule";

import CustomTextField from "../CustomTextField";
import FallbackLoading from "../FallbackLoading";
import ImageEventUpload from "../ImageEventUpload";

function ReviewForm() {
  const theme = useTheme();
  const classes = styles();
  const [croppedImg, setCroppedImage] = React.useState();
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const router = useRouter();
  const { Alert, showAlert } = useAlertSnackbar();

  const handleCroppedImage = React.useCallback((data) => {
    setCroppedImage(data);
  }, []);

  const formik = useFormik({
    initialValues: {
      customerId: "",
      phoneNumber: "",
      email: "",
      review: "",
      imageUrl: "",
      eventName: "",
      eventId: "",
      vendorId: "",
    },
    validationSchema: createReviewValidationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setSubmitLoading(true);
      try {
        const tempObject = { ...values };

        delete tempObject.phoneNumber;
        delete tempObject.email;

        const response = await addReview(tempObject);

        if (response.success) {
          showAlert("Review Submitted");
          await delay(400);
          showAlert("Redirecting you to home.");
          await delay(200);
          router.push(PAGE_PATHS.LANDING);
        } else {
          showAlert(response.error, ALERT_TYPES.ERROR);
        }
      } catch (err) {
        showAlert(err.message);
      }
      setSubmitLoading(false);
    },
  });

  React.useEffect(() => {
    if (router.isReady) {
      const { eventId, customerId } = router.query;

      if (!eventId || !customerId) {
        showAlert(
          "Sorry we are unable to retrieve data for review.",
          ALERT_TYPES.ERROR
        );
        delay(400).then(() => {
          router.push(PAGE_PATHS.LANDING);
        });
        return;
      }

      getCustomerForReview(eventId, customerId)
        .then((res) => {
          console.log("Tada", res);
          if (res.success) {
            formik.setValues({
              ...formik.values,
              ...res.data,
            });
          } else {
            console.log(res);
            showAlert(res.error, ALERT_TYPES.ERROR);
            delay(1000).then(() => {
              router.push(PAGE_PATHS.LANDING);
            });
            return;
          }
        })
        .catch(async (err) => {
          showAlert(err.error || err.message, ALERT_TYPES.ERROR);
          await delay(400);
          router.push(PAGE_PATHS.LANDING);
          return;
        });
    }
  }, [router]);

  if (!formik.values.customerId && !formik.values.eventId) {
    return (
      <>
        {Alert()} <FallbackLoading />
      </>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {Alert()}
      <Grid container spacing={3}>
        <Grid item sm={12} container spacing={3}>
          <Grid item sm={6}>
            <CustomTextField
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={formik.values.phoneNumber}
              disabled
              style={{ marginBottom: theme.spacing(3) }}
            />
            <CustomTextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              disabled
            />
          </Grid>
          <Grid item sm={6}>
            <Grid
              style={{
                height: "100%",
              }}
            >
              <FormControl variant="outlined">
                <FormLabel>Upload Event Cover Photo</FormLabel>

                <ImageEventUpload
                  croppedImg={croppedImg}
                  handleCroppedImage={handleCroppedImage}
                  imageProps={{
                    src: DEFAULT_EVENT_IMAGE,
                    className: classes.eventImage,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} container>
          <CustomTextField
            fullWidth
            id="eventName"
            label="Event Name"
            variant="outlined"
            value={formik.values.eventName}
            disabled
          />
        </Grid>

        <Grid item sm={12} container>
          <CustomTextField
            fullWidth
            multiline
            id="review"
            label="Write Review"
            variant="outlined"
            rows={6}
            value={formik.values.eventName}
          />
        </Grid>

        <Grid item sm={12} container justify="center">
          <ButtonCapsule
            showLoader={submitLoading}
            buttonStyle={classes.btnRootStyle}
            text="Save"
          ></ButtonCapsule>
        </Grid>
      </Grid>
    </form>
  );
}

const styles = makeStyles((theme) => ({
  btnRootStyle: {
    padding: "0.5em 5em",
    fontWeight: "600",
    fontSize: "0.9em",
  },
}));

export default ReviewForm;
