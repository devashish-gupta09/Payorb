import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import { PAGE_PATHS } from "../../constants/paths";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import { FirebaseAuth } from "../AuthenticationContext";
import CustomConfirmationDialog from "../CustomConfirmationDialog";

function Logout(props) {
  const router = useRouter();
  const { Alert, showAlert } = useAlertSnackbar();
  const [logoutDialog, setLogoutDialog] = React.useState(false);

  const cancelLogout = () => {
    setLogoutDialog(false);
  };

  const handleLogout = () => {
    FirebaseAuth.Singleton()
      .signOut()
      .then(() => {
        showAlert("Logging out.");
        router.replace(PAGE_PATHS.SIGNIN);
      })
      .catch((err) => {
        showAlert("Couldn't log you out. Please try again");
      });
  };

  const showConfirmDialog = () => setLogoutDialog(true);

  return (
    <>
      {Alert()}
      <CustomConfirmationDialog
        onOk={handleLogout}
        onCancel={cancelLogout}
        show={logoutDialog}
        title={"Logout"}
      />
      <Button title="Logout" onClick={showConfirmDialog} {...props}>
        <ExitToApp />
        Logout
      </Button>
    </>
  );
}

export default Logout;
