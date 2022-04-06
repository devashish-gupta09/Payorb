import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Close, FilterNone } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import copy from "clipboard-copy";
import React from "react";

import { SocialIcon } from "react-social-icons";

import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getUser } from "../../services/auth";
import { Context } from "../AuthenticationContext";
import ButtonCapsule from "../ButtonCapsule";
import EventCard from "../EventCard";

// import { PAGE_PATHS } from "../../constants/paths";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCopy = () => {
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
        className: classes.dialogPaper,
      }}
      maxWidth={"sm"}
    >
      {Alert()}
      <DialogTitle style={{ background: "#F6F6FA" }}>
        <Grid container justifyContent="space-between">
          <Typography style={{ fontWeight: "600", fontSize: "18px" }}>
            Share Event
          </Typography>
          <Close onClick={props.onClose} />
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.container}>
        <EventCard event={event} editable={false} />
        <Grid container style={{ padding: "1em 0.5em" }} alignItems="stretch">
          <Grid item xs={isMobile ? 5 : 3}>
            <Typography style={{ fontWeight: "500" }} gutterBottom>
              Share
            </Typography>
          </Grid>
          <Grid item xs={7} style={{ paddingRight: "0.5em" }}>
            <Typography style={{ fontWeight: "500" }} gutterBottom>
              Event
            </Typography>
          </Grid>

          <Grid item xs={isMobile ? 5 : 3}>
            <Grid container>
              <SocialIcon
                network="instagram"
                fgColor="#000000"
                bgColor="transparent"
                style={{
                  height: "2.5em",
                  width: "2.5em",
                  padding: 0,
                }}
              />
              <SocialIcon
                onClick={handleFacebookShare}
                network="facebook"
                fgColor="#000000"
                bgColor="transparent"
                style={{
                  height: "2.5em",
                  width: "2.5em",
                  padding: 0,
                }}
              />
              <SocialIcon
                network="twitter"
                fgColor="#000000"
                bgColor="transparent"
                style={{
                  height: "2.5em",
                  width: "2.5em",
                  padding: 0,
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={isMobile ? 7 : 6} style={{ paddingRight: "0.5em" }}>
            <TextField
              id="link"
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  color: "black",
                  background: "#ECEDF4",

                  margin: 0,
                },
                endAdornment: (
                  <InputAdornment
                    style={{ color: "#8B8B8B" }}
                    position="end"
                    onClick={handleCopy}
                  >
                    <FilterNone />
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment style={{ color: "#8B8B8B" }} position="start">
                    payorb&nbsp;/
                  </InputAdornment>
                ),
              }}
              disabled={true}
              value={event.url ? event.url : event.link}
            />
          </Grid>
          <Grid
            item
            sm={3}
            container
            justifyContent="center"
            style={{ height: "100%", paddingTop: isMobile ? "1.5em" : 0 }}
          >
            <Link target="_blank" href={eventLink}>
              <ButtonCapsule
                text={"Preview"}
                buttonStyle={{
                  textDecoration: "none",
                }}
              />
            </Link>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    borderRadius: "5px",
    overflow: "hidden",
    paddingTop: "1",
    [theme.breakpoints.down("sm")]: {
      "&.MuiDialogContent-root": {
        padding: "1em 0 0 0",
      },
    },
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
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
    },
  },
  socialIcons: {
    width: "0.25em",
    height: "0.25em",
  },
  dialogPaper: {
    padding: 0,
  },
}));

export default PostEventCreationDialog;
