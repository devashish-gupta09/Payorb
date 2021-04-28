import React from 'react';
import CustomersView from "../../src/components/CustomersView";

/**
 * 
 * Route Map 
 * 
 *  /customer/events : Will show all the events
 *  /customer/events/register?event=link : Page that shows event details and 
 *                              a place for registration of event
 *  /customer/events/review : Page to put event review
 *  /customer/vendor?userUID=userID 
 */

export default function Vendor() {
    return <CustomersView />
}