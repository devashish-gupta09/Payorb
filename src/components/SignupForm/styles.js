import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    textInput: {
        margin: "0.75em 0",
        color: "#BDBDBD",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "0.75em",
            width: "100%"
        }
    },
    title: {
        fontWeight: "bold", paddingBottom: "1em", [theme.breakpoints.down("sm")]: {
            fontSize: "2em",
            paddingBottom: "0.5em"
        }
    }
    ,
    container: {
        padding: "4em 12em",
        [theme.breakpoints.down("sm")]: {
            padding: "2em",
            width: "100%"
        }
    },
    formContainer: {
        width: "80%",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    }
}))