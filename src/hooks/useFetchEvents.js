import React from "react";
import { getEventsPublic, getEventsVendorDashboard } from "../services/events";
import { delay } from "../utils/dateTime";

function useFetchEvents(isVendor, filterParams) {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState();
  const [error, setError] = React.useState();

  const [eventsParams, setEventsParams] = React.useState({
    orderBy: "createdDate",
    startFrom: 0,
    limit: 5,
    ...filterParams,
  });

  const [moreEvents, setLoadMore] = React.useState(true);

  const handleLimitChange = (limit) => {
    console.log(limit);
    setEventsParams({
      ...eventsParams,
      limit,
    });
  };

  const loadMoreEvents = async () => {
    try {
      if (isVendor) {
        const res = await getEventsVendorDashboard({
          ...eventsParams,
          startFrom: eventsParams.startFrom + eventsParams.limit,
        });
        if (res.data.length > 0) {
          setEventsParams({
            ...eventsParams,
            startFrom: eventsParams.startFrom + eventsParams.limit,
          });
          setEvents([...events, ...res.data]);
        } else {
          setLoadMore(false);
        }
      } else {
        const res = await getEventsPublic(eventsParams);
        if (res.data.events.length > 0) {
          setEventsParams({
            ...eventsParams,
            startFrom: res.data.lastEvent,
          });
          setEvents([...events, ...res.data.events]);
        } else {
          setLoadMore(false);
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  React.useEffect(() => {
    if (isVendor) {
      getEventsVendorDashboard(eventsParams)
        .then(async (res) => {
          if (res.data) {
            await delay(50);
            setLoading(false);
            setEvents(res.data);
            setEventsParams({ ...eventsParams, startFrom: res.data.lastEvent });
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      //   Fetch events of category selected in TAB
      console.log("Events Params : ", eventsParams);
      getEventsPublic(eventsParams)
        .then(async (res) => {
          if (res.data) {
            await delay(50);
            setLoading(false);
            setEvents(res.data.events);
            setEventsParams({ ...eventsParams, startFrom: res.data.lastEvent });
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [eventsParams.limit]);

  return {
    loading,
    events,
    error,
    moreEvents,
    loadMoreEvents,
    changeLimit: handleLimitChange,
  };
}

export default useFetchEvents;
