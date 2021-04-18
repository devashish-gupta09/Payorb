import { FormControl, Grid, Grow, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { globalStyles } from "../../../styles/globalStyles";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EditableTextField from "../EditableTextfield";
import { styles } from "./styles";
import React from "react";

function ProfileInfoCard({ profileData }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const [edit, setEdit] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      occupation: profileData.occupation || "",
      location: profileData.location || "",
    },
    onSubmit: async (values) => {
      console.log("Update Profile Info");
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

              <FormControl>
                <Grid>
                  <EditableTextField
                    edit={edit}
                    value={
                      profileData.occupation
                        ? profileData.occupation
                        : "Please add your occupation"
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
                    value={profileData.location || "Please add your location"}
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
              </FormControl>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              {edit ? (
                <>
                  <ButtonCapsule
                    buttonStyle={classes.saveButton}
                    text="Save"
                    type={"submit"}
                  ></ButtonCapsule>

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
          </Grid>
        </Grid>
      </form>
    </DashboardCard>
  );
}

export default ProfileInfoCard;
