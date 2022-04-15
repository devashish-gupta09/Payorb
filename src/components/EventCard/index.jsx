import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
  Card,
  Link,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";

import { EVENT_TYPES } from "../../constants/events";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import { getEventDate, getEventMonth } from "../../utils/dateTime";
import { formatEventType } from "../../utils/events";
import ButtonCapsule from "../ButtonCapsule";
import CustomConfirmationDialog from "../CustomConfirmationDialog";
import { EventCoverUpload } from "../EventCoverUpload";
import PostEventCreationDialog from "../PostEventCreationDialog";
import ReadMore from "../ReadMore";
import VendorEventCreationForm from "../VendorEventCreationForm";
import { styles } from "./styles";

export function EventCardDate({ classes, startDate, endDate }) {
  return (
    <>
      <Typography
        align="center"
        variant="h6"
        style={{ width: "max-content", margin: "0" }}
      >
        {getEventMonth(startDate, endDate)}
      </Typography>
      <Typography align="center">{`${getEventDate(
        startDate,
        endDate
      )}`}</Typography>
    </>
  );
}

function EventCard({
  event,
  handleEventDelete,
  editable = true,
  isVendor = true,
}) {
  const classes = styles();
  const [edit, setEdit] = React.useState(false);
  const [clone, setClone] = React.useState(false);
  const [shareDialog, setShareDialog] = React.useState(false);

  // const { state } = useUserAuthDetails();
  const [deleteBtn, setDelete] = React.useState(false);
  // const isTabletOrMobile = useMediaQuery({ maxWidth: 900 });
  const handleClone = () => setClone(true);
  const handleCloneFromClose = () => setClone(false);

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

  const handleDeleteCancel = () => {
    setDelete(false);
  };

  const enableDelete = () => {
    setDelete(true);
  };

  const handleEventDeleteConfirmation = async () => {
    await handleEventDelete(event.link);
    setDelete(false);
  };

  console.log(
    `/${event.vendorUserName ? event.vendorUserName : event.userUID}/${
      event.url ? event.url : event.link
    }`
  );

  return (
    <Grid className={classes.root}>
      {clone && (
        <Dialog
          PaperProps={{
            className: classes.dialogPaper,
          }}
          open={clone}
          handleClose={handleCloneFromClose}
        >
          <VendorEventCreationForm
            event={event}
            edit={edit}
            clone={clone}
            handleClose={handleCloneFromClose}
          />
        </Dialog>
      )}
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
            edit={edit}
            clone={clone}
            handleClose={handleClose}
          />
        </Dialog>
      )}

      <CustomConfirmationDialog
        onOk={handleEventDeleteConfirmation}
        onCancel={handleDeleteCancel}
        show={deleteBtn}
        title={"Event Deletion"}
      />

      {shareDialog && (
        <PostEventCreationDialog
          event={event}
          open={shareDialog}
          onClose={handleShareDialogClose}
        />
      )}

      <Card className={classes.cardContainer}>
        <Grid container className={classes.imgContainer}>
          <Grid
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            {event?.coverBannerImages?.length ? (
              <EventCoverUpload
                allowUploads={false}
                croppedImgs={event?.coverBannerImages}
                eventData={event}
                height="15em"
              />
            ) : (
              <img
                src={event?.photoUrl || DEFAULT_EVENT_IMAGE}
                alt="vendor-event"
                className={classes.image}
              />
            )}
          </Grid>
          <Grid container justifyContent="right" className={classes.topBanner}>
            <Button
              size="medium"
              fontSize="medium"
              className={`${classes.topBannerButton} ${classes.cooking}`}
            >
              {event.category
                .split("_")
                .map((x) => x.toLowerCase())
                .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
                .join(" ")}
            </Button>
            <Button className={classes.topBannerButton}>Booking Open</Button>

            {editable ? (
              <Grid className={classes.sideBar}>
                <IconButton
                  size="medium"
                  className={classes.icon}
                  onClick={handleEdit}
                >
                  <CreateIcon style={{ fontSize: "0.75em" }} />
                </IconButton>
                <IconButton size="medium" className={classes.icon}>
                  {" "}
                  <DeleteOutlineIcon
                    style={{ fontSize: "0.75em" }}
                    className={`${classes.deleteIcon}`}
                    onClick={enableDelete}
                    disabled={event.orders.length > 0}
                  />
                </IconButton>
                <IconButton
                  size="medium"
                  className={classes.icon}
                  onClick={handleClone}
                >
                  {" "}
                  <AddToPhotosIcon
                    style={{ fontSize: "0.75em" }}
                    className={`${classes.AddToPhotosIcon}`}
                  />
                </IconButton>
                <IconButton
                  size="medium"
                  className={classes.icon}
                  onClick={handleShareDialog}
                >
                  <ShareIcon
                    style={{ fontSize: "0.75em" }}
                    className={`${classes.shareIcon}`}
                  />
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
          <Grid container className={classes.dateAndTime}>
            <Grid item xs={6} container alignItems="center">
              <img src="/assets/vendorEventsCard/calender.svg"></img>
              <Typography style={{ paddingLeft: "0.25em" }}>
                {getEventDate(event.startDate, event.endDate)}
              </Typography>
            </Grid>
            <Grid item xs={6} container alignItems="center">
              <AccessTimeIcon />
              <Typography style={{ paddingLeft: "0.25em" }}>
                12:00 PM - 2:00 PM
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            item
            sm={editable ? 12 : 10}
            container
            justify={"space-between"}
            className={classes.textContainer}
          >
            <Grid container justify={"space-between"}>
              <Grid item xs={8}>
                <Typography className={classes.headline}>
                  {event.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.cost}>
                  {event.trialClass ? (
                    "Trial Class"
                  ) : (
                    <>&#8377; {event.price}</>
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Typography className={classes.descriptionText}>
              <ReadMore
                percent={20}
                text={event.description}
                className={classes.descriptionText}
              />
            </Typography>

            <Grid
              container
              justify={"space-between"}
              className={classes.bottomTextContainer}
            >
              <Grid item xs={4}>
                <Typography className={classes.bottomText}>
                  Event Type <br />
                  {formatEventType(event.type)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.bottomText}>
                  Sold out Seats
                  <br /> {event.orders ? event.orders.length : 0}
                  {event.type === EVENT_TYPES.ONE_TIME &&
                    `/${event.totalTickets}`}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.bottomText}>
                  Total Revenue <br />{" "}
                  <span style={{ color: "#0061FE" }}>
                    &#8377; {`${event.revenue ? event.revenue : "0.0"}`}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {!editable && !isVendor ? (
            <Grid
              item
              sm={2}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Link
                href={`/${
                  event.vendorUserName ? event.vendorUserName : event.userUID
                }/${event.url ? event.url : event.link}`}
              >
                <ButtonCapsule text={"Book"} buttonStyle={classes.bookButton} />
              </Link>
            </Grid>
          ) : null}
        </Grid>
      </Card>
    </Grid>
  );
}

export default EventCard;
