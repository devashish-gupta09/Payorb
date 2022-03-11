import { Grid, makeStyles } from "@material-ui/core";
import Logo from "../Logo";

export const AppFooter = () => {
  const classes = styles();
  return (
    <Grid
      container
      className={classes.root}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid className={classes.icon}>
        <Grid container style={{ width: "fit-content" }}>
          <img src={"/assets/footer-social-icons.svg"} />
        </Grid>
      </Grid>
      <Grid justifyContent="center">
        <p className={classes.copyright}>
          @ 2021 All Rights Reserved. Powered by Vanickel Labs
        </p>
      </Grid>
      <Grid container style={{ width: "fit-content" }}>
        <span style={{ paddingRight: "1em", color: "#AAAAAA" }}>
          Powered by
        </span>{" "}
        <Logo width={"5em"} dark={true} />
      </Grid>
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    padding: "1.25em 0",
    background: "#E1E1E1",
  },
  copyright: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
      padding: "1em 1em",
      width: "fit-centent",
    },
  },
}));
