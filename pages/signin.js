import { Grid, makeStyles } from "@material-ui/core";

import PageTitle from "../src/components/PageTitle";
import SignInContainer from "../src/components/SignInContainer";
import SigningHeader from "../src/components/SigningHeader";
import { getSignInContent } from "../src/services/landing";

export default function SignIn({ content }) {
  const classes = styles();

  return (
    <Grid className={classes.container}>
      <PageTitle title="Payorb | Sign In" />
      <SigningHeader />
      <SignInContainer content={content} />
    </Grid>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const home = await getSignInContent();
  return {
    props: {
      content: {
        titleSection1: home.titleSection1,
        titleSection2: home.titleSection2,
      },
    },
  };
}

const styles = makeStyles((theme) => ({
  container: {
    background: "url(/assets/sign-in-bg.svg) no-repeat center",
    backgroundSize: "cover",
    height: "100vh",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      background: "url(/assets/signin-bg-mobile.svg) no-repeat",
      backgroundSize: "contain",
    },
  },
}));
