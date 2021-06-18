import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

import { PAGE_PATHS } from "../../constants/paths";
import { UserAuthDetailsProvider } from "../../context/UserAuthDetailContext";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getUser } from "../../services/auth";
import { delay } from "../../utils/dateTime";
import AuthAlertBanner from "../AuthAlertBanner";
import VendorDashboardHeader from "../DashboardHeader";
import FallbackLoading from "../FallbackLoading";
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

  const getComponent = (profileData) => {
    console.log("Inside vendor component:", router.query.section);

    if (router.query.vendorId) {
      if (router.query.section) {
        switch (router.query.section[0]) {
          case "financials":
            return <VendorFinancials />;
          case "customers":
            return <VendorCustomers />;
          case PAGE_PATHS.VENDOR_DASHBOARD_CREATE_EVENT:
            return <VendorEventCreationForm />;
          case "events":
            return <VendorEvents />;
          default:
            return (
              <FallbackPage
                title="Page Not Found"
                subtitle="Try refreshing your page or return to home"
              />
            );
        }
      } else {
        return <Profile profileData={profileData} />;
      }
    }

    return null;
  };

  React.useEffect(() => {
    
    getUser()
      .then(async (res) => {
        if (res.success) {
          // allowing a user to head to the profile section even if no data exists in the firestore
          if (Object.keys(res.data).length > 0) {
            setProfileData(res.data);
            setLoading(false);
          } else {
            router.push(`/vendor`);
          }
        } else {
          if (res.data.error) {
            showAlert("User doesn't exist. Please sign up.", ALERT_TYPES.ERROR);
            await delay(750);
            router.push(PAGE_PATHS.SIGNUP);
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
        <FallbackLoading />
      ) : (
        <UserAuthDetailsProvider>
          {Alert()}
          <Grid>
            <VendorDashboardHeader profileData={profileData} />
            <AuthAlertBanner />
            <VendorDashboardContainer>
              {getComponent(profileData)}
            </VendorDashboardContainer>
          </Grid>
        </UserAuthDetailsProvider>
      )}
    </>
  );
}

export default VendorDashboard;
