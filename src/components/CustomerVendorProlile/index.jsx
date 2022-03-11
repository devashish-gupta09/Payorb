import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { getUser } from "../../services/auth";
import CustomerVendorProfileEvents from "../CustomerVendorProfileEvents";
import PageTitle from "../PageTitle";
import ProfileDetailsSection from "../ProfileDetailsSection";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileImageGallery } from "../ProfileImageGallery";
import ProfileInfoCard from "../ProfileInfoCard";
import ProfilePageCarausel from "../ProfilePageCarausel";
import { ProfileSectionSubNav } from "../ProfileSectionSubNav";
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
          <Grid className={classes.subNavContainer}>
            <Grid>
              <ProfileSectionSubNav />
            </Grid>
          </Grid>
          <Grid container alignItems="stretch">
            <ProfileInfoCard profileData={profileData} vendor={false} />
            <ProfileDetailsSection profileData={profileData} vendor={false} />
          </Grid>
        </Grid>
        <ProfileImageGallery profileData={profileData} vendor={false} />
        <CustomerVendorProfileEvents userUID={profileData.userUID} />
      </Grid>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({
  subNavContainer: {
    position: "absolute",
    width: "100%",
    height: "fit-content",
    paddingLeft: "50%",
    boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.25)",
  },
}));

export default CustomerVendorProfile;
