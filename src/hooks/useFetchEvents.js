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
          startFrom: eventsParams.startFrom,
        });
        if (res.data?.events?.length > 0) {
          setEventsParams({
            ...eventsParams,
            startFrom: res.data.lastEvent,
          });
          setEvents([...events, ...res.data.events]);
        } else {
          setLoadMore(false);
          setError("No events found");
        }
      } else {
        const res = await getEventsPublic(eventsParams);
        // if events array returned
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
      setError(err.message);
    }
  };

  React.useEffect(() => {
    if (isVendor) {
      getEventsVendorDashboard(eventsParams)
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
    } else {
      //   Fetch events of category selected in TAB
      getEventsPublic(eventsParams)
        .then(async (res) => {
          if (res.data) {
            await delay(50);
            setLoading(false);
            // We recieve an object instead of array when fetching a single
            // event
            setEvents(res.data.events || [res.data.event]);
            setEventsParams({ ...eventsParams, startFrom: res.data.lastEvent });
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });

      var ads = document.getElementsByClassName("adsbygoogle").length;
      for (var i = 0; i < ads; i++) {
        try {
          // eslint-disable-next-line no-undef
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          //
        }
      }
    }
  }, []);

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
