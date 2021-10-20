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
            {events &&
            events.length &&
            events.filter((e) => e.trialClass).length ? (
              <>
                <Grid container justify="space-between">
                  <Typography variant="h6">Trial Classes</Typography>
                </Grid>
                <Grid>
                  <CustomerEventsList
                    events={events}
                    expand={expand}
                    trialClass={true}
                  />
                </Grid>
                <Grid container justify="space-between">
                  <Typography variant="h6">Events list</Typography>
                </Grid>
                <Grid>
                  <CustomerEventsList
                    events={events}
                    expand={expand}
                    trialClass={false}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid container justify="space-between">
                  <Typography variant="h6">Events list</Typography>
                </Grid>
                <Grid>
                  <CustomerEventsList
                    events={events}
                    expand={expand}
                    trialClass={false}
                  />
                </Grid>
              </>
            )}

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
      </>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({}));

export default CustomerVendorProfileEvents;
