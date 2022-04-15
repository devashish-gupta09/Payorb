import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  ArrowBack,
  CloudUpload,
  Delete,
  Edit,
  Event,
  Schedule,
} from "@material-ui/icons";
import { useRouter } from "next/router";

import * as React from "react";

import { EVENT_CATEGORY } from "../../constants/events";

import { EVENT_DEFAULT_BANNERS } from "../../constants/images";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { updateUser } from "../../services/auth";
import ButtonCapsule from "../ButtonCapsule";
import Capsule from "../Capsule";
import { getEventslotDuration } from "../EventBooking";
import ImageSelectAndCrop from "../ImageSelectAndCrop";

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomEventBanner = (category) => {
  console.log("CATEGORY", category);
  const banners = EVENT_DEFAULT_BANNERS[EVENT_CATEGORY[category]];
  console.log("Banner length", banners.length);
  const index = randomNumber(0, 1);
  return banners[index];
};

const VendorEventBannerHeader = ({
  eventData,
  croppedCoverImage,
  handleBannerCroppedImage,
  isVendor,
  customBackHandler,
}) => {
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { Alert, showAlert } = useAlertSnackbar();
  const [progressLoader, setProgress] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState();
  const router = useRouter();

  const handleDataUrl = (data) => {
    setDataUrl(data);
  };

  const handleDialog = (ds) => {
    if (typeof ds === "boolean") setDialogOpen(ds);
  };

  const handleSave = () => {
    handleBannerCroppedImage(dataUrl);
    setDialogOpen(false);
  };

  const handleBannerDelete = async () => {
    try {
      await updateUser({ coverImgUrl: "" });
      // updateEvent({ ...eventData, coverImgUrl: "" });
      showAlert("Banner image deleted");
    } catch (err) {
      showAlert("Banner image failed to delete");
      // To be caught by sentry
      throw err;
    }
  };

  const handleBack = () => {
    router.back();
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
                croppedCoverImage ||
                eventData?.coverImgUrl ||
                getRandomEventBanner()
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
        {croppedCoverImage || eventData?.coverImgUrl ? (
          <img
            src={croppedCoverImage || eventData.coverImgUrl}
            className={classes.bannerImg}
          />
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.defaultBackgroundContainer}
          >
            <Typography className={classes.defaultBannerText}>
              Upload Event Banner
            </Typography>
          </Grid>
        )}
      </Grid>

      {!isVendor && eventData?.name ? (
        <Grid className={classes.base}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%", color: "white" }}
          >
            <Grid>
              <Typography
                variant="h2"
                style={{
                  color: "white",
                  textAlign: "center",
                  paddingBottom: "0.25em",
                }}
              >
                {eventData.name}
              </Typography>
              <Grid container justifyContent="center">
                <Grid
                  item
                  style={{
                    width: "fit-content",
                    marginRight: "1em",
                    marginBottom: isMobile ? "0.5em" : 0,
                  }}
                  container
                  alignItems="center"
                >
                  <Event style={{ marginRight: "0.25em" }} />
                  <b>
                    {
                      getEventslotDuration(
                        eventData.startDate,
                        eventData.endDate
                      ).date
                    }
                  </b>
                </Grid>
                <Grid
                  item
                  style={{ width: "fit-content" }}
                  container
                  alignItems="center"
                >
                  <Schedule style={{ marginRight: "0.25em" }} />
                  <b>
                    {
                      getEventslotDuration(
                        eventData.startDate,
                        eventData.endDate
                      ).time
                    }
                  </b>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}

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
            onClick={customBackHandler ?? handleBack}
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
            {eventData?.coverImgUrl ? (
              <IconButton
                className={classes.deleteButton}
                onClick={handleBannerDelete}
              >
                <Delete></Delete>
              </IconButton>
            ) : null}
          </Grid>
        ) : (
          <Grid container style={{ width: "fit-content" }}>
            <Capsule bgColor="#008EFF">Booking Open</Capsule>
            <Capsule bgColor="#FF007F">{eventData.mode.toLowerCase()}</Capsule>
            <Capsule bgColor="#1ECE7A">
              {eventData.category
                .split("_")
                .map((el) => el.toLowerCase())
                .join(" ")}
            </Capsule>
            <Capsule bgColor="#7B61FF">
              {eventData.type
                .split("_")
                .map((el) => el.toLowerCase())
                .join(" ")}
            </Capsule>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    "--heightA": "100%",
    height: "calc(100vh/3)",
    width: "100%",
    position: "relative",
    // padding: "0.5em 0",
    [theme.breakpoints.down("sm")]: {
      height: "25vh",
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
    objectPosition: "top",
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
    padding: "0.45em 1em",
    "&:hover": {
      transform: "scale(1.05)",
      background: "#FFFFFF",
    },
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
    width: "100%",
    height: "100%",
  },
  defaultBannerText: {
    fontSize: "2.5em",
    fontWeight: "600",
    color: "#FFFFFF",
    // opacity: "0.35",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
  },
}));

export { VendorEventBannerHeader };
