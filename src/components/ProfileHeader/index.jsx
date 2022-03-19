import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ArrowBack, CloudUpload, Delete, Edit } from "@material-ui/icons";
import ButtonCapsule from "../ButtonCapsule";
import * as React from "react";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import firebase from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import ImageSelectAndCrop from "../ImageSelectAndCrop";

import { ALERT_TYPES } from "../../constants/alerts";
import { delay } from "../../utils/dateTime";
import { updateUser } from "../../services/auth";

const styles = makeStyles((theme) => ({
  root: {
    height: "13.5em",
    width: "100%",
    backgroundColor: "pink",
    position: "relative",
  },
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonLayer: {
    position: "absolute",
    width: "100%",
    padding: "1em 2.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1.5em",
    },
  },
  backButton: {
    background: "#FFFFFF",
    boxShadow: "none",
    padding: "0.35em 1em",
  },
  editButton: {
    color: "#008EFF",
    background: "#FFFFFF",
  },
  deleteButton: {
    background: "#FFFFFF",
    boxShadow: "none",
    color: "#FC6767",
    marginLeft: "0.5em",
  },
  defaultBackgroundContainer: {
    background: "linear-gradient(90deg, #BCF4F1 0%, #00D4FF 177.56%)",
    width: "100%",
    height: "100%",
  },
  defaultBannerText: {
    fontSize: "3.5em",
    fontWeight: "700",
    color: "#FFFFFF",
    opacity: "0.35",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
  },
}));

const ProfileHeader = ({ profileData, updateProfile, isVendor }) => {
  const classes = styles();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const [progressLoader, setProgress] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const [croppedImg, setCroppedImage] = React.useState();
  const theme = useTheme();
  const handleDataUrl = React.useCallback((data) => {
    setDataUrl(data);
  }, []);

  const handleDialog = (ds) => {
    if (typeof ds === "boolean") setDialogOpen(ds);
  };

  const handleSave = async () => {
    const type = dataUrl.substring(
      dataUrl.indexOf(":") + 1,
      dataUrl.indexOf(";")
    );

    const auth = FirebaseAuth.Singleton();
    const user = auth.getUser();

    const firebaseStorageObj = firebase.storage();
    const ref = firebaseStorageObj.ref();
    const childRef = ref.child(
      `/profile-banner/${user.uid}.${type.split("/")[1]}`
    );

    const task = childRef.putString(dataUrl, "data_url", {
      cacheControl: "max-age=1654999999999",
      customMetadata: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    setProgress(true);
    task.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.CANCELED:
            showAlert("Image upload canceled", ALERT_TYPES.ERROR);
            break;
        }
      },
      (error) => {
        let message = "Image cannot be saved";
        switch (error.code) {
          case "storage/unauthorized":
            message = "Unauthorized User";
            break;
          case "storage/canceled":
            message = "User cancelled file upload";
            break;
        }

        setProgress(false);
        showAlert(message, ALERT_TYPES.ERROR);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(async (res) => {
          await delay(2000);
          setProgress(false);
          setCroppedImage(dataUrl);
          handleDialog(false);
        });
      }
    );
  };

  const handleBannerDelete = async () => {
    try {
      await updateUser({ bannerImgUrl: "" });
      showAlert("Banner image deleted");
    } catch (err) {
      showAlert("Banner image failed to delete");
      // To be caught by sentry
      throw err;
    }
  };

  return (
    <Grid className={classes.root}>
      {Alert()}
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={() => handleDialog(false)}>
          <DialogContent className={classes.dialogContentContainer}>
            <ImageSelectAndCrop
              title="Select banner image"
              imagePath={
                croppedImg ||
                profileData.bannerImgUrl ||
                "/assets/profile-banner-default.png"
              }
              handleDataUrl={handleDataUrl}
              cropperAspectRatio={6.5}
            />

            <Grid
              container
              justify="center"
              style={{
                marginTop: "0.5em",
                padding: "0.5em 0",
              }}
            >
              <Button
                onClick={handleSave}
                style={{
                  background: "#79DFDF",
                  padding: "0.75em 1.5em",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {progressLoader ? (
                  <CircularProgress
                    size="1.5em"
                    variant="indeterminate"
                    style={{ color: "white", marginRight: "0.2em" }}
                  />
                ) : (
                  <CloudUpload
                    style={{ color: "white", marginRight: "0.2em" }}
                  />
                )}
                &nbsp;Save
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
      <Grid className={classes.base}>
        {profileData?.bannerImgUrl ? (
          <img
            src={profileData.bannerImgUrl}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.defaultBackgroundContainer}
          >
            <Typography className={classes.defaultBannerText}>
              Add a cover pic
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className={classes.buttonLayer}
      >
        <Grid>
          <ButtonCapsule
            text=" Back"
            icon={<ArrowBack style={{ fontSize: "1.25em" }} />}
            iconBefore={true}
            buttonStyle={`${classes.backButton}`}
          />
        </Grid>
        {isVendor ? (
          <Grid>
            <IconButton
              className={classes.editButton}
              onClick={() => {
                handleDialog(true);
              }}
            >
              <Edit></Edit>
            </IconButton>
            {profileData?.bannerImgUrl ? (
              <IconButton
                className={classes.deleteButton}
                onClick={handleBannerDelete}
              >
                <Delete></Delete>
              </IconButton>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};
export { ProfileHeader };
