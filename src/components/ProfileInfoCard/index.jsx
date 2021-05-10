import { Button, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import { useRouter } from "next/router";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EditableTextField from "../EditableTextfield";
import { styles } from "./styles";

function ProfileInfoCard({ profileData, vendor }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();
  const [edit, setEdit] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      occupation: profileData.occupation || "",
      location: profileData.location || "",
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
    <DashboardCard>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify="space-between" alignItems="center">
          <Grid
            container
            alignItems="center"
            className={classes.titleCardProfileContainer}
          >
            <Grid>
              <img
                src={profileData.profileImgUrl}
                className={classes.profileImage}
              />
            </Grid>

            <Grid className={classes.titleCardInfoContainer}>
              <Typography
                variant={"h4"}
                className={globalClasses.boldSixHundred}
              >
                {profileData.name}
              </Typography>

              <Grid>
                <EditableTextField
                  edit={edit}
                  value={
                    profileData.occupation ||
                    !vendor ||
                    "Please add your occupation"
                  }
                  textFieldProps={{
                    id: "occupation",
                    label: "Occupation",
                    value: formik.values.occupation,
                    variant: "outlined",
                    margin: "normal",
                    onChange: formik.handleChange,
                    onBlur: formik.onBlur,
                  }}
                  typographyProps={{ className: classes.grey }}
                />
              </Grid>
              <Grid>
                <EditableTextField
                  edit={edit}
                  value={
                    profileData.location ||
                    !vendor ||
                    "Please add your location"
                  }
                  textFieldProps={{
                    id: "location",
                    label: "Location",
                    value: formik.values.location,
                    variant: "outlined",
                    margin: "normal",
                    onChange: formik.handleChange,
                    onBlur: formik.onBlur,
                    InputProps: {
                      style: {
                        height: "min-content",
                      },
                    },
                  }}
                  typographyProps={{ className: classes.grey }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            {vendor && (
              <Grid>
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
          </Grid>
        </Grid>
      </form>
    </DashboardCard>
  );
}

export default ProfileInfoCard;
