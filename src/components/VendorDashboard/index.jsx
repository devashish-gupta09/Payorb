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
import { AppFooter } from "../AppFooter";
import { Context } from "../AuthenticationContext";
import VendorDashboardHeader from "../DashboardHeader";
import VendorDashboardSidebar from "../DashboardSidebar";
import FallbackLoading from "../FallbackLoading";
import FallbackPage from "../FallbackPage";
import PageTitle from "../PageTitle";
import Profile from "../Profile";
import VendorCustomers from "../VendorCustomers";
import VendorDashboardContainer from "../VendorDashboardContainer";
import VendorEventCreationForm from "../VendorEventCreationForm";
import VendorEvents from "../VendorEvents";
import VendorFinancials from "../VendorFinancials";
import VendorPromotions from "../VendorPromotions";
import { VendorSchedule } from "../VendorSchedule";
import { styles } from "./styles";

function VendorDashboard() {
  const classes = styles();
  const router = useRouter();
  const userContext = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState(null);
  const { Alert, showAlert } = useAlertSnackbar();

  const checkIfSideBarAllowed = () => {
    const { vendorId } = router.query;

    if (router.query.section) {
      switch (router.asPath) {
        case `/vendor/${vendorId}/events/create`:
        case `/vendor/${vendorId}/events/create?trialClass=true`:
          return false;
        default:
          return true;
      }
    }

    // Side bar not allowed on profile page
    return false;
  };

  const getComponent = (profileData) => {
    if (profileData && profileData.userUID) {
      if (router.query.section) {
        const { vendorId } = router.query;
        switch (router.asPath) {
          case `/vendor/${vendorId}/financials`:
            return <VendorFinancials />;
          case `/vendor/${vendorId}/promotions`:
            return <VendorPromotions />;
          case `/vendor/${vendorId}/customers`:
            return <VendorCustomers />;
          case `/vendor/${vendorId}/events/create`:
            return <VendorEventCreationForm trialClass={false} />;
          case `/vendor/${vendorId}/events/create?trialClass=true`:
            return <VendorEventCreationForm trialClass={true} />;
          case `/vendor/${vendorId}/events`:
            return <VendorEvents />;
          case `/vendor/${vendorId}/schedule`:
            return <VendorSchedule />;
          default:
            return (
              <FallbackPage
                title="Page Not Found"
                subtitle="Try refreshing your page or return to home"
              />
            );
        }
      }

      return (
        <>
          <PageTitle title="Payorb | Profile" />
          <Profile profileData={profileData} />
        </>
      );
    }
  };

  React.useEffect(() => {
    if (router.isReady && userContext.user && userContext.user.uid) {
      const { vendorId } = router.query;

      // if (vendorId === userContext.user.uid) {
      getUser({ vendorId })
        .then(async (res) => {
          if (res.success) {
            // allowing a user to head to the profile section even if no data exists in the firestore
            if (Object.keys(res.data).length > 0) {
              if (res.data.vendor.userUID === userContext.user.uid) {
                setProfileData(res.data.vendor);
                setLoading(false);
              } else {
                showAlert("Access Denied", ALERT_TYPES.ERROR);
                delay(1000).then(async () => {
                  showAlert("Redirecting to home page", ALERT_TYPES.ERROR);
                  await delay(500);
                  router.replace(PAGE_PATHS.LANDING);
                });
                return;
              }
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
            {checkIfSideBarAllowed() ? (
              <Grid container className={classes.dashboard}>
                <Grid item className={classes.sidebar}>
                  <VendorDashboardSidebar profileData={profileData} />
                </Grid>
                <Grid item className={classes.mainContainer}>
                  <VendorDashboardContainer>
                    {getComponent(profileData)}
                  </VendorDashboardContainer>
                </Grid>
              </Grid>
            ) : (
              <VendorDashboardContainer>
                {getComponent(profileData)}
              </VendorDashboardContainer>
            )}
            {/* <AuthAlertBanner /> */}

            {router.asPath === `/vendor/${router.query.vendorId}` && (
              <AppFooter />
            )}
          </Grid>
        </UserAuthDetailsProvider>
      )}
    </>
  );
}

export default VendorDashboard;
