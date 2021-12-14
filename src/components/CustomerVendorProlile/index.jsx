import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { getUser } from "../../services/auth";
import CustomerVendorProfileEvents from "../CustomerVendorProfileEvents";
import PageTitle from "../PageTitle";
import ProfileDetailsSection from "../ProfileDetailsSection";
import ProfileInfoCard from "../ProfileInfoCard";
import ProfilePageCarausel from "../ProfilePageCarausel";
import SkeletonLoading from "../SkeletonLoading";

function CustomerVendorProfile({ userUID }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState();

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
        <ProfileInfoCard profileData={profileData} vendor={false} />
        <ProfileDetailsSection profileData={profileData} vendor={false} />
        {profileData.carauselAssets &&
        profileData.carauselAssets.length &&
        profileData.carauselAssets.filter((a) => a.link && a.type).length ? (
          <ProfilePageCarausel profileData={profileData} vendor={false} />
        ) : null}
        <CustomerVendorProfileEvents userUID={profileData.userUID} />
      </Grid>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({}));

export default CustomerVendorProfile;
