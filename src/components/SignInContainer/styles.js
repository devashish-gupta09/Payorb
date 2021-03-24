import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    imageRight: {
        [theme.breakpoints.down("sm")]: {
            display: "None"
        }
    },
    imageTop: {
        display: "None",
        [theme.breakpoints.down("sm")]: {
            display: "contents"
        }
    },
    formLeft: {
        [theme.breakpoints.down("sm")]: {
            display: "None"
        }
    },
    formBottom: {
        display: "None",
        [theme.breakpoints.down("sm")]: {
            display: "contents"
        }
    }
}))