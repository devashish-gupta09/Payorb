import Auth from "@aws-amplify/auth";
import { Grid } from "@material-ui/core";
import SignInContainer from "../src/components/SignInContainer";
import SigningHeader from "../src/components/SigningHeader";
import { getHomeContent } from "../src/services/landing";

export default function SignIn({ content }) {
    
    return (
        <Grid style={{ height: "90vh" }}>
            <SigningHeader />
            <SignInContainer content={content} />
        </Grid>
    )
}

export async function getStaticProps({ params, preview = null }) {

    const home = await getHomeContent()

    return {
        props: {
            content: {
                titleSection1: home.titleSection1,
                titleSection2: home.titleSection2,
                titleSection3: home.titleSection3
            }
        }
    }
}
