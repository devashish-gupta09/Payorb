import {
  Button,
  Dialog,
  Grid,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { FilterNone, OpenInBrowser } from "@material-ui/icons";
import React from "react";
import { PAGE_PATHS } from "../../constants/paths";
import DashboardCard from "../DashboardCard";
import DateMonth from "../DateMonth";

import copy from "clipboard-copy";

function PostEventCreationDialog(props) {
  const { event } = props;
  const handleCopy = () => {
    copy(
      `${document.domain}${PAGE_PATHS.CUSTOMER_EVENTS_REGISTER}?event=${event.link}`
    );
  };
  const classes = styles();
  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          overflow: "hidden",
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
                  src={
                    event.photoUrl ||
                    "https://i.pinimg.com/736x/59/59/88/5959880ca0cb6b30926091b7bc251812.jpg"
                  }
                  className={classes.eventPoster}
                />
              </Grid>

              <Grid
                container
                alignItems="flex-end"
                justify="space-between"
                className={classes.descriptionInfoContainer}
              >
                <Typography variant={"h5"} className={classes.titleContainer}>
                  {"sadfsdfsfsdafssdfsdf   fsadfdsaf adsf adfdsfdsafsadf"}
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
                  <FilterNone onClick={handleCopy}></FilterNone>

                  <Link
                    target="_blank"
                    href={`${PAGE_PATHS.CUSTOMER_EVENTS_REGISTER}?event=${event.link}`}
                  >
                    <OpenInBrowser />
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
    maxWidth: "400px",
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
