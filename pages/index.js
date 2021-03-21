import { Grid } from "@material-ui/core"
import { getClientReviewContent, getEventRegistrationContent, getFeaturesContent, getHomeContent, getUserRegistrationContent } from "../src/services/landing"
import Landing from "./_landing"

export default function Index({ landing }) {
  return (
    <Grid style={{backgroundColor:"#BDF5F2"}}>
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

  return {
    props: {
      landing: {
        home, feature, userRegistration, eventRegistration, clientReview
      }
    }
  }
}

