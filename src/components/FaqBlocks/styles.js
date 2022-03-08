import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  faqBlock: {
    margin: "1em",
    width: "650px",
    height: "fit-content",
    boxShadow: "0px 20px 95px 0px #C9CBCC4D",
    [theme.breakpoints.down("sm")]: {
      margin: "1em 0",
      width: "100%",
    },
  },
  faqBlockCollapsed: {
    backgroundColor: "#fff",
  },
  faqBlockExpanded: {
    background:
      "linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 189.8%)",
  },
  faqBlockHeading: {
    display: "flex",
    flexDirection: "row",
    padding: "1em",
  },
  faqQuesTextBox: {
    padding: "0 1em",
    display: "block",
  },
  faqQuesText: {
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  faqBlockAns: {
    display: "block",
    padding: "1em 0 1em 3.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em 1em 1.25em",
    },
  },
  faqAnsText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
}));
