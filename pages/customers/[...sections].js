import React from "react";

import CustomersView from "../../src/components/CustomersView";

/**
 * Route Map
 *
 *  /customers/events : Will show all the events
 *  /customer/events/book?event=link : Page that shows event details and
 *                              a place for registration of event
 *  /customers/events/review : Page to put event review
 *  /customers/vendor?userUID=userID
 */

export default function Customer() {
  return <CustomersView />;
}
