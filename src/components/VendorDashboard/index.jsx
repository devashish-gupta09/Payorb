import { Backdrop, CircularProgress, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getUser } from "../../services/auth";
import { delay } from "../../utils/dateTime";
import AuthAlertBanner from "../AuthAlertBanner";
import AlertBanner from "../AuthAlertBanner";
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
  const { Alert, showAlert } = useAlertSnackbar();

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
      .then(async (res) => {
        console.log(res);
        if (res.success) {
          // allowing a user to head to the profile section even if no data exists in the firestore
          if (Object.keys(res.data).length > 0) {
            console.log(res.data);
            setProfileData(res.data);
            setLoading(false);
          } else {
            router.push(`${PAGE_PATHS.VENDOR_DASHBOARD_PROFILE}`);
          }
        } else {
          if (res.data.error) {
            showAlert("User doesn't exist. Please sign up.", ALERT_TYPES.ERROR);
            await delay(750);
            router.push("/signup");
          }
        }
      })
      .catch((err) => {
        console.error("Error getting profile data", err);
        router.back();
      });
  }, []);

  return (
    <>
      {loading ? (
        <Backdrop style={{ background: "#BDF5F2" }} open>
          {Alert()}
          <Grid>
            <CircularProgress
              size="3rem"
              variant="indeterminate"
              style={{ color: "white" }}
            />
          </Grid>
        </Backdrop>
      ) : (
        <Grid>
          <VendorDashboardHeader profileData={profileData} />
          <AuthAlertBanner />
          <VendorDashboardContainer>
            {getComponent(router.asPath, profileData)}
          </VendorDashboardContainer>
        </Grid>
      )}
    </>
  );
}

export default VendorDashboard;
