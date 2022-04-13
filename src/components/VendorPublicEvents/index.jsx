import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useQuery } from "react-query";

import { getOpenEvents } from "../../services/events";
import EventCard from "../EventCard";

export const VendorPublicEvents = ({ vendorId, exceptEventLink = "" }) => {
  const classes = styles();
  const { isLoading, data: events } = useQuery("get-open-events", () =>
    getOpenEvents(vendorId).then((res) => res.data)
  );

  console.log(events);

  if (isLoading) {
    return <CircularProgress size={5} />;
  }

  if (events?.length) {
    return (
      <Grid container spacing={3}>
        {events
          .filter((event) => event.link !== exceptEventLink)
          .map((event) => (
            <Grid key={event.url} item sm={6}>
              <EventCard event={event} editable={false} />
            </Grid>
          ))}
      </Grid>
    );
  }

  return null;
};

const styles = makeStyles((theme) => ({
  root: {
    background: "pink",
  },
}));
