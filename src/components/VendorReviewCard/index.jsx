import { Grid, makeStyles } from "@material-ui/core"

export const VendorReviewCard = ({ review }) => {
    const classes = styles()
    return <Grid className={classes.infoRowRoot}>
    </Grid>
}

const styles = makeStyles((theme) => ({
    infoRowRoot: { width: "100%", border: "2px solid green", height: "100%" },
}))