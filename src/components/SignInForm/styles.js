import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    sectionTitle: {
        letterSpacing: "1px",
        paddingBottom: "0.5em",
        color: "#828282",
    },
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
            fontSize: "1.5em",
            paddingBottom: "0.5em"
        }
    }
    ,
    container: {
        padding: "4em 8em",
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
    },
    forgotPassword: {
        padding: "0.5em 0 1.5em 0",
        color: "#333333"
    },
    signinButton: {
        background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%)",
        borderRadius: "2em",
        padding: "0.75em 1em",
        boxShadow: "0px 9px 20px 0px rgb(89 207 165 / 75%)",
        textTransform: "Capitalize"
    },
    socialMediaButtons: {
        textTransform: "Capitalize",
        borderRadius: "2em",
        fontWeight: "bold",
        padding: "0.75em 1em",
        margin: "1em 0",
        boxShadow: "0px 9px 20px 0px rgb(161 172 168 / 75%)"
    },
    orText: {
        padding: "2em 0",
        color: "#333333"
    },
    signupMessage: {
        padding: "1em 0"
    }
}))