import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
    container: {
        minHeight: "100vh",
        maxHeight: "fit-content",
        padding: "4em 2em 10em 6em",
        [theme.breakpoints.down("sm")]: {
            minHeight: "fit-content",
            padding: "2em 1em",
        },
    },
    heading: {
        fontSize: "2.5em",
        fontWeight: "bold",
        color: "#000000",
        borderBottom: "3px solid #00D4FF",
        borderWidth: "3vw",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.5em",
        },
    },
    box: {
        width: "50vw",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 auto",
    },
    videoImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        padding: "0 auto",
    },
}));
