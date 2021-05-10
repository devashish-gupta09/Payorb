import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

import useFetchEvents from "../../hooks/useFetchEvents";
import CustomerEventsList from "../CustomerEventList";
import SkeletonLoading from "../SkeletonLoading";

function CustomerVendorProfileEvents({ userUID }) {
  const { loading, events, moreEvents, loadMoreEvents } = useFetchEvents(
    false,
    { userUID }
  );

  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  if (loading) {
    return <SkeletonLoading />;
  }

  if (events) {
    return (
      <>
        {events && events.length > 0 ? (
          <>
            <Grid container justify="space-between">
              <Typography variant="h6">Events list</Typography>
              <Button onClick={handleExpand}>Expand</Button>
            </Grid>
            <Grid>
              <CustomerEventsList events={events} expand={expand} />
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
          <Typography>No events found</Typography>
        )}
      </>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({}));

export default CustomerVendorProfileEvents;
