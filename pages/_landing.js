import { Grid, Typography } from "@material-ui/core"
import ClientReviewSection from "../src/components/ClientReviewSection"
import EventRegistrationSection from "../src/components/EventRegistrationSection"
import FeatureSection from "../src/components/FeatureSection"
import GrowthSection from "../src/components/GrowthSection"
import HomeSection from "../src/components/HomeSection"

import LandingHeader from "../src/components/LandingHeader"
import UserRegistrationSection from "../src/components/UserRegistrationSection"

function Landing({ content }) {
    return <Grid>
        <LandingHeader />
        <HomeSection content={content.home} />
        <FeatureSection content={content.feature} />
        <UserRegistrationSection content={content.userRegistration} />
        <EventRegistrationSection content={content.eventRegistration} />
        <ClientReviewSection content={content.clientReview} />
        <GrowthSection content={content.growth} />
    </Grid>
}

export default Landing