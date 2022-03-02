import { makeStyles } from "@material-ui/core"

const PROFILE_IMAGES_LIMIT = 10
const DEFAULT_IMAGE = []

export const ProfileImageGallery = ({ profileInfo, vendor, updateProfile }) => {
    const classes = styles()

    const [images, setImages] = React.useState(DEFAULT_IMAGE)

    React.useEffect(() => {
        if (profileInfo?.carauselAssets?.length) {
            setImages([])
        }
    }, [profileInfo])

    return (<Grid className={classes.root}>
        <Grid container>
            { }
        </Grid>
    </Grid>)
}

const styles = makeStyles((theme) => ({
    root: {
        border: "2px solid green"
    },
}))