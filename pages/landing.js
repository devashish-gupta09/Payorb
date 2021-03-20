import { Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import Landing from "./_landing"

export default function LandingTest() {

    const [title, setTitle] = React.useState("")

    React.useEffect(() => {
        axios.get("http://localhost:1337/faces").then(res => {
            setTitle(res.data[0].title)
        })
    }, [])

    return (
        <Grid>

            <Landing title={title} />
        </Grid>
    )
}

