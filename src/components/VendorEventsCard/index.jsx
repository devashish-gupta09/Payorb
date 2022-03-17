import React from "react";
import { Button, Grid, makeStyles, Typography, Card } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function VendorEventsCard({ image, headline, description, date }) {
  const classes = styles();
  return (
    <Card className={classes.cardContainer}>
      <img
        src="https://media-exp1.licdn.com/dms/image/C561BAQE-51J-8KkMZg/company-background_10000/0/1548357920228?e=2147483647&v=beta&t=wrOVYN8qrGon9jILrMQv78FsyOV4IMQxr_3UjYtUREI"
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
            />
            <AddToPhotosIcon
              className={`${classes.icon} ${classes.AddToPhotosIcon}`}
            />
            <ShareIcon className={`${classes.icon} ${classes.shareIcon}`} />
          </Grid>
        </Grid>
        <Grid container className={classes.dateAndTime}>
          <Grid item xs={6}>
            <Typography className={classes.bottomText}>
              17 December 2021
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.bottomText}>
              12:00 PM - 2:00 PM
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
              UX India Workshop
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.cost}>₹ 500.00</Typography>
          </Grid>
        </Grid>
        <Typography className={classes.descriptionText}>
          In this class you will learn a few different yummy eggless Christmas
          cake balls Super presents for the holidays. <a>Show More</a>
        </Typography>

        <Grid
          container
          justify={"space-between"}
          className={classes.bottomTextContainer}
        >
          <Grid item xs={4}>
            <Typography className={classes.bottomText}>
              Event Type <br /> One Time
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.bottomText}>
              Sold out Seats
              <br /> 10/20
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.bottomText}>
              Total Revenue <br /> ₹ 25,000.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

const styles = makeStyles((theme) => ({
  cardContainer: {
    width: "25em"
  },
  headline: {
    fontWeight: "bold",
    fontSize: "1em"
  },
  textContainer: {
    padding: "0.4em 1em 0.6em 1.2em"
  },
  descriptionText: {
    fontSize: "0.7em",
    marginTop: "0.24em"
  },
  cost: {
    float: "right",
    fontWeight: "bold",
    fontSize: "1em"
  },
  bottomTextContainer: {
    marginTop: "0.5em"
  },
  bottomText: {
    fontSize: "0.6em",
    marginTop: "0.5em",
    fontWeight: "bold"
    //textAlign: "center"
  },
  topBannerButton: {
    borderRadius: "2em",
    background: "#008EFF",
    fontSize: "0.5em",
    color: "white",
    height: "2.5em"
  },
  cooking: {
    background: "#1ECE7A"
    // right: "74%"
  },
  topBanner: {
    position: "absolute",
    top: "1em",
    justifyContent: "right",
    right: "24em",
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
    color: "white"
  },
  dateAndTime: {
    color: "#68FDF3",
    background: "rgba(0,0,0,0.5)",
    marginTop: "-1.5em",
    marginBottom: "0.3em",
    //left
    padding: "0 0.5em 0 0.5em"
  },
  icon: {
    background: "white",
    color: "#008EFF",
    borderRadius: "2em",
    fontSize: "medium",
    padding: "0.2em",
    marginTop: "0.2em"
  },
  deleteIcon: {
    color: "#FC6767"
  },
  AddToPhotosIcon: {
    color: "#FFB648"
  },
  shareIcon: {
    color: "#1ECE7A"
  }
}));
export default VendorEventsCard;
