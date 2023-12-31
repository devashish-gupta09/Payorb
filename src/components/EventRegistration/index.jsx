import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { EVENT_TYPES } from "../../constants/events";

import { getEventPublic } from "../../services/events";
import CustomerEventScheduler from "../CustomerEventScheduler";
import CustomerViewHeader from "../CustomerViewHeader";
import EventBooking from "../EventBooking";
import FallbackLoading from "../FallbackLoading";
import FallbackPage from "../FallbackPage";
import VendorDashboardContainer from "../VendorDashboardContainer";

function EventRegistration() {
  const router = useRouter();
  const [eventType, setEventType] = useState();
  const [error, setError] = useState();

  React.useEffect(() => {
    if (router.query.eventId) {
      getEventPublic(router.query.eventId, router.query.vendorId)
        .then((res) => {
          if (res.success) {
            const { event } = res.data;
            if (event.type) {
              setEventType(event.type);
            }
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [router]);

  if (!eventType && !error) {
    return <FallbackLoading />;
  }

  if (error) {
    return (
      <Grid>
        <CustomerViewHeader />
        <VendorDashboardContainer>
          <FallbackPage title={error}></FallbackPage>
        </VendorDashboardContainer>
      </Grid>
    );
  }

  if (eventType === EVENT_TYPES.ONE_TIME) {
    return (
      <Grid>
        <CustomerViewHeader />
        <VendorDashboardContainer>
          <EventBooking
            vendorId={router.query.vendorId}
            eventLink={router.query.eventId}
          ></EventBooking>{" "}
        </VendorDashboardContainer>
      </Grid>
    );
  }

  if (eventType === EVENT_TYPES.ONE_ON_ONE) {
    if (router.query.to && router.query.from) {
      return (
        <Grid>
          <CustomerViewHeader />
          <VendorDashboardContainer>
            <EventBooking
              vendorId={router.query.vendorId}
              eventLink={router.query.eventId}
              to={router.query.from}
              from={router.query.from}
            ></EventBooking>
          </VendorDashboardContainer>
        </Grid>
      );
    }

    return (
      <Grid>
        <CustomerViewHeader />
        <VendorDashboardContainer>
          <CustomerEventScheduler
            eventLink={router.query.eventId}
            vendorId={router.query.vendorId}
          />
        </VendorDashboardContainer>
      </Grid>
    );
  }

  return <h1>Event Page : {router.query.eventId}</h1>;
}

export default EventRegistration;
