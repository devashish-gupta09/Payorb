import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useFormik } from "formik";

import { useRouter } from "next/router";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EditableTextField from "../EditableTextfield";
import Logout from "../LogoutButton";
import { styles } from "./styles";

function ProfileInfoCard({ profileData, vendor, updateProfile }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const [edit, setEdit] = React.useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { Alert, showAlert } = useAlertSnackbar();

  const formik = useFormik({
    initialValues: {
      occupation: profileData.occupation || "",
      location: profileData.location || "",
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

  const handleEditProfile = () => {
    setEdit(!edit);
  };

  return (
    <DashboardCard>
      {Alert()}
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify="space-between" alignItems="center">
          <Grid
            container
            alignItems="center"
            className={classes.titleCardProfileContainer}
          >
            <Grid>
              <img
                src={
                  profileData.profileImgUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
                }
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
              {/* <Grid>
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
              </Grid> */}
            </Grid>
          </Grid>
          <Grid style={{ paddingTop: `${matches ? "1.5em" : 0}` }}>
            {vendor && (
              <>
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
                  <Grid container alignItems="center">
                    <ButtonCapsule
                      text="Edit Profile"
                      onClick={handleEditProfile}
                    ></ButtonCapsule>
                    <Logout />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </DashboardCard>
  );
}

export default ProfileInfoCard;
