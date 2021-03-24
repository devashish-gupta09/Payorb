import { Grid } from "@material-ui/core";
import SignInContainer from "../src/components/SignInContainer";
import SigningHeader from "../src/components/SigningHeader";

export default function SignIn() {
    return (
        <Grid>
            <SigningHeader />
            <SignInContainer/>
        </Grid>
    )
}