import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import ReadMore from "../ReadMore";

const starCount = [0, 0, 0, 0];
export const VendorReviewCard = ({ review }) => {
  const classes = styles();
  return (
    <Grid className={classes.infoRowRoot} container>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.eventName}>
          {review.eventName}
        </Typography>
      </Grid>
      <Grid container alignItems="flex-start">
        <Grid
          style={{
            padding: "0.25em",
            width: "12.5%",
          }}
        >
          <Avatar
            src={"/assets/profile.jpg"}
            style={{ width: "2em", height: "2em" }}
          />
        </Grid>
        <Grid className={classes.cardContentContainer}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: "0.5em 0" }}
          >
            <Grid style={{ width: "fit-content", fontWeight: "bold" }}>
              {review.customerName}
            </Grid>
            <Grid
              container
              style={{ width: "fit-content", height: "fit-content" }}
            >
              {starCount.map((star) => (
                <Star style={{ color: "#FFCE31", fontSize: "1.25em" }} />
              ))}
            </Grid>
          </Grid>
          <ReadMore
            className={classes.paragraph}
            text={review.review}
            percent={review.length > 200 ? 10 : 20}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  infoRowRoot: {
    width: "100%",
    boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.25)",
    background: "#FFFFFF",
    height: "fit-content",
    padding: "1.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75em",
    },
  },
  paragraph: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
  cardContentContainer: {
    height: "fit-content",
    width: "87.5%",
    padding: "0 0.45em 0 0.45em",
    [theme.breakpoints.down("sm")]: {
      padding: "0em 1em 0.25em 1.5em",
    },
  },
  eventName: {
    fontWeight: "500",
    paddingBottom: "0.75em",
  },
}));
