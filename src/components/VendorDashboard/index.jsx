import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import { getUser } from "../../services/auth";
import VendorDashboardHeader from "../DashboardHeader";
import FallbackPage from "../FallbackPage";
import Profile from "../Profile";
import VendorCustomers from "../VendorCustomers";
import VendorDashboardContainer from "../VendorDashboardContainer";
import VendorEventCreationForm from "../VendorEventCreationForm";
import VendorEvents from "../VendorEvents";
import VendorFinancials from "../VendorFinancials";

function VendorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState(null);

  const getComponent = (route, profileData) => {
    switch (route) {
      case PAGE_PATHS.VENDOR_DASHBOARD_PROFILE:
        return <Profile profileData={profileData} />;
      case PAGE_PATHS.VENDOR_DASHBOARD_FINANCIALS:
        return <VendorFinancials />;
      case PAGE_PATHS.VENDOR_DASHBOARD_CUSTOMERS:
        return <VendorCustomers />;
      case PAGE_PATHS.VENDOR_DASHBOARD_CREATE_EVENT:
        return <VendorEventCreationForm />;
      case PAGE_PATHS.VENDOR_DASHBOARD_EVENTS:
        return <VendorEvents />;
      default:
        return (
          <FallbackPage
            title="Page Not Found"
            subtitle="Try refreshing your page or return to home"
          />
        );
    }
  };

  React.useEffect(() => {
    getUser()
      .then((res) => {
        if (res.data) {
          // allowing a user to head to the profile section even if no data exists in the firestore
          if (Object.keys(res.data).length > 0) {
            setProfileData(res.data);
            setLoading(false);
          } else {
            router.push(`${PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}`);
          }
        } else {
          router.push("/signup");
        }
      })
      .catch((err) => {
        console.error("Error getting profile data", err.message);
        router.back();
      });
  }, []);

  return (
    <>
      {loading ? (
        <Backdrop open>
          <Grid>
            <Typography variant="h3" style={{ color: "white" }}>
              {"Loading"}
            </Typography>
            <CircularProgress size="3rem" variant="indeterminate" />
          </Grid>
        </Backdrop>
      ) : (
        <Grid>
          <VendorDashboardHeader profileData={profileData} />
          <VendorDashboardContainer>
            {getComponent(router.asPath, profileData)}
          </VendorDashboardContainer>
        </Grid>
      )}
    </>
  );
}

export default VendorDashboard;
