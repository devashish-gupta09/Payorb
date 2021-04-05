import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    profileImage: {
        maxHeight: "70%",
        borderRadius: "50%",
        [theme.breakpoints.down("sm")]: {
            height: "5em"
        }
    },
    titleCardProfileContainer: {
        width: "fit-content",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    titleCardInfoContainer: {
        paddingLeft: "3em",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "1em"
        },
    },
    grey: {
        paddingBottom: "0.2em",
        fontWeight: 500,
        color: "rgba(130, 130, 130, 1)"
    }
}));
