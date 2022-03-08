import { Grid } from "@material-ui/core";

import PageTitle from "../src/components/PageTitle";

import SigningHeader from "../src/components/SigningHeader";
import SignUpContainer from "../src/components/SignUpContainer";
import { getSignInContent } from "../src/services/landing";

export default function SignUp({ content }) {
  return (
    <Grid style={{ height: "90vh" }}>
      <PageTitle title="Payorb | Sign Up" />
      <SigningHeader />
      <SignUpContainer content={content} />
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
