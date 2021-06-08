import { Button, Dialog, Grid, Tooltip, Typography } from "@material-ui/core";
import { Share } from "@material-ui/icons";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { EVENT_TYPES } from "../../constants/events";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import { getEventDate, getEventMonth } from "../../utils/dateTime";
import { formatEventType } from "../../utils/events";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import PostEventCreationDialog from "../PostEventCreationDialog";
import ReadMore from "../ReadMore";
import VendorEventCreationForm from "../VendorEventCreationForm";
import { styles } from "./styles";

export function EventCardDate({ classes, startDate, endDate }) {
  return (
    <>
      <Typography align="center" variant="h6" style={{ width: "max-content" }}>
        {getEventMonth(startDate, endDate)}
      </Typography>
      <Typography align="center">{`${getEventDate(
        startDate,
        endDate
      )}`}</Typography>
    </>
  );
}

function EventCard({ event }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const [edit, setEdit] = React.useState(false);
  const [shareDialog, setShareDialog] = React.useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleClose = () => {
    setEdit(false);
  };

  const handleShareDialog = () => {
    setShareDialog(true);
  };

  const handleShareDialogClose = () => {
    setShareDialog(false);
  };
  return (
    <DashboardCard rootClass={classes.root}>
      {edit && (
        <Dialog
          PaperProps={{
            className: classes.dialogPaper,
          }}
          open={edit}
          handleClose={handleClose}
        >
          <VendorEventCreationForm
            event={event}
            edit={true}
            handleClose={handleClose}
          />
        </Dialog>
      )}

      {shareDialog && (
        <PostEventCreationDialog
          event={event}
          open={shareDialog}
          onClose={handleShareDialogClose}
        />
      )}

      <Grid container alignItems={"stretch"}>
        <Grid item sm={3} className={classes.imageContainer}>
          <img
            className={classes.eventImage}
            src={event.photoUrl || DEFAULT_EVENT_IMAGE}
          />
        </Grid>

        <Grid className={classes.eventDetailContainer} item sm={9}>
          <Grid container>
            {/* First Row - Event name and Booking Dates */}
            <Grid item sm={10}>
              <Typography className={`${globalClasses.bold} ${classes.title}`}>
                {event.name}
              </Typography>
              <Grid style={{ width: "95%" }}>
                <ReadMore percent={10} text={event.description} />
              </Grid>
            </Grid>

            {/* Date and month section */}
            <Grid
              item
              sm={2}
              container
              className={classes.desktop}
              justify="flex-end"
              style={{
                height: "100%",
              }}
            >
              <Grid className={classes.datesInnerContainer}>
                <EventCardDate
                  classes={classes}
                  startDate={event.startDate}
                  endDate={event.endDate}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Second Row : Event Type and General information */}
          <Grid container>
            <Grid item sm={4} className={classes.generalInfoContainer}>
              <Grid container justify="space-between">
                <Grid>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.greyFont}
                  >
                    {formatEventType(event.type)}
                  </Typography>
                  <Typography className={globalClasses.bold500} gutterBottom>
                    {" "}
                    &#8377; {event.price}
                  </Typography>
                </Grid>

                {/* Date and month section */}
                <Grid
                  className={classes.mobile}
                  style={{
                    height: "100%",
                  }}
                >
                  <Grid className={classes.datesInnerContainer}>
                    <EventCardDate
                      classes={classes}
                      startDate={event.startDate}
                      endDate={event.endDate}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Typography className={`${classes.greyFont} ${classes.seats}`}>
                Sold out seats: {event.orders ? event.orders.length : 0}
                {event.type === EVENT_TYPES.ONE_TIME &&
                  `/${event.totalTickets}`}
              </Typography>
            </Grid>

            <Grid item container sm={4} alignItems="flex-end">
              <Typography className={`${classes.greyFont} ${classes.seats}`}>
                Total Revenue: &#8377;
                {`${
                  parseInt(event.orders ? event.orders.length : 0) *
                  parseInt(event.price)
                }`}
              </Typography>
            </Grid>

            <Grid
              item
              sm={4}
              container
              alignItems="flex-end"
              className={classes.editButtonContainer}
            >
              <Grid>
                <ButtonCapsule
                  buttonStyle={`${globalClasses.bold} ${classes.editButton}`}
                  text="Edit"
                  onClick={handleEdit}
                ></ButtonCapsule>
                <Tooltip title="Share">
                  <Button onClick={handleShareDialog}>
                    <Share />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

export default EventCard;
