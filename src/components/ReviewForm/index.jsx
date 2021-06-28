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
import firebase from "../../utils/firebase";
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

        let imageUrl = "";
        if (croppedImg) {
          imageUrl = await handleImageUpload(
            tempObject.customerId,
            tempObject.eventId
          );
        }

        const response = await addReview({
          ...tempObject,
          imageUrl: imageUrl || "",
        });

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
        console.log("Eror", err);
        showAlert(err.error || err.message, ALERT_TYPES.ERROR);
      }
      setSubmitLoading(false);
    },
  });

  const handleImageUpload = React.useCallback(
    async (customerId, eventId) => {
      const type = croppedImg.substring(
        croppedImg.indexOf(":") + 1,
        croppedImg.indexOf(";")
      );

      const ref = firebase.storage().ref();
      const childRef = ref.child(
        `/reviews/${eventId}-${customerId}.${type.split("/")[1]}`
      );

      try {
        await childRef.putString(croppedImg, "data_url", {
          cacheControl: "max-age=9999999999",
          customMetadata: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        return await childRef.getDownloadURL();
      } catch (err) {
        // Don't do anything if an image upload is unsuccessful
        console.log("Error", err);
        throw err;
      }
    },
    [croppedImg]
  );

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
          if (res.success) {
            formik.setValues({
              ...formik.values,
              ...res.data,
            });
          } else {
            showAlert(res.error, ALERT_TYPES.ERROR);
            delay(1000).then(() => {
              router.push(PAGE_PATHS.LANDING);
            });
            return;
          }
        })
        .catch(async (err) => {
          console.log("Eror", err);
          showAlert(err.error || err.message, ALERT_TYPES.ERROR);
          await delay(1000);
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
                width: "100%",
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
            value={formik.values.review}
            onChange={formik.handleChange}
            error={formik.touched.review && Boolean(formik.errors.review)}
            helperText={formik.touched.review && formik.errors.review}
          />
        </Grid>

        <Grid item sm={12} container justify="center">
          <ButtonCapsule
            showLoader={submitLoading}
            buttonStyle={classes.btnRootStyle}
            disabled={submitLoading}
            type="submit"
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
  eventImage: {
    width: "100%",
    "&:hover": {
      boxShadow: "0px 0px 7px 0px grey",
    },
  },
}));

export default ReviewForm;
