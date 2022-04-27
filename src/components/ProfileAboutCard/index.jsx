import {
  Grid,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

import * as Yup from "yup";

import { appColors } from "../../../styles/colors";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import { buildVendorDashboardUrl, getVendorIdFromUrl } from "../../utils/url";
import ButtonCapsule from "../ButtonCapsule";
import VideoUpload from "../VideoUpload";

const profileAboutSectionValidation = Yup.object({
  about: Yup.string().max(500),
});

function ProfileAboutCard({ profileData, vendor = true, updateProfile }) {
  const classes = styles();
  const router = useRouter();
  const { Alert, showAlert } = useAlertSnackbar();
  const [aboutEdit, setAboutEdit] = useState(true);

  const formik = useFormik({
    initialValues: {
      about: profileData.about || "",
    },
    validationSchema: profileAboutSectionValidation,
    validateOnChange: true,
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

  const handleOnProfileClick = () => {
    router.push(
      buildVendorDashboardUrl(getVendorIdFromUrl(router), "/preview")
    );
  };

  const handleAboutEditClick = (val) => {
    setAboutEdit(val);
  };

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
            {vendor ? (
              <Grid
                container
                style={{ width: "fit-content" }}
                alignItems="center"
              >
                <ButtonCapsule
                  onClick={handleOnProfileClick}
                  text="Profile Preview"
                  buttonStyle={`${classes.previewButton}`}
                ></ButtonCapsule>
                {aboutEdit ? (
                  <Icon
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => handleAboutEditClick(false)}
                  >
                    <Edit />
                  </Icon>
                ) : (
                  <>
                    <ButtonCapsule
                      disabled={
                        formik.touched.about && Boolean(formik.errors.about)
                      }
                      text="Save Profile"
                      buttonStyle={`${classes.saveButton}`}
                      onClick={formik.handleSubmit}
                    ></ButtonCapsule>
                    <Icon
                      style={{ marginLeft: "0.5em" }}
                      onClick={() => handleAboutEditClick(true)}
                    >
                      <Close />
                    </Icon>
                  </>
                )}
              </Grid>
            ) : null}
          </Grid>
          <Grid
            style={{
              background: vendor ? "#ECEDF4" : "#FFFFFF",
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
              onBlur={formik.handleBlur}
              maxRow={8}
              minRow={8}
              disabled={!vendor || aboutEdit}
              InputProps={{ disableUnderline: true }}
              error={formik.touched.about && Boolean(formik.errors.about)}
              placeholder={
                vendor ? "Please add some information about yourself" : ""
              }
            />

            {vendor ? (
              <Grid
                container
                justifyContent="flex-end"
                style={{ padding: "0.5em 0" }}
              >
                <Grid>
                  <Typography align="right">
                    {formik.values.about.length} / 500 characters
                  </Typography>
                  <Typography style={{ color: "red" }}>
                    {formik.touched.about && formik.errors.about}
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </form>

        {profileData.videoLink || vendor ? (
          <>
            {" "}
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
              isVendor={vendor}
              profileData={profileData}
              videoProps={{
                src: profileData.videoLink,
              }}
              updateProfile={updateProfile}
            />
          </>
        ) : null}
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
    padding: "0.35em 1em",
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
    padding: "0.35em 1em",
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
