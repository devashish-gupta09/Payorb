import { Grid } from "@material-ui/core"
import Landing from "../src/components/Landing"
import { getClientReviewContent, getEventRegistrationContent, getFeaturesContent, getHomeContent, getUserRegistrationContent, getGrowthContent } from "../src/services/landing"


export default function Index({ landing }) {
  return (
    <Grid style={{ backgroundColor: "#BDF5F2" }}>
      <Landing content={landing} />
    </Grid>
  )
}

export async function getStaticProps({ params, preview = null }) {

  const home = await getHomeContent()
  const feature = await getFeaturesContent()
  const userRegistration = await getUserRegistrationContent()
  const eventRegistration = await getEventRegistrationContent()
  const clientReview = await getClientReviewContent()
  const growth = await getGrowthContent()

  return {
    props: {
      landing: {
        home, feature, userRegistration, eventRegistration, clientReview, growth
      }
    }
  }
}

