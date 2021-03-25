import axios from "axios"
import { CMS_URL } from "../constants/api"
import { buildImageUrl } from "../utils/images"

export const getHomeContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/home`)
        const urls = res.data.carousel.map(image => buildImageUrl(image.formats.large.url))

        return {
            titleSection1: res.data.titleSection1,
            titleSection2: res.data.titleSection2,
            titleSection3: res.data.titleSection3,
            description: res.data.description,
            urls
        }

    } catch (err) {
        console.error(err.message)
        return {
            titleSection1: "One",
            titleSection2: "Workspace.",
            titleSection3: "Endless Solutions",
            description: "PayOrb powerful Event management solutions with a single source of truth. The only limit is your imagination.",
            urls: ["https://storage.googleapis.com/bucket_icon_assets/assets/erik-brolin-ZARfCYDaVg0-unsplash%201.png"]
        }
    }
}

export const getFeaturesContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/feature-section`)

        res.data.features.map((feature, index) => {
            res.data.features[index].image = buildImageUrl(feature.image.url)
        }
        )

        return {
            title: res.data.title,
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            features: res.data.features
        }

    } catch (err) {
        console.error(err.message)
        return {
            title: "What payorb can offer you",
            sectionLogo: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
            sectionTitle: "FEATURES",
            features: [{
                title: "Safky",
                description: "skafy",
                image: "https://storage.googleapis.com/bucket_icon_assets/assets/Group.png",
            }]
        }
    }
}

export const getEventRegistrationContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/event-registration`)

        return {
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            title: res.data.title,
            description: res.data.description,
            image: buildImageUrl(res.data.image.url)
        }

    } catch (err) {

        return {
            sectionLogo: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
            sectionTitle: "Event Registration",
            title: "Event Registration",
            description: "Some random description",
            image: "https://storage.googleapis.com/bucket_icon_assets/assets/Rectangle%2035.png"
        }
    }
}

export const getUserRegistrationContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/user-registration`)

        return {
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            title: res.data.title,
            description: res.data.description,
            image: buildImageUrl(res.data.image.url)
        }

    } catch (err) {
        console.error(err.message)
        return {
            sectionLogo: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
            sectionTitle: "Event Registration",
            title: "Event Registration",
            description: "Some random description",
            image: "https://storage.googleapis.com/bucket_icon_assets/assets/Rectangle%2035.png"
        }
    }
}

export const getClientReviewContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/client-review`)

        res.data.clients.map((client, index) => {
            res.data.clients[index].image = buildImageUrl(client.image.formats.thumbnail.url)
        }
        )

        return {
            title: res.data.title,
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            clients: res.data.clients
        }

    } catch (err) {
        console.error(err.message)
        return {
            title: "Client Words",
            sectionLogo: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
            sectionTitle: "REVIEW",
            clients: [
                {
                    name: "Jonathon",
                    review: "salkfhjsafsnfsda f sdaf sadf sadf saf sa fsa fsa dfnbadsf dsafsad f sadf sadf sad fdsa fdsa f dsaf",
                    image: "https://storage.googleapis.com/bucket_icon_assets/assets/Ellipse%201.png"
                }
            ]
        }
    }
}


export const getGrowthContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/growth`)

        res.data.growth_points.map((point, index) => {
            res.data.growth_points[index].image = buildImageUrl(point.pointImage.url)
        })

        return {
            title: res.data.title,
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            growthPoints: res.data.growth_points
        }

    } catch (err) {
        console.error(err.message)
        return {
            title: "Growth",
            sectionLogo: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(1).png",
            sectionTitle: "GROWTH",
            growthPoints: [
                { description: "Lorem ipsum dolor sit amet, consectetur adipiscing", image: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(2).png" }

                , { description: "Lorem ipsum dolor sit amet, consectetur adipiscing", image: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(2).png" }, { description: "Lorem ipsum dolor sit amet, consectetur adipiscing", image: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(2).png" }, { description: "Lorem ipsum dolor sit amet, consectetur adipiscing", image: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(2).png" }, { description: "Lorem ipsum dolor sit amet, consectetur adipiscing", image: "https://storage.googleapis.com/bucket_icon_assets/assets/Group%20(2).png" }
            ]
        }
    }
}