import { Grid } from "@material-ui/core";

import PageTitle from "../src/components/PageTitle";
import SignInContainer from "../src/components/SignInContainer";
import SigningHeader from "../src/components/SigningHeader";
import { getSignInContent } from "../src/services/landing";

export default function SignIn({ content }) {
  return (
    <Grid style={{ height: "90vh" }}>
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
