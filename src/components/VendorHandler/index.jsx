import { useRouter } from "next/router";
import React from "react";

import { Context } from "../../../src/components/AuthenticationContext";
import CustomersView from "../../../src/components/CustomersView";
import FallbackLoading from "../../../src/components/FallbackLoading";
import VendorDashboard from "../../../src/components/VendorDashboard";
import { getUser } from "../../../src/services/auth";
import { PAGE_PATHS } from "../../constants/paths";

function VendorHandler() {
  const userContext = React.useContext(Context);
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState();

  React.useEffect(() => {
    if (router.isReady && !profileData) {
      getUser(router.query.vendorId)
        .then(async (res) => {
          if (res.success) {
            if (res.data) {
              setLoading(false);
              setProfileData(res.data);
            } else {
              setLoading(false);
            }
          } else {
            router.replace(PAGE_PATHS.SIGNUP);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [router]);

  if (loading || userContext.userState === "INITIAL") {
    return <FallbackLoading />;
  }

  if (profileData && profileData.vendor) {
    if (
      userContext.user &&
      userContext.userState === "AUTHENTICATED" &&
      userContext.user.uid === profileData.vendor.userUID
    ) {
      return <VendorDashboard></VendorDashboard>;
    } else {
      return <CustomersView />;
    }
  }

  return <h1>{"Vendor doesn't exist"}</h1>;
}

export default VendorHandler;
