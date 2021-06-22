import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { FirebaseAuth } from "../AuthenticationContext";

function Logout(props) {
  const router = useRouter();
  const { Alert, showAlert } = useAlertSnackbar();

  const handleLogout = () => {
    FirebaseAuth.Singleton()
      .signOut()
      .then(() => {
        showAlert("Logging out.");
      })
      .catch((err) => {
        showAlert("Couldn't log you out. Please try again");
      });

    router.replace(PAGE_PATHS.SIGNIN);
  };

  return (
    <>
      {Alert()}
      <Button title="Logout" onClick={handleLogout} {...props}>
        <ExitToApp />
      </Button>
    </>
  );
}

export default Logout;
