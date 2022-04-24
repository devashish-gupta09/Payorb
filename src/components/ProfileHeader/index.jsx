import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowBack, CloudUpload, Delete, Edit } from "@material-ui/icons";
import { Alert as MuiAlert } from "@material-ui/lab";
import { useRouter } from "next/router";

import * as React from "react";

import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchVendorVerifiedDetails from "../../hooks/useFetchVendorAuth";
import { updateUser } from "../../services/auth";
import { delay } from "../../utils/dateTime";
import firebase from "../../utils/firebase";
import { FirebaseAuth } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import ImageSelectAndCrop from "../ImageSelectAndCrop";

const styles = makeStyles((theme) => ({
  root: {
    "--heightA": "100%",
    width: "100%",
    height: "calc(100vh/2.56)",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "25vh",
      width: "100vw",
    },
  },
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
  const [progressLoader, setProgress] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const [croppedImg, setCroppedImage] = React.useState();

  const { verifiedDetails, loading: detailsLoading } =
    useFetchVendorVerifiedDetails();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { Alert, showAlert } = useAlertSnackbar();

  const handleDataUrl = React.useCallback((data) => {
    setDataUrl(data);
  }, []);

  const handleDialog = (ds) => {
    if (typeof ds === "boolean") setDialogOpen(ds);
  };

  const handleBack = () => {
    router.back();
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
          updateProfile({ ...profileData, bannerImgUrl: res });
          handleDialog(false);
        });
      }
    );
  };

  const handleBannerDelete = async () => {
    try {
      await updateUser({ bannerImgUrl: "" });
      updateProfile({ ...profileData, bannerImgUrl: "" });
      showAlert("Banner image deleted");

      setDataUrl();
    } catch (err) {
      showAlert("Banner image failed to delete");
      // To be caught by sentry
      throw err;
    }
  };

  const paymentDetails = verifiedDetails?.find(
    (vd) => vd.name === "paymentDetails"
  );

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
              cropperAspectRatio={4.5}
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
        {isVendor && !detailsLoading && paymentDetails?.status !== "COMPLETE" && (
          <MuiAlert
            severity="warning"
            variant="filled"
            style={{
              transform:
                `translateX(${isMobile ? "80px" : 0}) ` +
                `scale(${isMobile ? 0.5 : 1})`,
              position: "absolute",
              right: isMobile ? 2 : 10,
              top: "35%",
              background: "#F2C94C",
              color: "black",
            }}
          >
            <Grid container style={{ width: "300px" }} alignItems="center">
              <Grid item xs={9} style={{ width: "fit-content" }}>
                <Typography
                  gutterBottom
                  style={{ fontSize: "1em", width: "fit-content" }}
                >
                  {paymentDetails.status === "MISSING"
                    ? "Payment Section Incomplete"
                    : "Account Under Processing"}
                </Typography>
                <Typography style={{ fontSize: "0.85em" }}>
                  To update your events and services, please add your payment
                  details.
                </Typography>
              </Grid>
              <Grid item xs={3} style={{ width: "fit-content" }}>
                <Link
                  style={{
                    fontSize: "0.85em",
                    color: "black",
                    textDecoration: "underline",
                  }}
                  href="#payment"
                >
                  Check Now
                </Link>
              </Grid>
            </Grid>
          </MuiAlert>
        )}

        {dataUrl || profileData?.bannerImgUrl ? (
          <img src={profileData.bannerImgUrl} className={classes.bannerImg} />
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.defaultBackgroundContainer}
          >
            <Typography className={classes.defaultBannerText}>
              {isVendor && "Add a cover pic"}
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
            onClick={handleBack}
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
