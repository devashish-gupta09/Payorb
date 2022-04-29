import {
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import useFetchEvents from "../../hooks/useFetchEvents";
import ButtonCapsule from "../ButtonCapsule";

import EventCard from "../EventCard";

export const VendorPublicEvents = ({ vendorId, exceptEventLink = "" }) => {
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, events, error, loadMoreEvents, moreEvents } = useFetchEvents(
    false,
    { userUID: vendorId }
  );

  if (error) {
    return <h5>Error Loading events</h5>;
  }

  if (loading) {
    return <CircularProgress size={5} />;
  }

  if (events?.length) {
    return (
      <Grid container spacing={isMobile ? 0 : 3}>
        {events
          .filter((event) => event.link !== exceptEventLink)
          .map((event) => (
            <Grid
              key={event.url}
              item
              sm={6}
              xs={12}
              style={{ paddingBottom: isMobile ? "1em" : "0" }}
            >
              <EventCard event={event} editable={false} isVendor={false} />
            </Grid>
          ))}

        {moreEvents && (
          <Grid
            item
            container
            sm={12}
            justifyContent="center"
            style={{ padding: "1em 0" }}
          >
            <ButtonCapsule
              text={"Load More"}
              buttonStyle={classes.loadMore}
              onClick={loadMoreEvents}
            />
          </Grid>
        )}
      </Grid>
    );
  }

  return null;
};

const styles = makeStyles((theme) => ({
  root: {
    background: "white",
  },
  loadMore: {
    color: "black",
    background: "white",
    border: "2px solid",
    padding: "0.25em 1.75em",
  },
}));
