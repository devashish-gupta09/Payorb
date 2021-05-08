import React from "react";
import { getEventsPublic } from "../services/events";
import { delay } from "../utils/dateTime";

function useFetchEvents(isVendor, filterParams) {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState();
  const [error, setError] = React.useState();

  console.log(filterParams);

  const [eventsParams, setEventsParams] = React.useState({
    orderBy: "createdDate",
    startFrom: 0,
    limit: 5,
    ...filterParams,
  });

  const [moreEvents, setLoadMore] = React.useState(true);

  const loadMoreEvents = async () => {
    try {
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
    } catch (err) {
      console.log("error", err);
    }
  };

  React.useEffect(() => {
    if (isVendor) {
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
  }, []);

  return {
    loading,
    events,
    error,
    moreEvents,
    loadMoreEvents,
  };
}

export default useFetchEvents;
