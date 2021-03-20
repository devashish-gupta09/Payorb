import { getClientReviewContent, getEventRegistrationContent, getFeaturesContent, getHomeContent, getUserRegistrationContent } from "../src/services/landing"
import Landing from "./_landing"

export default function Index({ landing }) {
  return (
    <Landing content={landing} />
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

