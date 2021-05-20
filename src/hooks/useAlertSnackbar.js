import React, { useState } from "react";

import AlertSnackbar from "../components/AlertSnackbar";
import { ALERT_TYPES } from "../constants/alerts";

function useAlertSnackbar() {
  // const [showSnackbar, setShowSnackbar] = useState()
  const [alertConfig, setAlertConfig] = useState({
    message: "message",
    type: ALERT_TYPES.MESSAGE,
    display: false,
  });

  const showAlert = (message, type = ALERT_TYPES.MESSAGE, display = true) => {
    setAlertConfig({ message, type, display });
  };

  const hideAlert = () => {
    setAlertConfig({ ...alertConfig, display: false });
  };

  return {
    // eslint-disable-next-line
    Alert: () => (
      <AlertSnackbar
        showSnackbar={alertConfig.display}
        message={alertConfig.message}
        type={alertConfig.type}
        handleClose={hideAlert}
      />
    ),
    showAlert,
  };
}

export default useAlertSnackbar;
