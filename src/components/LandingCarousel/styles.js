import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    container: {
        height: "90vh",
        [theme.breakpoints.down("sm")]: {
            height: "15em",
        }
    },
    navButtons: {
        display: "None"
    },
    indicatorButton: {
        borderRadius: "0.2em",
        height: "0.2em",
        width: "1.5em",
        backgroundColor: "rgba(242, 242, 242, 0.5)",
        margin: "0 0.3em",
        [theme.breakpoints.down("sm")]: {
            width: "1em",
            margin: "0 0.2em"
        }
    },
    activeIndicator: {
        backgroundColor: "rgba(0, 221, 188, 1) !important",
    },
    indicatorButtonContainer: {
        marginTop: "-4em", // 5
        padding: "1em 2em 1.5em 0",
        textAlign: "right",
        [theme.breakpoints.down("sm")]: {
            paddingBottom: "0.6em"
        }
    },
    carouselImage: {
        height: "90vh",
        width: "100vw",
        backgroundSize: "cover !important",
        [theme.breakpoints.down("sm")]: {
            height: "15em",
            backgroundSize: "contain"
        }
    },
}))