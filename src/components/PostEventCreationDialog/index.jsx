import {
  Dialog,
  Grid,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { FilterNone, OpenInBrowser } from "@material-ui/icons";
import copy from "clipboard-copy";
import React from "react";

import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getUser } from "../../services/auth";
import { Context } from "../AuthenticationContext";
// import { PAGE_PATHS } from "../../constants/paths";
import DashboardCard from "../DashboardCard";
import DateMonth from "../DateMonth";
import EventImageContainer from "../EventImageContainer/Index";
import ReadMore from "../ReadMore";

const loadFacebook = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    document.body.appendChild(script);

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
  });
};

function PostEventCreationDialog(props) {
  const userContext = React.useContext(Context);
  const [vendor, setVendor] = React.useState();
  const { event, eventImg } = props;
  const [eventLink, setEventLink] = React.useState("");
  const { Alert, showAlert } = useAlertSnackbar();

  const handleCopy = () => {
    // can use window.location.host -> If we need port number as well.
    showAlert("Link copied");
    copy(`${location.host}${eventLink}`);
  };

  const handleFacebookShare = async () => {
    const res = await loadFacebook();

    window.FB.init({
      appId: "906148326867108",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v11.0",
    });

    window.FB.ui(
      {
        display: "popup",
        method: "share",
        href: `${location.host}${eventLink}`,
        hashtab: "#payorb",
      },
      function (response) {}
    );
  };
  const classes = styles();
  React.useEffect(() => {
    if (userContext && userContext.user && userContext.user.uid) {
      // API call to get vendor details
      getUser({ vendorId: userContext.user.uid })
        .then((res) => {
          if (res.data.vendor) {
            setVendor(res.data.vendor);
          } else {
            throw new Error("Error fetching vendor");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [userContext.user.uid]);

  React.useEffect(() => {
    if (vendor && (vendor.username || vendor.userUID)) {
      setEventLink(
        `/${vendor.username ? vendor.username : vendor.userUID}/${
          event.url ? event.url : event.link
        }`
      );
    }
  }, [vendor, event]);

  return (
    <Dialog
      {...props}
      scroll="body"
      PaperProps={{
        style: {
          background: "white",
        },
      }}
    >
      <Grid className={classes.container}>
        {Alert()}
        <Grid container spacing={2}>
          <Grid item sm={12} className={classes.fullWidth}>
            <Grid className={`${classes.posterRoot}`}>
              <Grid>
                <EventImageContainer
                  url={eventImg || event.photoUrl || DEFAULT_EVENT_IMAGE}
                />
              </Grid>

              <Grid
                container
                alignItems="flex-end"
                justify="space-between"
                className={classes.descriptionInfoContainer}
              >
                <Grid
                  item
                  sm={10}
                  style={{ width: "100%", border: "4px solid" }}
                >
                  <Typography
                    variant={"h6"}
                    gutterBottom
                    className={classes.titleContainer}
                  >
                    {event.name}
                  </Typography>
                  <Grid
                    style={{
                      width: "95%",
                      whiteSpace: "pre-line",
                      // paddingBottom: "1.5em",
                    }}
                  >
                    <ReadMore percent={11} text={event.description} />
                  </Grid>
                </Grid>
                <Grid item sm={2} container justify="center">
                  <DateMonth
                    startDate={event.startDate}
                    endDate={event.endDate}
                  />
                </Grid>
              </Grid>

              <Grid container justify="center" style={{ width: "100%" }}>
                <Grid item sm={12} style={{ marginBottom: "0.5em" }}>
                  <Typography
                    variant={"h5"}
                    align="center"
                    style={{ width: "100%" }}
                  >
                    Share
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={12}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    onClick={handleFacebookShare}
                    style={{
                      borderRadius: "50%",
                      background: "#ABC6FF",
                      height: "3em",
                      width: "3em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "1em",
                    }}
                  >
                    <img src="/assets/facebook-xl.png" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} className={classes.fullWidth}>
            <Grid className={`${classes.eventLinkContainer}`}>
              <Grid container justify="space-between" alignItems="center">
                {" "}
                <Grid item xs={10}>
                  <TextField
                    id="link"
                    label={"Event Link"}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          payorb/
                        </InputAdornment>
                      ),
                    }}
                    disabled={true}
                    value={event.url ? event.url : event.link}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  container
                  justify="space-evenly"
                  className={classes.iconContainer}
                >
                  <Grid onClick={handleCopy}>
                    <Tooltip title="Copy link">
                      <FilterNone className={classes.icon}></FilterNone>
                    </Tooltip>
                  </Grid>

                  <Link target="_blank" href={eventLink}>
                    <Tooltip title="Open in browser">
                      <OpenInBrowser className={classes.icon} />
                    </Tooltip>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    borderRadius: "5px",
    overflow: "hidden",
  },
  iconContainer: {
    "& > a, svg": {
      color: "grey",
      [theme.breakpoints.down("sm")]: {
        padding: "0.1em",
      },
    },
  },
  fullWidth: { width: "100%" },
  posterRoot: {
    padding: 0,
    borderRadius: "5px",
    paddingBottom: "1em",
  },
  eventLinkContainer: {
    height: "fit-content",
    padding: "2em",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
    },
  },
  eventPoster: {
    borderRadius: "5px",
    minWidth: "100%",
    maxWidth: "350px",
    [theme.breakpoints.up("xl")]: {
      minWidth: "100%",
      maxWidth: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  titleContainer: {
    fontWeight: "bold",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  descriptionInfoContainer: {
    padding: "1em 2em",
    width: "100%",
    border: "2px solid",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
    },
  },
  icon: {
    width: "1.25em",
    height: "1.25em",
  },
}));

export default PostEventCreationDialog;
