import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { useRouter } from "next/router";
import React from "react";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getReviewsForVendor } from "../../services/review";
import { getTimeDiff } from "../../utils/dateTime";
import DashboardCard from "../DashboardCard";
import ReadMore from "../ReadMore";

function ProfileReviewSection(props) {
  const classes = styles();
  const globalClasses = globalStyles();
  const [reviews, setReviews] = React.useState();
  const [lastDoc, setLastDoc] = React.useState();
  const [loadMore, setLoadMore] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      getReviewsForVendor({ vendorId: router.query.vendorId, limit: "5" })
        .then((res) => {
          if (res.success) {
            setReviews(res.data.reviews);
            setLastDoc(res.data.lastReview);
          } else {
            showAlert(res.error);
          }
        })
        .catch((err) => {
          showAlert(err.error || err.message, ALERT_TYPES.ERROR);
        });
    }
  }, [router]);

  const handleLoadMore = async () => {
    setLoadMore(true);
    try {
      if (lastDoc) {
        const res = await getReviewsForVendor({
          limit: "1",
          startFrom: lastDoc,
          vendorId: router.query.vendorId,
        });
        setReviews([...reviews, ...res.data.reviews]);
        setLastDoc(res.data.lastReview);
      } else {
        showAlert("You are all caught up on reviews.");
      }
    } catch (err) {
      showAlert(err.error || err.message, ALERT_TYPES.ERROR);
    }
    setLoadMore(false);
  };

  if (!reviews) {
    return (
      <DashboardCard rootClass={classes.root}>
        {Alert()}
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: "0.5em" }}
        >
          <CircularProgress size={"1.5em"} style={{ color: "white" }} />
        </Grid>
      </DashboardCard>
    );
  }

  if (reviews) {
    return (
      <DashboardCard rootClass={classes.root}>
        {Alert()}
        <Grid container style={{ maxHeight: "400px", overflowY: "auto" }}>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <Grid container className={classes.infoRow} key={index}>
                  <Grid container item xs={10}>
                    <Grid className={classes.infoRowRoot}>
                      <ReadMore percent={10} text={review.review}></ReadMore>
                      <Typography
                        className={`${globalClasses.bold500} ${classes.reviewerLabel}`}
                      >
                        {review.customerName}
                      </Typography>

                      <Typography
                        className={`${globalClasses.bold500} ${classes.reviewerLabel}`}
                      >
                        {review.eventName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="right" className={classes.reviewTime}>
                      {getTimeDiff(review.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Typography>No Reviews</Typography>
          )}
        </Grid>
        <Grid container justify="flex-end" style={{ paddingRight: "0.5em" }}>
          {reviews.length > 4 ? (
            <Button onClick={handleLoadMore} variant="outlined">
              {loadMore ? (
                <CircularProgress
                  size={"1.5em"}
                  style={{ marginRight: "0.5em" }}
                />
              ) : null}{" "}
              Load More
            </Button>
          ) : null}
        </Grid>
      </DashboardCard>
    );
  }
}

const styles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  root: {
    borderRadius: "0.8em",
    padding: "1.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0",
    },
  },
  infoRowRoot: { paddingLeft: "1em", width: "80%" },
  infoRow: {
    padding: "1em 0",
    width: "100%",
    borderBottom: "2px solid",
    borderColor: "grey",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
      fontSize: "0.75em",
    },
  },
  reviewerLabel: {
    color: appColors.grey,
    paddingTop: "0.5em",
  },
  reviewTime: {
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
}));

export default ProfileReviewSection;
