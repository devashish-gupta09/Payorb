import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Card,
} from "@material-ui/core";
import { DeleteRounded, Share, FileCopy } from "@material-ui/icons";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { globalStyles } from "../../../styles/globalStyles";
import { EVENT_TYPES } from "../../constants/events";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import { useUserAuthDetails } from "../../context/UserAuthDetailContext";
import { getEventDate, getEventMonth } from "../../utils/dateTime";
import { formatEventType, isEventPastDate } from "../../utils/events";
import { isPaymentDetailsIncomplete } from "../../utils/vendor";
import AuthAlertGrid from "../AuthAlertGrid";
import ButtonCapsule from "../ButtonCapsule";
import CustomConfirmationDialog from "../CustomConfirmationDialog";
import DashboardCard from "../DashboardCard";
import EventImageContainer from "../EventImageContainer/Index";
import PostEventCreationDialog from "../PostEventCreationDialog";
import ReadMore from "../ReadMore";
import VendorEventCreationForm from "../VendorEventCreationForm";
import { styles } from "./styles";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

function EventCard({ event, handleEventDelete }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const [edit, setEdit] = React.useState(false);
  const [clone, setClone] = React.useState(false);
  const [shareDialog, setShareDialog] = React.useState(false);
  const { state } = useUserAuthDetails();
  const [deleteBtn, setDelete] = React.useState(false);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 900 });
  console.log(state);
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

  return (
    <DashboardCard rootClass={classes.root}>
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
      <Grid container width={"100vw"} justify={"center"}>
     
        <Card className={classes.cardContainer}>
          
        <img
            src={event.photoUrl || "/assets/vendorEventsCard/defaultImg.svg"}
            alt="vendor-event"
            width="400em"
          />

      <Grid container className={classes.imgContainer}>
        <Grid container justifyContent="right" className={classes.topBanner}>
          <Button className={`${classes.topBannerButton} ${classes.cooking}`}>
            Cooking
          </Button>
          <Button className={classes.topBannerButton}>Booking Open</Button>
          <Grid className={classes.sideBar}>
            <MoreVertIcon />

            <CreateIcon className={classes.icon} />

                    <DeleteOutlineIcon
                      className={`${classes.icon} ${classes.deleteIcon}`}
                      onClick={enableDelete}
                      disabled={event.orders.length > 0}
                    />

                    <AddToPhotosIcon
                      className={`${classes.icon} ${classes.AddToPhotosIcon}`}
                      onClick={handleClone}
                    />

                    <ShareIcon className={`${classes.icon} ${classes.shareIcon}`}
                    onClick={handleShareDialog} />
                  


            {state &&
              state.details &&
              !isPaymentDetailsIncomplete(state.details) ? (
                !isEventPastDate(event) ? (
                  <Grid>
                    <CreateIcon className={classes.icon} />

                    <DeleteOutlineIcon
                      className={`${classes.icon} ${classes.deleteIcon}`}
                      onClick={enableDelete}
                      disabled={event.orders.length > 0}
                    />

                    <AddToPhotosIcon
                      className={`${classes.icon} ${classes.AddToPhotosIcon}`}
                      onClick={handleClone}
                    />

                    <ShareIcon className={`${classes.icon} ${classes.shareIcon}`}
                    onClick={handleShareDialog} />
                  
                  </Grid>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CreateIcon className={classes.icon} />
                    <DeleteOutlineIcon className={`${classes.icon} ${classes.deleteIcon}`} />
                    <AddToPhotosIcon className={`${classes.icon} ${classes.AddToPhotosIcon}`}/>
                    <ShareIcon className={`${classes.icon} ${classes.shareIcon}`}/>
                  </div>
                )
              ) : null}

                  
                 
          </Grid>
        </Grid>
        <Grid container className={classes.dateAndTime}>
          <Grid item xs={6}>
          
            <Typography className={classes.bottomText}>
            <img src="/assets/vendorEventsCard/calender.svg" width={"15em"} style={{marginRight:"0.5em"}}></img>
      
                {` ${"  "} ${getEventDate(
                  event.startDate,
                  event.endDate
                )}`}   {getEventMonth(event.startDate, event.endDate)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.bottomText}>
            <img src="/assets/vendorEventsCard/time.svg" width={"17em"} style={{marginRight:"0.5em"}}></img>
              {"  "}
              {new Date(
                      Date.parse(event.startDate)
                    ).toLocaleTimeString(
                      [],
                      {
                        hour: '2-digit', minute: '2-digit'
                      }
                    )} {" - "}  {new Date(
                      Date.parse(event.endDate)
                    ).toLocaleTimeString(
                      [],
                      {
                        hour: '2-digit', minute: '2-digit'
                      }
                    )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>


      <Grid
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
            <Typography className={classes.cost}>{event.trialClass ? "Trial Class" : <>&#8377; {event.price}</>}</Typography>
          </Grid>
        </Grid>
        <Typography className={classes.descriptionText}>
            <ReadMore percent={50} text={event.description} className={classes.descriptionText} />
        </Typography>

        <Grid
          container
          justify={"space-between"}
          className={classes.bottomTextContainer}
        >
          <Grid item xs={4}>
            <Typography className={classes.bottomText}>
              Event Type <br />{formatEventType(event.type)}
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
              Total Revenue <br /> {`${event.revenue ? event.revenue : "0.0"}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
        </Card>
       
        <Grid container item sm={12}>
            {state && state.details ? (
              <AuthAlertGrid details={state.details} />
            ) : null}
          </Grid>
      </Grid>
    {/* {  <Grid container alignItems={"stretch"}>
        <Grid item sm={3} className={classes.imageContainer}>
          <EventImageContainer url={event.photoUrl || DEFAULT_EVENT_IMAGE} />      
        </Grid> 

        <Grid className={classes.eventDetailContainer} item sm={9}>             
          <Grid container>
            {/* First Row - Event name and Booking Dates 
            <Grid item sm={10} style={{ width: "100%" }}>
              <Typography className={`${globalClasses.bold} ${classes.title}`}>
                {event.name}
              </Typography>
              <Grid style={{ width: "95%", whiteSpace: "pre-line" }}>
                <ReadMore percent={10} text={event.description} />
              </Grid>
            </Grid>
            */ }

            {/* Date and month section 
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
          <Grid container>
            <Grid item sm={3} className={classes.generalInfoContainer}>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.greyFont}
              >
                {"Event Type"}
              </Typography>
              <Typography className={globalClasses.bold500} gutterBottom>
                {formatEventType(event.type)}
              </Typography>
            </Grid>
            <Grid item sm={3} className={classes.generalInfoContainer}>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.greyFont}
              >
                {"Regular Price"}
              </Typography>
              <Typography className={globalClasses.bold800} gutterBottom>
                {event.trialClass ? "Trial Class" : <>&#8377; {event.price}</>}
              </Typography>
            </Grid>
            {event.earlyBird ? (
              <>
                <Grid item sm={3} className={classes.generalInfoContainer}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.greyFont}
                  >
                    {"Early Bird Price"}
                  </Typography>
                  <Typography className={globalClasses.bold500} gutterBottom>
                    {event.trialClass ? (
                      "Trial Class"
                    ) : (
                      <>&#8377; {event.earlyBirdPrice}</>
                    )}
                  </Typography>
                </Grid>
                <Grid item sm={3} className={classes.generalInfoContainer}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.greyFont}
                  >
                    {"Early Bird Deadline"}
                  </Typography>
                  <Typography className={globalClasses.bold500} gutterBottom>
                    {new Date(
                      Date.parse(event.earlyBirdDeadline)
                    ).toLocaleString("en-GB", {
                      hour12: true,
                    })}
                  </Typography>
                </Grid>
              </>
            ) : null}
          </Grid>

          {/* third Row : Event Type and General information 
          <Grid container>
            <Grid item container sm={8} xs={8} md={8} lg={8} xl={8}>
              <Grid
                container
                item
                sm={12}
                xs={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.generalInfoContainer}
              >
                <Typography className={`${classes.greyFont} ${classes.seats}`}>
                  Sold out seats: {event.orders ? event.orders.length : 0}
                  {event.type === EVENT_TYPES.ONE_TIME &&
                    `/${event.totalTickets}`}
                </Typography>
              </Grid>

              <Grid
                item
                container
                sm={12}
                xs={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.generalInfoContainer}
              >
                <Typography className={`${classes.greyFont} ${classes.seats}`}>
                  Total Revenue: &#8377;
                  {`${event.revenue ? event.revenue : "0.0"}`}
                </Typography>
              </Grid>
            </Grid>
            {isTabletOrMobile ? (
              <Grid item container sm={4} xs={4} md={0} lg={0} xl={0}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
              </Grid>
            ) : null}
            <Grid
              item
              sm={4}
              container
              alignItems="flex-end"
              className={classes.editButtonContainer}
            >
              {state &&
              state.details &&
              !isPaymentDetailsIncomplete(state.details) ? (
                !isEventPastDate(event) ? (
                  <Grid>
                    <ButtonCapsule
                      buttonStyle={`${globalClasses.bold} ${classes.editButton}`}
                      text="Edit"
                      onClick={handleEdit}
                    ></ButtonCapsule>
                    <Tooltip title="Share">
                      <IconButton onClick={handleShareDialog}>
                        <Share />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={enableDelete}
                        disabled={event.orders.length > 0}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Clone">
                      <IconButton onClick={handleClone}>
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button disabled>Event Completed</Button>
                    <Tooltip title="Clone">
                      <IconButton onClick={handleClone}>
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                  </div>
                )
              ) : null}
            </Grid>
          </Grid>

          <Grid container item sm={12}>
            {state && state.details ? (
              <AuthAlertGrid details={state.details} />
            ) : null}
          </Grid>
        </Grid>
      </Grid>} */}
    </DashboardCard>
  );
}



export default EventCard;
