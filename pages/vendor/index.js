import { useRouter } from "next/router";
import React from "react";

import { Context } from "../../src/components/AuthenticationContext";

export default function Vendor() {
  const userContext = React.useContext(Context);
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      if (userContext.userState === "AUTHENTICATED") {
        router.replace(`/vendor/${userContext.user.uid}`);
      }
    }
  }, [router, userContext.userState]);

  return null;
}
