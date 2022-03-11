import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { MailOutline, Phone, Place } from "@material-ui/icons";
import { useFormik } from "formik";
import React from "react";

import { appColors } from "../../../styles/colors";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import VideoUpload from "../VideoUpload";

function ProfileAboutCard({ profileData, vendor, updateProfile }) {
  const classes = styles();
  const { Alert, showAlert } = useAlertSnackbar();

  const formik = useFormik({
    initialValues: {
      about: profileData.about || "",
    },
    onSubmit: async (values) => {
      try {
        const res = await updateUser(values);
        if (res?.success) {
          updateProfile({ ...profileData, ...values });
          showAlert("User Updated");
        } else {
          showAlert("User not updated.", ALERT_TYPES.ERROR);
        }
      } catch (err) {
        console.log(err);
        showAlert("User not updated", ALERT_TYPES.ERROR);
      }
    },
  });

  return (
    <Grid className={classes.root}>
      {Alert()}
      <Grid className={classes.detailsContainer}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: "1.5em" }}
          >
            <Grid>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                About
              </Typography>
            </Grid>
            <Grid>
              <ButtonCapsule
                text="Profile Preview"
                buttonStyle={`${classes.previewButton}`}
              ></ButtonCapsule>
              <ButtonCapsule
                text="Save Profile"
                buttonStyle={`${classes.saveButton}`}
                onClick={formik.handleSubmit}
              ></ButtonCapsule>
            </Grid>
          </Grid>
          <Grid
            style={{
              background: "#ECEDF4",
              padding: "1em",
              borderRadius: "5px",
              opacity: 0.6,
            }}
          >
            <TextField
              id="about"
              multiline
              fullWidth
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              maxRow={8}
              minRow={8}
              InputProps={{ disableUnderline: true }}
              placeholder="Please add some information about yourself"
            />
            <Grid
              container
              justifyContent="flex-end"
              style={{ padding: "0.5em 0" }}
            >
              {formik.values.about.length} / 500 characters
            </Grid>
          </Grid>
        </form>

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ margin: "1.5em 0" }}
        >
          <Grid>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Introduction Video
            </Typography>
          </Grid>
        </Grid>

        <VideoUpload
          vendor={vendor}
          videoProps={{
            src: profileData.videoLink,
          }}
        />
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    borderRadius: "0.8em",
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  logo: {
    paddingRight: "0.75em",
    color: "rgba(121, 223, 223, 1)",
  },
  grey: {
    paddingBottom: "0.2em",
    fontWeight: 500,
    color: appColors.grey,
  },
  infoRow: {
    paddingBottom: "0.5em",
  },
  cancelButton: {
    margin: "0 0.5em",
    background: "#BDBDBD",
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  previewButton: {
    boxShadow: "none",
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em 1em",
      fontSize: "0.75em",
    },
  },
  saveButton: {
    boxShadow: "none",
    background: "rgba(38, 214, 108, 1)",
    color: appColors.white,
    marginLeft: "0.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em 1em",
      fontSize: "0.75em",
    },
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
    },
  },
  mobileDetailsContainer: {
    padding: "2em 1em",
  },
  detailsContainer: {
    width: "100%",
  },
  aboutContainer: {
    paddingBottom: "1em",
    whiteSpace: "pre-wrap",
  },
}));

export default ProfileAboutCard;
