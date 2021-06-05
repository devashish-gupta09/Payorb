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

import { PAGE_PATHS } from "../../constants/paths";
import DashboardCard from "../DashboardCard";
import DateMonth from "../DateMonth";

function PostEventCreationDialog(props) {
  const { event, eventImg } = props;
  const eventLink = `${PAGE_PATHS.CUSTOMER_EVENTS_REGISTER}?event=${event.link}&type=${event.type}`;

  const handleCopy = () => {
    // can use window.location.host -> If we need port number as well.
    copy(`${document.domain}${eventLink}`);
  };
  const classes = styles();
  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          background: "transparent",
        },
      }}
    >
      <Grid className={classes.container}>
        <Grid container spacing={2}>
          <Grid item sm={12} className={classes.fullWidth}>
            <DashboardCard rootClass={`${classes.posterRoot}`}>
              <Grid>
                <img
                  src={eventImg || event.photoUrl || DEFAULT_EVENT_IMAGE}
                  className={classes.eventPoster}
                />
              </Grid>

              <Grid
                container
                alignItems="flex-end"
                justify="space-between"
                className={classes.descriptionInfoContainer}
              >
                <Typography variant={"h6"} className={classes.titleContainer}>
                  {event.name}
                </Typography>
                <DateMonth
                  startDate={event.startDate}
                  endDate={event.endDate}
                />
              </Grid>
            </DashboardCard>
          </Grid>
          <Grid item sm={12} className={classes.fullWidth}>
            <DashboardCard rootClass={`${classes.eventLinkContainer}`}>
              <Grid container justify="space-between" alignItems="center">
                {" "}
                <Grid item xs={10}>
                  <TextField
                    id="link"
                    label={"Event Link"}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          payorb/
                        </InputAdornment>
                      ),
                    }}
                    disabled={true}
                    value={event.link}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  container
                  justify="space-evenly"
                  className={classes.iconContainer}
                >
                  <Tooltip title="Copy link">
                    <FilterNone onClick={handleCopy}></FilterNone>
                  </Tooltip>

                  <Link target="_blank" href={eventLink}>
                    <Tooltip title="Open in browser">
                      <OpenInBrowser />
                    </Tooltip>
                  </Link>
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    borderRadius: "5px",
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
    padding: "2em",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
    },
  },
}));

export default PostEventCreationDialog;
