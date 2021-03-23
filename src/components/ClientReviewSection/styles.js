import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    container: {
        height: "100vh",
        padding: "2em 6em",
        [theme.breakpoints.down("sm")]: {
            height: "fit-content",
            padding: "1em 1em 3em 1em"
        }
    },
    carouselIndicatorIcon: {
        borderRadius: "0.2em",
        height: "0.3em",
        width: "2em",
        backgroundColor: "#333333",
        margin: "0 0.3em",
        [theme.breakpoints.down("sm")]: {
            display: "None"
        }
    },
    activeIndicator: {
        backgroundColor: "rgba(0, 221, 188, 1)",
    },
    navButton: {
        color: "black",
        background: "white",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
        '&:hover': {
            opacity: "0.8 !important",
            background: "white",
            color: "white"
        },

    },
    navButtonContainer: {
        [theme.breakpoints.down('sm')]: {
            top: "calc(65%)",
        }
    },
    carouselReviewContainer: {
        height: "60vh",

        [theme.breakpoints.down('sm')]: {
            height: "30vh",
            paddingBottom: "1.4em"
        }
    },
    carouselReviewInnerContainer: {
        height: "100%",
        padding: "2em",
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    carouselReviewContentContainer: {
        borderRadius: "0.5em",
        backgroundColor: "white",
        height: "100%"
    },
    carouselContentBodyContainer: {
        height: "100%",
        paddingRight: "3em",

        [theme.breakpoints.down("sm")]: {
            padding: "0.5em"
        }
    },
    clientProfileImage: {
        height: "60%",
        borderRadius: "50%",
        [theme.breakpoints.down("sm")]: {
            height: "5em"
        }
    },
    reviewTitle: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.7em"
        }
    },
    nameTitle: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.6em"
        }
    }
}))