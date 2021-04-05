import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
    container: {
        padding: "2em 10em",
        background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%);",
        minHeight: "100vh",
        maxHeight: "fit-content",
        [theme.breakpoints.down("sm")]: {
            padding: "2em 1em"
        }
    }
}));
