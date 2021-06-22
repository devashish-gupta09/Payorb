import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { EVENT_TYPES } from "../../constants/events";

import { PAGE_PATHS } from "../../constants/paths";
import CustomerEvents from "../CustomerEvents";
import CustomerEventScheduler from "../CustomerEventScheduler";
import CustomerVendorProfile from "../CustomerVendorProlile";
import CustomerViewHeader from "../CustomerViewHeader";
import EventBooking from "../EventBooking";
import DashboardContainer from "../VendorDashboardContainer";

/**
 *
 *   if ( "/customers/events/register?event={link}&type={ONE_TIME}" ||
 *  "/customers/events/register?event={link}&type={ONE_ON_ONE}&from={timestamp}
 * &to={timestamp}"
 * )
 *  Rendor EventBooking Page
 *
 *    else if one on one event without to and from
 *
 *  Rendor EventBookingCalender View
 *
 * @returns React.FunctionalComponent
 */

function CustomersView() {
  const router = useRouter();

  const getComponent = () => {
    if (router.asPath.includes(PAGE_PATHS.CUSTOMER_EVENTS_REGISTER)) {
      if (router.query.event && router.query.type) {
        if (
          router.query.type === EVENT_TYPES.ONE_TIME ||
          (router.query.type === EVENT_TYPES.ONE_ON_ONE &&
            router.query.to &&
            router.query.from)
        ) {
          return (
            <EventBooking
              eventLink={router.query.event}
              to={router.query.from}
              from={router.query.from}
            ></EventBooking>
          );
        } else if (router.query.type === EVENT_TYPES.ONE_ON_ONE) {
          return <CustomerEventScheduler eventLink={router.query.event} />;
        }
      }
    } else if (router.query.vendorId) {
      return (
        <CustomerVendorProfile
          userUID={router.query.vendorId}
        ></CustomerVendorProfile>
      );
    } else if (router.asPath.includes(PAGE_PATHS.CUSTOMER_EVENTS)) {
      return <CustomerEvents />;
    }
  };

  return (
    <Grid>
      <CustomerViewHeader />
      <DashboardContainer>{getComponent()}</DashboardContainer>
    </Grid>
  );
}

export default CustomersView;
