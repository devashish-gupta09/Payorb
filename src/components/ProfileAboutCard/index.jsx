import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { MailOutline, Phone, Place } from "@material-ui/icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import DetailRow from "../DetailRow";
import EditableTextField from "../EditableTextfield";

function Details(props) {
  const globalClasses = globalStyles();
  const { classes, about, email, phoneNumber, location, vendor } = props;
  const [edit, setEdit] = React.useState(false);
  const router = useRouter();

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
          alert("User updated.");
          router.reload();
        } else {
          alert("User not updated.");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleEditProfile = () => {
    setEdit(!edit);
  };

  return (
    <>
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
                label: "About",
                value: formik.values.about,
                variant: "outlined",
                margin: "normal",
                onChange: formik.handleChange,
                onBlur: formik.onBlur,
              }}
            />
          </Grid>
        )}

        {(email || vendor) && (
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

        {(phoneNumber || vendor) && (
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

function ProfileAboutCard({ profileData, vendor }) {
  const classes = styles();

  return (
    <DashboardCard rootClass={classes.root}>
      <Grid>
        <Grid container spacing={5} className={classes.desktop}>
          <Grid item sm={6}>
            <Grid className={classes.detailsContainer}>
              <Details
                about={profileData.about}
                email={profileData.email}
                phoneNumber={profileData.phoneNumber}
                location={profileData.location}
                classes={classes}
                vendor={vendor}
              />
            </Grid>
          </Grid>
          <Grid item sm={6}>
            {/* Need to include a video section over here. */}
            <img style={{ width: "100%" }} src={"../assets/video.png"} />
          </Grid>
        </Grid>
        <Grid className={classes.mobile}>
          <Grid>
            {/* Need to include a video section over here. */}
            <img style={{ width: "100%" }} src={"../assets/video.png"} />
          </Grid>
          <Grid className={classes.mobileDetailsContainer}>
            <Details
              about={profileData.about}
              email={profileData.email}
              phoneNumber={profileData.phoneNumber}
              location={profileData.location}
              classes={classes}
              vendor={vendor}
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
    padding: "1em",
  },
  detailsContainer: {
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  aboutContainer: {
    paddingBottom: "1em",
  },
}));

export default ProfileAboutCard;
