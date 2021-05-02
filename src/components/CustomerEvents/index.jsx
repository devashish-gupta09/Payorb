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
import Skeleton from "react-loading-skeleton";
import { defaultEvents } from "../../constants/events";
import { getEventsPublic } from "../../services/events";
import { delay } from "../../utils/dateTime";
import CustomerEventsList from "../CustomerEventList";
import DashboardCard from "../DashboardCard";

function CustomerEvents() {
  const [tabValue, setTabValue] = React.useState("EDUCATION");
  const [events, setEvents] = React.useState();
  const classes = styles();
  const [eventsParams, setEventsParams] = React.useState({
    category: "EDUCATION",
    limit: 5,
    orderBy: "createdDate",
    startFrom: 0,
  });
  const [loadMore, setLoadMore] = React.useState(true);

  const loadMoreEvents = async () => {
    try {
      const res = await getEventsPublic(eventsParams);
      if (res.data.events.length > 0) {
        setEventsParams({
          ...eventsParams,
          startFrom: res.data.lastEvent,
        });
        setEvents([...events, ...res.data.events]);
      } else {
        setLoadMore(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleTabChange = (_, value) => {
    setTabValue(value);
  };

  React.useEffect(() => {
    //   Fetch events of category selected in TAB
    getEventsPublic(eventsParams)
      .then(async (res) => {
        if (res.data) {
          await delay(50);
          setEvents(res.data.events);
          setEventsParams({ ...eventsParams, startFrom: res.data.lastEvent });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <Grid>
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
        {events ? (
          <>
            {events && events.length > 0 ? (
              <>
                <Grid>
                  <CustomerEventsList events={events} />
                </Grid>

                <Grid
                  style={{ marginBottom: "1em" }}
                  container
                  alignItems="center"
                  justify="center"
                >
                  {loadMore ? (
                    <Button onClick={loadMoreEvents}>Load more</Button>
                  ) : (
                    <Typography>All events loaded. </Typography>
                  )}
                </Grid>
              </>
            ) : (
              <Typography>No events found</Typography>
            )}
          </>
        ) : (
          <DashboardCard rootClass={classes.skeleton}>
            <h3>Loading Events</h3>
            <Skeleton count={5} />
          </DashboardCard>
        )}
      </Grid>
    </Grid>
  );
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
