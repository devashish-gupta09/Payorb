import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles(() => ({
  container: {
    paddingTop: "2em 0",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 60,
      width: "100%",
      backgroundColor: "#333333",
    },
  },
  box: {
    padding: "1em 0 1em 0",
  },
  tabRoot: {
    color: appColors.grey,
    minWidth: "fit-content",
  },
}));
