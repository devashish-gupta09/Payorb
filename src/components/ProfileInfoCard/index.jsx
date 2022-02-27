import {
  Button,
  Grid,
  InputAdornment,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ContactPhone, Edit, FiberManualRecord, LocationCity, LocationOn, Mail, WorkOutline } from "@material-ui/icons";
import { useFormik } from "formik";
import * as  MaterialAlert from "@material-ui/lab/Alert"

import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EditableTextField from "../EditableTextfield";
import { EditableTextFieldV2 } from "../EditTextFieldV2";
import ImageProfileUpload from "../ImageProfileUpload";
import Logout from "../LogoutButton";
import { styles } from "./styles";

function ProfileInfoCard({ profileData, vendor, updateProfile }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const theme = useTheme();
  const { Alert, showAlert } = useAlertSnackbar();

  const formik = useFormik({
    initialValues: {
      occupation: profileData.occupation || "",
      location: profileData.location || "",
      email: profileData.email || "",
      phoneNumber: profileData.phoneNumber || "",
    },
    onSubmit: async (values) => {
      try {
        const res = await updateUser(values);
        if (res?.success) {
          showAlert("User updated.");
          updateProfile({ ...profileData, ...values });
          setEdit(false);
        } else {
          showAlert("User not updated.", ALERT_TYPES.ERROR);
        }
      } catch (err) {
        showAlert("User not updated");
      }
    },
  });

  return (
    <Grid className={classes.profileInfoCardContainer}>
      {Alert()}
      < form onSubmit={formik.handleSubmit} >
        <Grid style={{ position: "relative" }}>
          <Grid className={classes.profileImageContainer}>
            <ImageProfileUpload
              vendor={vendor}
              title={"Select profile picture"}
              imageProps={{
                src: profileData.profileImgUrl || "/assets/profile.jpg",
                className: classes.profileImage,
              }}
            />
          </Grid>
          <Grid className={classes.profileDetailsContainer}>
            <Grid container justifyContent="center">
              <Typography
                className={`${globalClasses.boldSixHundred} ${classes.profileName}`} gutterBottom
              >
                {profileData.name}
              </Typography>
            </Grid>
            <EditableTextFieldV2
              containerPadding="0.75em 0"
              label="Occupation"
              startIcon={<WorkOutline />}
              textFieldProps={
                {
                  id: "occupation",
                  value: formik.values.occupation ?? "Add occupation",
                  variant: "filled",
                  margin: "dense",
                  fullWidth: true,
                  onChange: formik.handleChange,
                  onBlur: formik.onBlur
                }
              }
            />
            <EditableTextFieldV2
              containerPadding="0.75em 0"
              label="Email ID"
              startIcon={<Mail />}
              textFieldProps={
                {
                  id: "email",
                  value: formik.values.email ?? "Add email",
                  variant: "filled",
                  margin: "dense",
                  fullWidth: true,
                  onChange: formik.handleChange,
                  onBlur: formik.onBlur
                }
              }
            />
            <EditableTextFieldV2
              containerPadding="0.75em 0"
              label="Contact Number"
              startIcon={<ContactPhone />}
              textFieldProps={
                {
                  id: "phoneNumber",
                  value: formik.values.phoneNumber ?? "Add contact number",
                  variant: "filled",
                  margin: "dense",
                  fullWidth: true,
                  onChange: formik.handleChange,
                  onBlur: formik.onBlur
                }
              }
            />
            <EditableTextFieldV2
              containerPadding="0.75em 0"
              label="Location"
              startIcon={<LocationOn />}
              textFieldProps={
                {
                  id: "location",
                  value: formik.values.location ?? "Add Your Location",
                  variant: "filled",
                  margin: "dense",
                  fullWidth: true,
                  onChange: formik.handleChange,
                  onBlur: formik.onBlur
                }
              }
            />
            <Grid style={{ padding: "0.75em 0" }}>
              <Typography gutterBottom style={{ fontWeight: "bold" }}>
                Accounts
              </Typography>

              <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs={6}>
                  <Grid style={{ background: "rgba(30, 206, 122, 0.1)", width: "100%", border: "2px solid #00B25D", height: "5.5em", borderRadius: "3px", boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}>
                    <Typography align="center" style={{ color: "#00B25D", paddingTop: "0.25em" }}><FiberManualRecord style={{ fontSize: "0.5em" }} /> Connected</Typography>
                    <Grid container alignItems="center" justifyContent="center"><img alt="tehre" src='../assets/google-meet.png' style={{ height: "1.5em", marginTop: "1em" }} /></Grid>
                  </Grid>

                </Grid>
                <Grid item xs={6}>
                  <Grid style={{ background: "rgba(30, 206, 122, 0.1)", width: "100%", border: "2px solid #00B25D", height: "5.5em", borderRadius: "3px", boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}>
                    <Typography align="center" style={{ color: "#00B25D", paddingTop: "0.25em" }}><FiberManualRecord style={{ fontSize: "0.5em" }} /> Connected</Typography>
                    <Grid container alignItems="center" justifyContent="center"><img alt="tehre" src='../assets/zoom.png' style={{ height: "1.75em", marginTop: "1em" }} /></Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid style={{ background: "rgba(255, 206, 49, 0.17)", width: "100%", border: "2px solid #FFCE31", borderRadius: "3px", marginTop: "1.25em", padding: "1em" }}>
                NOTE: By connecting accounts you allow google to manage calendar/google-meet
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </form >
    </Grid >
  );
}

export default ProfileInfoCard;
