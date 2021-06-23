import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { getUser } from "../../services/auth";
import { buildVendorDashboardUrl } from "../../utils/url";
import ButtonCapsule from "../ButtonCapsule";

function EventBookingVendorCard({ vendorId }) {
  const classes = styles();
  const router = useRouter();
  const [vendor, setVendor] = React.useState();
  const globalClasses = globalStyles();

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
          <Grid container justify="center" spacing={3}>
            <Grid item sm={12} container justify="center">
              <img
                className={classes.profile}
                src={
                  vendor.profileImgUrl ??
                  "https://firebasestorage.googleapis.com/v0/b/payorb-92ef0.appspot.com/o/assets%2Fprofile.jpg?alt=media&token=eea58cd4-50ea-4525-93fb-e7fe83350b59"
                }
                alt=""
              />
            </Grid>
            <Grid item sm={12} container justify="center">
              <Typography
                variant="h6"
                fullWidth
                className={globalClasses.bold500}
              >
                {vendor.name}
              </Typography>
              <Typography className={classes.occupation}>
                {vendor.occupation}
              </Typography>
            </Grid>
            <Grid item sm={12} container justify="center">
              <ButtonCapsule
                text={`View Profile`}
                onClick={handleViewProfile}
              />
            </Grid>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "1em 0",
  },
  profile: {
    minHeight: "100%",
    maxHeight: "7.5em",
    borderRadius: "50%",
  },
  occupation: {
    color: "#828282",
    width: "100%",
    textAlign: "center",
  },
  view: {
    width: "100%",
  },
}));

export default EventBookingVendorCard;
