import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { MailOutline, Phone, Place } from "@material-ui/icons";
import { useFormik } from "formik";
import React from "react";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import DetailRow from "../DetailRow";
import EditableTextField from "../EditableTextfield";
import VideoUpload from "../VideoUpload";

// const defaultVideo =
//   "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/defaults%2FSampleVideo_1280x720_2mb.mp4?alt=media&token=5515d343-06d3-46f5-9b60-8186d0aa4ef9";
function Details(props) {
  const globalClasses = globalStyles();
  const {
    classes,
    about,
    email,
    phoneNumber,
    location,
    vendor,
    updateProfile,
    profileData,
  } = props;
  const [edit, setEdit] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();

  const formik = useFormik({
    initialValues: {
      email: email || "",
      phoneNumber: phoneNumber || "",
      location: location || "",
      about: about || "",
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
        console.log(err);
        showAlert("User not updated", ALERT_TYPES.ERROR);
      }
    },
  });

  const handleEditProfile = () => {
    setEdit(!edit);
  };

  return (
    <>
      {Alert()}
      <form onSubmit={formik.handleSubmit}>
        <Typography className={`${globalClasses.bold}`} gutterBottom>
          About
        </Typography>

        {(about || vendor) && (
          <Grid className={classes.aboutContainer}>
            <EditableTextField
              edit={edit}
              value={
                about || !vendor || "Please add some information about yourself"
              }
              textFieldProps={{
                fullWidth: true,
                id: "about",
                label: "Please add some information about yourself",
                value: formik.values.about,
                variant: "outlined",
                margin: "normal",
                onChange: formik.handleChange,
                onBlur: formik.onBlur,
                multiline: true,
                rows: "4",
              }}
              typographyProps={{
                className: classes.aboutContainer,
              }}
            />
          </Grid>
        )}

        {email && vendor && (
          <DetailRow classes={classes} icon={<MailOutline />}>
            <EditableTextField
              edit={edit}
              value={email || !vendor || `Please add your email`}
              textFieldProps={{
                fullWidth: true,
                id: "email",
                label: "Email",
                value: formik.values.email,
                variant: "outlined",
                margin: "normal",
                onChange: formik.handleChange,
                onBlur: formik.onBlur,
              }}
            />
          </DetailRow>
        )}

        {phoneNumber && vendor && (
          <DetailRow classes={classes} icon={<Phone />}>
            <EditableTextField
              edit={edit}
              value={phoneNumber || !vendor || `Please add your phone number`}
              textFieldProps={{
                fullWidth: true,
                id: "phoneNumber",
                label: "Phone Number",
                value: formik.values.phoneNumber,
                variant: "outlined",
                margin: "normal",
                onChange: formik.handleChange,
                onBlur: formik.onBlur,
              }}
            />
          </DetailRow>
        )}

        {(location || vendor) && (
          <DetailRow classes={classes} icon={<Place />}>
            <EditableTextField
              edit={edit}
              value={location || !vendor || `Please add your location`}
              textFieldProps={{
                fullWidth: true,
                id: "location",
                label: "location",
                value: formik.values.location,
                variant: "outlined",
                margin: "normal",
                onChange: formik.handleChange,
                onBlur: formik.onBlur,
              }}
            />
          </DetailRow>
        )}

        {vendor && (
          <Grid style={{ paddingTop: "1em" }}>
            {edit ? (
              <>
                <Button className={classes.saveButton} type="submit">
                  Save
                </Button>
                <ButtonCapsule
                  text="Cancel"
                  buttonStyle={classes.cancelButton}
                  onClick={handleEditProfile}
                ></ButtonCapsule>
              </>
            ) : (
              <ButtonCapsule
                text="Edit Profile"
                onClick={handleEditProfile}
              ></ButtonCapsule>
            )}
          </Grid>
        )}
      </form>
    </>
  );
}

function ProfileAboutCard({ profileData, vendor, updateProfile }) {
  const classes = styles();

  return (
    <DashboardCard rootClass={classes.root}>
      <Grid>
        <Grid container spacing={5} className={classes.desktop}>
          <Grid item sm={profileData.videoLink ? 6 : 0}>
            <Grid className={classes.detailsContainer}>
              <Details
                about={profileData.about}
                email={profileData.email}
                phoneNumber={profileData.phoneNumber}
                location={profileData.location}
                classes={classes}
                vendor={vendor}
                profileData={profileData}
                updateProfile={updateProfile}
              />
            </Grid>
          </Grid>
          <Grid item sm={profileData.videoLink ? 6 : 0}>
            {/* Need to include a video section over here. */}
            <VideoUpload
              vendor={vendor}
              videoProps={{
                src: profileData.videoLink,
              }}
            />
          </Grid>
        </Grid>
        <Grid className={classes.mobile}>
          <Grid>
            {/* Need to include a video section over here. */}
            <VideoUpload
              vendor={vendor}
              videoProps={{
                src: profileData.videoLink,
              }}
            />
          </Grid>
          <Grid className={classes.mobileDetailsContainer}>
            <Details
              about={profileData.about}
              email={profileData.email}
              phoneNumber={profileData.phoneNumber}
              location={profileData.location}
              classes={classes}
              vendor={vendor}
              profileData={profileData}
              updateProfile={updateProfile}
            />
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
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
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  aboutContainer: {
    paddingBottom: "1em",
    whiteSpace: "pre-wrap",
  },
}));

export default ProfileAboutCard;
