import { makeStyles } from "@material-ui/core";

export const styles = makeStyles({
    container: {
        height: "100vh",
        padding: "2em 6em"
    },
    carouselIndicatorIcon: {
        borderRadius: "0.2em",
        height: "0.3em",
        width: "2em",
        backgroundColor: "#333333",
        margin: "0 0.3em",
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
    carouselReviewContainer: {
        height: "60vh",
    },
    carouselReviewInnerContainer: {
        height: "100%",
        padding: "2em",
    },
    carouselReviewContentContainer: {
        backgroundColor: "white",
        height: "100%"
    },
    carouselContentBodyContainer: {
        height: "100%",
        paddingRight: "3em",
    },
    clientProfileImage: {
        height: "60%",
        borderRadius: "50%",
    }

})
