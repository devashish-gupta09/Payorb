import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useQuery } from "react-query";

import { getEventsPublic } from "../../services/events";

import EventCard from "../EventCard";

export const VendorPublicEvents = ({ vendorId, exceptEventLink = "" }) => {
  const classes = styles();
  const { isLoading, data } = useQuery("get-open-events", () =>
    getEventsPublic({ vendorId }).then((res) => res.data)
  );

  if (isLoading) {
    return <CircularProgress size={5} />;
  }

  if (data?.events?.length) {
    return (
      <Grid container spacing={3}>
        {data.events
          .filter((event) => event.link !== exceptEventLink)
          .map((event) => (
            <Grid key={event.url} item sm={6}>
              <EventCard event={event} editable={false} isVendor={false} />
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
