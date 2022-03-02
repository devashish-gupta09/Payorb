import { makeStyles } from "@material-ui/core"

export const ProfileImageGalleryCard = () => {
    const classes = styles()
    return (<Grid className={classes.root}></Grid>)
}

const styles = makeStyles((theme) => ({
    root: {
        border: "2px solid green"
    },

}))