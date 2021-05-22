import React from "react";

import PolicyView from "../src/components/PolicyView";

/**
 * Route Map
 *
 *  /policy/term-and-conditions : Will show all the events
 *  /policy/privacy : Page that shows event details and
 *                              a place for registration of event
 *  /policy/user-aggrement : Page to put event review
 *  /policy/website-disclaimer
 */

export default function Vendor() {
  return <PolicyView />;
}
