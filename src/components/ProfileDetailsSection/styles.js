import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  container: {
    width: "65%",
    padding: "4em 4% 0 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "3em 1em 2em 1em",
    },
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
