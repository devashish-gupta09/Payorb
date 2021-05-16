import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import useFetchVendor from "../../hooks/useFetchVendor";
import CustomerVendorProfileEvents from "../CustomerVendorProfileEvents";
import ProfileDetailsSection from "../ProfileDetailsSection";
import ProfileInfoCard from "../ProfileInfoCard";
import SkeletonLoading from "../SkeletonLoading";

function CustomerVendorProfile({ userUID }) {
  const { data: vendor, loading: vendorLoading } = useFetchVendor(
    userUID,
    false
  );

  if (vendorLoading) {
    return <SkeletonLoading />;
  }

  if (vendor) {
    return (
      <Grid>
        <ProfileInfoCard profileData={vendor} vendor={false} />
        <ProfileDetailsSection profileData={vendor} vendor={false} />
        <CustomerVendorProfileEvents userUID={userUID} />
      </Grid>
    );
  }

  return <h1>Something went wrong</h1>;
}

const styles = makeStyles((theme) => ({}));

export default CustomerVendorProfile;
