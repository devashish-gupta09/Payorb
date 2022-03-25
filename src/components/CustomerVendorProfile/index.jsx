import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { getUser } from "../../services/auth";
import PageTitle from "../PageTitle";
import ProfileDetailsSection from "../ProfileDetailsSection";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileImageGallery } from "../ProfileImageGallery";
import ProfileInfoCard from "../ProfileInfoCard";
import { ProfileNavBar } from "../ProfileNavBar";
import ProfileReviewSection from "../ProfileReviewSection";
import SkeletonLoading from "../SkeletonLoading";

function CustomerVendorProfile({ userUID }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState();
  const classes = styles();

  React.useEffect(() => {
    getUser({ vendorId: router.query.vendorId })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setProfileData(res.data.vendor);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (profileData && profileData.userUID) {
    return (
      <Grid>
        <PageTitle title="Payorb | Profile" />
        <ProfileHeader profileData={profileData} vendor={false} />
        <Grid style={{ position: "relative" }}>
          <Grid className={classes.navbarDesktop}>
            <ProfileNavBar vendor={false} />
          </Grid>
          <Grid container alignItems="stretch">
            <ProfileInfoCard profileData={profileData} vendor={false} />
            <Grid className={classes.navbarMobile}>
              <ProfileNavBar vendor={false} />
            </Grid>
            <ProfileDetailsSection profileData={profileData} vendor={false} />
          </Grid>
        </Grid>
        <div id="gallery">
          <ProfileImageGallery profileInfo={profileData} vendor={false} />
        </div>
        <div id="review">
          <ProfileReviewSection />
        </div>

        {/* To be done! */}
        {/* <CustomerVendorProfileEvents userUID={profileData.userUID} /> */}
      </Grid>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({
  navbarMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
      boxShadow: "0 6px 8px -8px rgb(0 0 0 / 25%)",
    },
  },
  navbarDesktop: {
    position: "absolute",
    width: "100%",
    height: "fit-content",
    paddingLeft: "45%",
    boxShadow: "0 6px 8px -8px rgb(0 0 0 / 25%)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default CustomerVendorProfile;
