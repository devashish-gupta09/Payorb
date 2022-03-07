import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { useRouter } from "next/router";
import React from "react";
import Carousel from "react-material-ui-carousel";

import { appColors } from "../../../styles/colors";
import { globalStyles } from "../../../styles/globalStyles";
import { ALERT_TYPES } from "../../constants/alerts";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getReviewsForVendor } from "../../services/review";
import { getTimeDiff } from "../../utils/dateTime";
import DashboardCard from "../DashboardCard";
import ReadMore from "../ReadMore";
import { VendorReviewCard } from "../VendorReviewCard";

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
      <DashboardCard>
        {Alert()}
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: "0.5em" }}
        >
          <CircularProgress size={"1.5em"} style={{ color: "#8eeceb" }} />
        </Grid>
      </DashboardCard>
    );
  }

  if (reviews) {
    return (
      <Grid>
        {Alert()}
        <Grid container style={{ minHeight: "400px" }}>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <Grid item sm={6} className={classes.infoRowCard} key={index}>
                  <VendorReviewCard review={review} />
                </Grid>
              );
            })
          ) : (
            <Typography>No Reviews</Typography>
          )}
        </Grid>

        <Carousel
          autoPlay={false}
          IndicatorIcon={<Grid></Grid>}
          indicatorIconButtonProps={{
            className: `${classes.carouselIndicatorIcon}`,
          }}
          activeIndicatorIconButtonProps={{
            className: `${classes.activeIndicator}`,
          }}
        >
          {reviews.map((feature, index) => {
            return (
              <Grid
                style={{ height: "20em", width: "100%", background: "yellow" }}
              />
            );
          })}
        </Carousel>

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
      </Grid>
    );
  }
}

const styles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  infoRowCard: {
    width: "100%",
    boxShadow: "0 0 5px 0 rgba(0,0,0,0.25)",
    [theme.breakpoints.down("sm")]: {
      // padding: "1em",
      fontSize: "0.75em",
    },
  },
  reviewerLabel: {
    color: appColors.grey,
    paddingTop: "0.5em",
    reviewTime: {},
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  carouselIndicatorIcon: {
    [theme.breakpoints.down("sm")]: {
      borderRadius: "50%",
      height: "0.5em",
      width: "0.5em",
      marginRight: "0.2em",
      backgroundColor: "#DCDCDC",
    },
  },
  activeIndicator: {
    backgroundColor: "#00D4FF",
  },
  indicatorButtonContainer: {
    [theme.breakpoints.down("sm")]: {
      // marginTop: "-3em",
    },
  },
}));

export default ProfileReviewSection;
