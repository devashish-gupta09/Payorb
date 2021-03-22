import { makeStyles } from "@material-ui/core";

export const styles = makeStyles({
    container: {
        background: "#333333",
        padding: "3em 10em 2em 12em",
        color: "white"
    },
    companySectionTitle: { letterSpacing: "1px" },
    companyTabs: {
        "& > p": {
            padding: "0.125em",
            fontWeight: "500",
            fontSize: "0.9em",
            letterSpacing: "0.075em"
        }
    }
})