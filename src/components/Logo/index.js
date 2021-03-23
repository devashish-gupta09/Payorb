import React from "react"

export default function Logo({ height, width, dark }) {
    return <img style={{ height, width }} src={dark ? "../assets/logoBlack.png" : "../assets/logo.png"} />
}