import { Grid, makeStyles, Typography } from "@material-ui/core";
import { WorkOutline } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import { getUser } from "../../services/auth";
import { buildVendorDashboardUrl } from "../../utils/url";
import ButtonCapsule from "../ButtonCapsule";

function EventBookingVendorCard({ vendorId }) {
  const classes = styles();
  const router = useRouter();
  const [vendor, setVendor] = React.useState();

  const handleViewProfile = () => {
    if (vendor.userUID) {
      router.push(buildVendorDashboardUrl(vendor.username || vendor.userUID));
    }
  };

  React.useEffect(() => {
    // API call to get vendor details
    getUser({ vendorId })
      .then((res) => {
        if (res.data.vendor) {
          setVendor(res.data.vendor);
        } else {
          throw new Error("Error fetching vendor");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <Grid className={classes.root}>
      {vendor ? (
        <>
          <Grid container>
            <Grid
              item
              xs={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <img
                className={classes.profile}
                src={
                  vendor.profileImgUrl ??
                  "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
                }
                alt=""
              />
            </Grid>
            <Grid item xs={9} style={{ padding: "0 1em 0 1em" }}>
              <Typography fullWidth className={classes.name} gutterBottom>
                {vendor.name}
              </Typography>
              <Grid container style={{ padding: "0.75em 0" }}>
                <WorkOutline className={classes.occupationIcon} />
                <Typography className={classes.occupation}>
                  {vendor.occupation}
                </Typography>
              </Grid>
              <Grid item sm={12} className={classes.profileButtonContainer}>
                <ButtonCapsule
                  text={`Profile`}
                  onClick={handleViewProfile}
                  buttonStyle={classes.profileButton}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "0  0 0 0",
  },
  profile: {
    width: "100%",
    maxHeight: "7.5em",
    borderRadius: "50%",
  },
  name: {
    fontSize: "1.25em",
    fontWeight: "500",
  },
  occupation: {
    width: "fit-content",
  },
  occupationIcon: {
    paddingRight: "0.25em",
  },
  occupationContainer: {
    padding: "0.5em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0.25em 0",
    },
  },
  view: {
    width: "100%",
  },
  profileButton: {
    padding: "0.5em 1.5em",
    fontSize: "1em",
  },
  profileButtonContainer: {
    padding: "1em 0.5em 0 0.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.25em 0.5em 0 0.5em",
    },
  },
}));

export default EventBookingVendorCard;
