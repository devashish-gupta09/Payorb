import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { getUser } from "../../services/auth";
import CustomerVendorProfileEvents from "../CustomerVendorProfileEvents";
import ProfileDetailsSection from "../ProfileDetailsSection";
import ProfileInfoCard from "../ProfileInfoCard";
import SkeletonLoading from "../SkeletonLoading";

function CustomerVendorProfile({ userUID }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState();

  React.useEffect(() => {
    getUser(router.query.vendorId)
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
        <ProfileInfoCard profileData={profileData} vendor={false} />
        <ProfileDetailsSection profileData={profileData} vendor={false} />
        <CustomerVendorProfileEvents userUID={userUID} />
      </Grid>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({}));

export default CustomerVendorProfile;
