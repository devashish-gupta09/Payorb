import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";

import useFetchEvents from "../../hooks/useFetchEvents";
import CustomerEventsList from "../CustomerEventList";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";

function CustomerEvents() {
  const classes = styles();

  const [tabValue, setTabValue] = React.useState("EDUCATION");

  const handleTabChange = (_, value) => {
    setTabValue(value);
  };

  const { loading, events, moreEvents, loadMoreEvents } = useFetchEvents(
    false,
    { category: tabValue }
  );

  if (loading) {
    return <SkeletonLoading message={"Loading events"} />;
  }

  if (events) {
    return (
      <Grid>
        <PageTitle title="Payorb | Events" />
        <Grid container alignItems={"center"}>
          <Grid item sm={8} style={{ width: "90vw" }}>
            <Tabs
              scrollButtons="auto"
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              TabIndicatorProps={{
                className: classes.activeTab,
              }}
            >
              <Tab value={"EDUCATION"} label="Education" />
              <Tab label="Health & Wellness" />
              <Tab label="Business" />
              <Tab label="Business" />
            </Tabs>
          </Grid>

          <Grid
            item
            sm={4}
            container
            justify="flex-end"
            className={classes.filterIconOuterContainer}
          >
            <Grid container className={classes.filterIconInnerContainer}>
              <Grid className={classes.filterIcon}>
                <Search></Search>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider></Divider>

        <Grid>
          {events && events.length > 0 ? (
            <>
              <Grid>
                <CustomerEventsList events={events} expand={true} />
              </Grid>

              <Grid
                style={{ marginBottom: "1em" }}
                container
                alignItems="center"
                justify="center"
              >
                {moreEvents ? (
                  <Button onClick={loadMoreEvents}>Load more</Button>
                ) : (
                  <Typography>All events loaded. </Typography>
                )}
              </Grid>
            </>
          ) : (
            <Typography variant="h5">
              No past events found. Start creating new events...
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const styles = makeStyles((theme) => ({
  skeleton: {
    padding: "2em",
    marginTop: "2em",
    height: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
  activeTab: {
    background: "#333333",
    height: "0.2em",
  },
  filterIcon: {
    background: "#ffffff",
    borderRadius: "5px",
    padding: "0.5em",
    color: "grey",
  },
  filterIconOuterContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em",
    },
  },
  filterIconInnerContainer: {
    width: "fit-content",
  },
}));

export default CustomerEvents;
