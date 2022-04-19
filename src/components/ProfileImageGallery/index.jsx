import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import ProfilePageCarauselEditForm from "../ProfilePageCarauselEditForm";
import { ProfileImageGalleryCard } from "./ProfileImageGalleryCard";

export const ProfileImageGallery = ({
  profileInfo,
  vendor = true,
  updateProfile,
}) => {
  const classes = styles();

  const [defaultGridSize, setDefaultGridSize] = React.useState(6);
  const [assets, setAssets] = React.useState([]);
  const [emptyAssets, setEmptyAssets] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState();
  const [showForm, setShowForm] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();

  const openFormDialog = () => {
    setShowForm(true);
  };

  const closeFormDialog = React.useCallback(() => {
    setShowForm(false);
  }, [showForm]);

  const openFormDialogForSingleAsset = (_index) => {
    setEditIndex(_index);
    setShowForm(true);
  };

  const increaseDefaultGridElNum = () => {
    setDefaultGridSize(defaultGridSize + 3);
  };

  React.useEffect(() => {
    if (assets?.length) {
      setEditIndex(assets.length);
    }
  }, []);

  React.useEffect(() => {
    if (profileInfo?.carauselAssets?.length) {
      setAssets(profileInfo.carauselAssets);

      if (profileInfo.carauselAssets.length >= defaultGridSize) {
        setEmptyAssets([]);
      } else {
        setEmptyAssets(
          Array(defaultGridSize - profileInfo.carauselAssets.length).fill(0)
        );
      }
    } else {
      // Create empty array
      setEmptyAssets(Array(defaultGridSize).fill(0));
    }
  }, [profileInfo]);

  const handleDelete = async (index) => {
    let temp = [...assets];
    temp[index] = false;
    temp = temp.filter((v) => v !== false);
    try {
      const res = await updateUser({ carauselAssets: temp });
      if (res?.success) {
        showAlert("User updated.");
        updateProfile({ ...profileInfo, carauselAssets: temp });
        setAssets(temp);

        if (assets.length < 6) {
          setDefaultGridSize(6);
        }
      } else {
        showAlert("User not updated.", ALERT_TYPES.ERROR);
      }
    } catch (err) {
      console.log(err);
      showAlert("User not updated", ALERT_TYPES.ERROR);
    }
  };

  return (
    <Grid className={classes.root}>
      {Alert()}
      <Typography variant={"h6"} className={classes.title}>
        Gallery
      </Typography>
      <ProfilePageCarauselEditForm
        index={editIndex}
        setEditIndex={setEditIndex}
        updateProfile={updateProfile}
        carauselAssets={assets}
        setCarauselAssets={setAssets}
        profileData={profileInfo}
        showForm={showForm}
        close={closeFormDialog}
      />

      {profileInfo?.carauselAssets?.length || vendor ? (
        <>
          <Grid container spacing={4} className={classes.cardContainer}>
            {assets.length >= defaultGridSize &&
              assets.slice(0, defaultGridSize).map((asset, index) => {
                return (
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    className={classes.cardContainerRoot}
                    key={index}
                  >
                    <ProfileImageGalleryCard
                      key={index}
                      index={index}
                      asset={asset}
                      profileInfo={profileInfo}
                      isVendor={vendor}
                      updateProfile={updateProfile}
                      openDialog={openFormDialogForSingleAsset}
                      handleImageDelete={handleDelete}
                    />
                  </Grid>
                );
              })}

            {assets.length < defaultGridSize &&
              assets.map((asset, index) => {
                return (
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    className={classes.cardContainerRoot}
                    key={index}
                  >
                    <ProfileImageGalleryCard
                      key={index}
                      index={index}
                      profileInfo={profileInfo}
                      isVendor={vendor}
                      updateProfile={updateProfile}
                      openDialog={openFormDialogForSingleAsset}
                      handleImageDelete={handleDelete}
                    />
                  </Grid>
                );
              })}

            {assets.length < defaultGridSize &&
              vendor &&
              emptyAssets.map((_, index) => {
                return (
                  <Grid
                    item
                    sm={4}
                    xs={12}
                    className={classes.cardContainerRoot}
                    key={index}
                  >
                    <ProfileImageGalleryCard
                      profileInfo={profileInfo}
                      openDialog={openFormDialogForSingleAsset}
                    />
                  </Grid>
                );
              })}
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.addMoreButton}
          >
            {vendor ? (
              <ButtonCapsule
                text={"Add More"}
                icon={<Add />}
                iconBefore={true}
                onClick={openFormDialog}
              />
            ) : null}

            {assets.length > defaultGridSize ? (
              <Grid className={classes.viewMore}>
                <ButtonCapsule
                  text={"View More"}
                  onClick={increaseDefaultGridElNum}
                />
              </Grid>
            ) : null}
          </Grid>
        </>
      ) : (
        <Typography>No images in the gallery</Typography>
      )}
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    padding: "2em 6em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      columnGap: 0,
      rowGap: 15,
      width: "100%",
      justifyContent: "center",
      margin: 0,
    },
  },
  cardContainerRoot: {
    [theme.breakpoints.down("sm")]: {
      // Had to enforce paddings
      padding: "0 !important",
    },
  },
  addMoreButton: {
    padding: "3em",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "1em",
  },
  viewMore: {
    paddingLeft: "0.75em",
    "& > button": { background: "#FFFFFF", border: "2px solid" },
  },
}));
