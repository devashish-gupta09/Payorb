import React from "react";

import { getClosedEvents } from "../services/events";

import { delay } from "../utils/dateTime";

function useFetchClosedEvents({ userUID }) {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState();
  const [error, setError] = React.useState();

  const [eventsParams, setEventsParams] = React.useState({
    startFrom: 0,
    limit: 5,
    userUID,
  });

  const [moreEvents, setLoadMore] = React.useState(true);

  const [totalEvents, setTotalEvents] = React.useState(0);

  const loadMoreEvents = async () => {
    try {
      const res = await getClosedEvents(eventsParams);
      // if events array returned
      if (res.data.events.length > 0) {
        setEventsParams({
          ...eventsParams,
          startFrom: res.data.lastEvent,
        });
        setTotalEvents(res.data.totalEvents);
        setEvents([...events, ...res.data.events]);
      } else {
        setLoadMore(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    //   Fetch events of category selected in TAB
    getClosedEvents(eventsParams)
      .then(async (res) => {
        if (res.data) {
          await delay(50);
          setLoading(false);
          // We recieve an object instead of array when fetching a single
          // event
          setEvents(res.data.events || [res.data.event]);
          setTotalEvents(res.data.totalEvents);
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
  }, []);

  return {
    loading,
    events,
    setEvents,
    error,
    moreEvents,
    loadMoreEvents,
    totalEvents,
  };
}

export default useFetchClosedEvents;
