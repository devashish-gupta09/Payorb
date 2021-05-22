import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import LandingHeader from "../LandingHeader";
import PolicyList from "../PolicyList";
import PolicyPrivacy from "../PolicyPrivacy";
import PolicyTermsAndConds from "../PolicyTermsAndConds";
import PolicyUserAgreement from "../PolicyUserAgreement";

import DashboardContainer from "../VendorDashboardContainer";

function PolicyView() {
  const router = useRouter();

  const getComponent = () => {
    switch (router.asPath) {
      case PAGE_PATHS.POLICIES:
        return <PolicyList />;
      case PAGE_PATHS.POLICY_TERMS_AND_CONDS:
        return <PolicyTermsAndConds />;
      case PAGE_PATHS.POLICY_PRIVACY:
        return <PolicyPrivacy />;
      case PAGE_PATHS.POLICY_USER_AGREE:
        return <PolicyUserAgreement />;
      default:
        return;
    }
  };

  return (
    <Grid>
      <LandingHeader />
      <DashboardContainer>{getComponent()}</DashboardContainer>
    </Grid>
  );
}

export default PolicyView;
