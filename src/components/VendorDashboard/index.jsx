import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

import { PAGE_PATHS } from "../../constants/paths";
import { UserAuthDetailsProvider } from "../../context/UserAuthDetailContext";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { getUser } from "../../services/auth";
import { delay } from "../../utils/dateTime";
import { buildVendorDashboardUrl } from "../../utils/url";
import AuthAlertBanner from "../AuthAlertBanner";
import { Context } from "../AuthenticationContext";
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
  const userContext = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState(null);
  const { Alert, showAlert } = useAlertSnackbar();

  const getComponent = (profileData) => {
    if (profileData && profileData.userUID) {
      if (router.query.section) {
        const { vendorId } = router.query;
        switch (router.asPath) {
          case `/vendor/${vendorId}/financials`:
            return <VendorFinancials />;
          case `/vendor/${vendorId}/customers`:
            return <VendorCustomers />;
          case `/vendor/${vendorId}/events/create`:
            return <VendorEventCreationForm />;
          case `/vendor/${vendorId}/events`:
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
  };

  React.useEffect(() => {
    if (router.isReady && userContext.user && userContext.user.uid) {
      const { vendorId } = router.query;
      getUser({ vendorId })
        .then(async (res) => {
          if (res.success) {
            // allowing a user to head to the profile section even if no data exists in the firestore
            if (Object.keys(res.data).length > 0) {
              setProfileData(res.data.vendor);
              setLoading(false);
            } else {
              router.replace(buildVendorDashboardUrl(vendorId));
            }
          } else {
            if (res.data.error) {
              showAlert(
                "User doesn't exist. Please sign up.",
                ALERT_TYPES.ERROR
              );
              await delay(750);
              router.replace(PAGE_PATHS.SIGNUP);
            }
          }
        })
        .catch(async (err) => {
          showAlert("User doesn't exist. Please sign up.", ALERT_TYPES.ERROR);
          await delay(750);
          router.replace(PAGE_PATHS.SIGNUP);
        });
    } else if (userContext.userState === "UNAUTHENTICATED") {
      router.replace(PAGE_PATHS.SIGNUP);
    }
  }, [router, userContext]);

  return (
    <>
      {Alert()}
      {loading ? (
        <FallbackLoading />
      ) : (
        <UserAuthDetailsProvider>
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
