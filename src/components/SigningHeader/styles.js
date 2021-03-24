import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        padding: "0.5em 4em",
        [theme.breakpoints.down("sm")]: {
            padding: "0.5em 1em",
        }
    },
    backButtonContainer: {
        color: "black"
    },
    backButton: {
        [theme.breakpoints.down("sm")]: {
            display: "None"
        }
    },
    backLogo: {
        display: "None",
        [theme.breakpoints.down("sm")]: {
            display: "contents"
        }
    }
}))