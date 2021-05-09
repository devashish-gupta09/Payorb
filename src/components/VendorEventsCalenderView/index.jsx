import * as React from "react";

import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";

import SkeletonLoading from "../SkeletonLoading";
import useFetchEventsBetween from "../../hooks/useFetchEventsBetween";
import DashboardCard from "../DashboardCard";

const transformEvents = (events) => {
  return events.map((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    // // Not in same month
    // if(endDate.getMonth() > startDate.getMonth()){

    // }

    // if ( endDate.getDate -  > 0){
    //   for (var i = 0, i<)
    // }

    return { title: event.name, startDate, endDate };
  });
};

function VendorEventsCalenderView() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const { data: events, loading, error } = useFetchEventsBetween(
    startDate,
    endDate
  );

  console.log(loading, events);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (events) {
    const transformedEvents = transformEvents(events);
    console.log(transformedEvents);
    return (
      <DashboardCard>
        <Scheduler data={transformedEvents} height={660}>
          <ViewState
            defaultCurrentDate="2021-05-09"
            defaultCurrentViewName="Week"
          />

          <DayView startDayHour={9} endDayHour={18} />
          <WeekView startDayHour={9} endDayHour={20} />

          <Toolbar />
          <ViewSwitcher />
          <Appointments />
          <AllDayPanel />
        </Scheduler>
      </DashboardCard>
    );
  }

  if (error) {
    return <h2>error</h2>;
  }

  return <h1>Something went wrong</h1>;
}

export default VendorEventsCalenderView;
